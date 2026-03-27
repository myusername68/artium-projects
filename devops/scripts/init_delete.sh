#!/usr/bin/env bash
set -euo pipefail

# Prerequisites:
#   gcloud auth login
#
# Usage:
#   PROJECT_ID="my-project" GITHUB_REPO="user/repo" ./devops/scripts/init_delete.sh
#
# WARNING: This will delete all resources created by init.sh

# Required environment variables
: "${PROJECT_ID:?Set PROJECT_ID}"
: "${GITHUB_REPO:?Set GITHUB_REPO (e.g. username/repo-name)}"
: "${REGION:?Set REGION (e.g. europe-west1)}"

gcloud config set project "$PROJECT_ID"
PROJECT_NUMBER=$(gcloud projects describe "$PROJECT_ID" --format='value(projectNumber)')
SA_EMAIL="github-actions@${PROJECT_ID}.iam.gserviceaccount.com"
BUCKET_NAME="${PROJECT_ID}-terraform-backend"

echo "This will delete all bootstrap resources for project ${PROJECT_ID}."
read -p "Are you sure? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Aborted."
  exit 0
fi

# 1. Delete Terraform state (must be empty or force)
echo "Deleting tfstate bucket..."
gsutil -m rm -r "gs://${BUCKET_NAME}" 2>/dev/null || true

# 2. Delete Artifact Registry (and all images)
echo "Deleting Artifact Registry..."
gcloud artifacts repositories delete "portfolio" \
  --location="$REGION" --quiet 2>/dev/null || true

# 3. Remove IAM bindings
echo "Removing IAM bindings..."
ROLES=(
  "roles/run.admin"
  "roles/artifactregistry.admin"
  "roles/storage.admin"
  "roles/iam.serviceAccountUser"
)

for ROLE in "${ROLES[@]}"; do
  gcloud projects remove-iam-policy-binding "$PROJECT_ID" \
    --member="serviceAccount:${SA_EMAIL}" \
    --role="$ROLE" 2>/dev/null || true
done

# 4. Remove WIF binding from Service Account
echo "Removing WIF binding..."
gcloud iam service-accounts remove-iam-policy-binding "$SA_EMAIL" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/github/attribute.repository/${GITHUB_REPO}" 2>/dev/null || true

# 5. Delete Service Account
echo "Deleting service account..."
gcloud iam service-accounts delete "$SA_EMAIL" --quiet 2>/dev/null || true

# 6. Delete OIDC Provider
echo "Deleting OIDC provider..."
gcloud iam workload-identity-pools providers delete "github-provider" \
  --location="global" \
  --workload-identity-pool="github" --quiet 2>/dev/null || true

# 7. Delete Workload Identity Pool
echo "Deleting Workload Identity Pool..."
gcloud iam workload-identity-pools delete "github" \
  --location="global" --quiet 2>/dev/null || true

echo ""
echo "=== All bootstrap resources deleted ==="
