## Overview

This portfolio website is a living example of the DevOps practices it documents. It's a React application containerized with Docker and deployed to Google Cloud Platform's Cloud Run service. All infrastructure is managed as code with Terraform, and deployments are fully automated through GitHub Actions.

## Architecture

```
                          ┌──────────────────────────────────────────┐
                          │              Cloudflare                  │
                          │                                          │
 ┌──────┐   HTTPS    ┌────┴────┐    ┌──────────────────┐             │
 │ User ├───────────►│  DNS    ├───►│  Worker (proxy)  │             │
 └──────┘            │(proxied)│    │                  │             │
                     └─────────┘    │ + rewrite host   │             │
                           │        │ + add X-Origin-  │             │
                           │        │   Secret header  │             │
                           │        └────────┬─────────┘             │
                           └──────────────────┼──────────────────────┘
                                             │
                                             ▼
                          ┌──────────────────────────────────────────┐
                          │            GCP (europe-west1)            │
                          │                                          │
                          │  ┌────────────────────────────────────┐  │
                          │  │     Cloud Run (portfolio-website)  │  │
                          │  │     0–2 instances, 1 vCPU, 512 MiB │  │
                          │  │                                    │  │
                          │  │  ┌──────────────────────────────┐  │  │
                          │  │  │  Nginx (:8080)               │  │  │
                          │  │  │  - validate X-Origin-Secret  │  │  │
                          │  │  │  - 403 if invalid            │  │  │
                          │  │  │  - serve React SPA           │  │  │
                          │  │  │                              │  │  │
                          │  │  └──────────────────────────────┘  │  │
                          │  └────────────────────────────────────┘  │
                          │                                          │
                          │  ┌────────────────────────────────────┐  │
                          │  │  Artifact Registry (portfolio)     │  │
                          │  │  - base / website / nginx / node   │  │
                          │  └────────────────────────────────────┘  │
                          │                                          │
                          │  ┌────────────────────────────────────┐  │
                          │  │  GCS Bucket (terraform state)      │  │
                          │  └────────────────────────────────────┘  │
                          └──────────────────────────────────────────┘


                     CI/CD Pipelines (GitHub Actions + Workload Identity Federation)

  ┌─────────────────────────┐  ┌──────────────────────┐  ┌──────────────────────────┐
  │   terraform.yml         │  │  build-base.yml      │  │  deploy.yml              │
  │                         │  │                      │  │                          │
  │  trigger:               │  │  trigger:            │  │  trigger:                │
  │  devops/terraform/**    │  │  Dockerfile.base     │  │  website/**              │
  │                         │  │  nginx.conf          │  │  Dockerfile              │
  │  ┌───────────┐          │  │                      │  │  devops/docs/**          │
  │  │   plan    │          │  │  ┌────────────────┐  │  │  terraform.yml           │
  │  │ validate  │          │  │  │ mirror nginx   │  │  │                          │
  │  │ fmt check │          │  │  │ (skip on fail) │  │  │                          │
  │  │ plan      │          │  │  └───────┬────────┘  │  │  ┌────────────────────┐  │
  │  └─────┬─────┘          │  │          ▼           │  │  │ mirror node        │  │
  │        ▼                │  │  ┌────────────────┐  │  │  │ (skip on fail)     │  │
  │  ┌───────────┐          │  │  │ build + push   │  │  │  └─────────┬──────────┘  │
  │  │   apply   │          │  │  │ base image     │  │  │            ▼             │
  │  └─────┬─────┘          │  │  └────────────────┘  │  │  ┌────────────────────┐  │
  │        ▼                │  └──────────────────────┘  │  │ build app image    │  │
  │  ┌───────────────────┐  │                            │  │ (on top of base)   │  │
  │  │ trigger deploy.yml│──┼────────────────────────────┤  └─────────┬──────────┘  │
  │  └───────────────────┘  │                            │            ▼             │
  └─────────────────────────┘                            │  ┌────────────────────┐  │
                                                         │  │ deploy to          │  │
                                                         │  │ Cloud Run          │  │
                                                         │  └────────────────────┘  │
                                                         └──────────────────────────┘
```

### Traffic Flow

1. A user visits the custom domain
2. **Cloudflare DNS** resolves the domain (proxied A record → Cloudflare edge)
3. A **Cloudflare Worker** intercepts the request, injects an `X-Origin-Secret` header, and forwards it to Cloud Run
4. **Cloud Run** receives the request on an Nginx container listening on port 8080
5. **Nginx** validates the `X-Origin-Secret` header — returns 403 if missing or wrong

### Origin Protection

