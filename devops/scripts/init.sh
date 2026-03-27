#!/usr/bin/env bash
set -euo pipefail

# Prerequisites:
#   gcloud auth login
#
# Usage:
#   PROJECT_ID="my-project" GITHUB_REPO="user/repo" ./devops/scripts/init.sh

# Required environment variables
: "${PROJECT_ID:?Set PROJECT_ID}"
: "${GITHUB_REPO:?Set GITHUB_REPO (e.g. username/repo-name)}"
: "${REGION:?Set REGION (e.g. europe-west1)}"

gcloud config set project "$PROJECT_ID"
PROJECT_NUMBER=$(gcloud projects describe "$PROJECT_ID" --format='value(projectNumber)')

# Enable required APIs
APIS=(
  "iamcredentials.googleapis.com"
  "run.googleapis.com"
  "artifactregistry.googleapis.com"
  "cloudresourcemanager.googleapis.com"
)

for API in "${APIS[@]}"; do
  gcloud services enable "$API"
done
SA_EMAIL="github-actions@${PROJECT_ID}.iam.gserviceaccount.com"
BUCKET_NAME="${PROJECT_ID}-terraform-backend"

# 1. Create or restore Workload Identity Pool
if gcloud iam workload-identity-pools describe "github" --location="global" &>/dev/null; then
  gcloud iam workload-identity-pools undelete "github" --location="global" 2>/dev/null || true
else
  gcloud iam workload-identity-pools create "github" \
    --location="global" \
    --display-name="GitHub Actions"
fi

# 2. Create or restore OIDC Provider (connects GitHub to the pool)
if gcloud iam workload-identity-pools providers describe "github-provider" --location="global" --workload-identity-pool="github" &>/dev/null; then
  gcloud iam workload-identity-pools providers undelete "github-provider" --location="global" --workload-identity-pool="github" 2>/dev/null || true
else
  gcloud iam workload-identity-pools providers create-oidc "github-provider" \
    --location="global" \
    --workload-identity-pool="github" \
    --display-name="GitHub Provider" \
    --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository" \
    --attribute-condition="assertion.repository=='${GITHUB_REPO}'" \
    --issuer-uri="https://token.actions.githubusercontent.com"
fi

# 3. Create Service Account
gcloud iam service-accounts describe "$SA_EMAIL" &>/dev/null || \
gcloud iam service-accounts create "github-actions" \
  --display-name="GitHub Actions deploy"

# 4. Grant Service Account permissions
ROLES=(
  "roles/run.admin"
  "roles/artifactregistry.admin"
  "roles/storage.admin"
  "roles/iam.serviceAccountUser"
)

for ROLE in "${ROLES[@]}"; do
  gcloud projects add-iam-policy-binding "$PROJECT_ID" \
    --member="serviceAccount:${SA_EMAIL}" \
    --role="$ROLE"
done

# 5. Allow GitHub repo to impersonate the Service Account
gcloud iam service-accounts add-iam-policy-binding "$SA_EMAIL" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/github/attribute.repository/${GITHUB_REPO}"

# 6. Create Artifact Registry
gcloud artifacts repositories describe "portfolio" --location="$REGION" &>/dev/null || \
gcloud artifacts repositories create "portfolio" \
  --repository-format=docker \
  --location="$REGION"

# 7. Create tfstate bucket
gsutil ls -b "gs://${BUCKET_NAME}" &>/dev/null || \
gsutil mb -l "$REGION" "gs://${BUCKET_NAME}"

# 8. Output values for GitHub secrets
echo ""
echo "=== Add these as GitHub secrets ==="
echo "WIF_PROVIDER: projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/github/providers/github-provider"
echo "WIF_SERVICE_ACCOUNT: ${SA_EMAIL}"
echo "GCP_PROJECT_ID: ${PROJECT_ID}"
echo "TF_BACKEND_BUCKET: ${BUCKET_NAME}"