Direct access to the Cloud Run URL is blocked. Nginx checks every request for an `X-Origin-Secret` header that only the Cloudflare Worker knows. This ensures all traffic flows through Cloudflare, preventing direct abuse of the origin.

## Infrastructure

All resources are managed via Terraform (`devops/terraform/`), organized as modules by provider:

```
terraform/
  providers.tf          # provider config (Google + Cloudflare)
  main.tf               # module calls
  variables.tf / outputs.tf
  gcp/
    resources.tf        # Artifact Registry, Cloud Run, IAM
  cloudflare/
    resources.tf        # DNS record, Worker script, Worker route
    worker.js           # proxy script with origin secret injection
```

### GCP Resources

| Resource | Purpose |
|---|---|
| **GCS Bucket** | Stores Terraform remote state (versioned) |
| **Artifact Registry** | Stores all Docker images (`portfolio` repository) |
| **Cloud Run** | Runs the containerized website (port 8080) |
| **IAM** | Grants public access (`allUsers` → `roles/run.invoker`) |

- **Region:** `europe-west1` (Belgium)
- **Scaling:** 0–2 instances (scale-to-zero when idle)
- **Resources:** 1 vCPU, 512 MiB memory per instance

### Cloudflare Resources

| Resource | Purpose |
|---|---|
| **DNS Record** | Proxied A record pointing the domain to Cloudflare's edge |
| **Worker Script** | Rewrites the hostname to the Cloud Run URL and injects the origin secret header |
| **Worker Route** | Routes `domain.com/*` traffic through the Worker |

## Docker Images

All images are stored in Artifact Registry. There is **no runtime dependency on DockerHub** — upstream images (`nginx:alpine`, `node:20-alpine`) are mirrored into the registry during CI. If DockerHub is unavailable, builds continue using the cached copies.

### Base Image (`Dockerfile.base`)

Nginx Alpine with the site's `nginx.conf` baked in. Only rebuilds when the Nginx config changes.

### App Image (`Dockerfile`)

Multi-stage build:
1. **Build stage** — Node 20 Alpine installs dependencies and runs `vite build`, producing static files. The `devops/docs/` markdown files are included in the build context so Vite can bundle them as project content like this page ;)
2. **Runtime stage** — Copies the built `dist/` output onto the base Nginx image. Final image is ~25 MB.

## CI/CD Pipelines

All pipelines authenticate to GCP using **Workload Identity Federation** — no long-lived service account keys.

### Terraform (`terraform.yml`)

Triggered on push to `main` when `devops/terraform/**` changes.

```
plan (validate + format check + plan) → apply → trigger deploy
```

- **Plan:** Validates HCL, checks formatting, generates a plan saved as an artifact
- **Apply:** Downloads the saved plan and applies it
- **Trigger:** Automatically kicks off the deploy pipeline on success

### Build Base Image (`build-base.yml`)

Triggered on push to `main` when `Dockerfile.base` or `nginx.conf` changes.

```
mirror nginx:alpine → build and push base image
```

- Mirrors `nginx:alpine` from DockerHub to Artifact Registry (skips on failure — image may already exist)
- Builds the base image and tags it with the git SHA and `latest`

### Deploy (`deploy.yml`)

Triggered on push to `main` when `website/**`, `devops/docker/Dockerfile`, or `devops/docs/**` changes. Also triggered by the Terraform pipeline or manually.

```
mirror node:20-alpine → build app image → deploy to Cloud Run
```

- Mirrors `node:20-alpine` to Artifact Registry (skips on failure)
- Builds the app image on top of the base image, tags with git SHA and `latest`
- Deploys the new image to Cloud Run

## Key Decisions

**Why Cloud Run over GKE?** For a static site, Cloud Run's scale-to-zero model is far more cost-effective than a full Kubernetes cluster. The site can go hours without traffic and cost nothing.

**Why a Cloudflare Worker for proxying?** The Worker injects the origin secret header and rewrites the hostname, ensuring only Cloudflare-routed traffic reaches Cloud Run. This is simpler and cheaper than a load balancer or VPC connector.

**Why multi-stage Docker builds?** Separating the Node.js build stage from the Nginx runtime stage keeps the final image small (~25 MB) and reduces the attack surface.

**Why mirror DockerHub images?** Eliminates DockerHub rate limits and availability as a point of failure. The mirror step uses `continue-on-error` so builds succeed even if DockerHub is down, as long as the image was previously mirrored.

**Why Workload Identity Federation?** Avoids storing and rotating long-lived GCP service account keys. GitHub Actions exchanges a short-lived OIDC token for GCP credentials at runtime.
