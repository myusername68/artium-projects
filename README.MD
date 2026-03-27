# Portfolio Website

A step-by-step guide on how to create and deploy this project.

## 1. Bootstrap GCP Project

Run the init script to enable GCP APIs, create the Terraform state bucket, Artifact Registry, service account, IAM roles, and Workload Identity Federation credentials.

```bash
gcloud auth login
PROJECT_ID="your-project-id" GITHUB_REPO="myusername68/artium-projects" REGION="europe-west1" ./devops/scripts/init.sh
```

## 2. Configure Cloudflare API Token

Create a custom API token in Cloudflare (My Profile → API Tokens → Create Token) with:

| Permission | Access |
|---|---|
| Zone : DNS | Edit |
| Zone : Zone | Read |
| Zone : Workers Routes | Edit |
| Zone : Workers Routes | Read |
| Zone : DNS Settings | Edit |
| Zone : Transform Rules | Edit |
| Zone : Transform Rules | Read |
| Zone : Zone Settings | Read |
| Account : Workers Scripts | Edit |
| Account : Workers Scripts | Read |

Restrict zone permissions to your specific zone under Zone Resources.

## 3. Configure Cloudflare DNS

all trafic is routed to the cloudflare worker to change the fqdn to the cloud run instance 
with a security header to only allow access to the custom domain

## 4. Configure GitHub Secrets

Go to your repo **Settings** → **Secrets and variables** → **Actions** and add:

| Secret | Where to find it |
|---|---|
| `GCP_PROJECT_ID` | Script output |
| `WIF_PROVIDER` | Script output |
| `WIF_SERVICE_ACCOUNT` | Script output |
| `REGION` | `europe-west1` |
| `CLOUDFLARE_API_TOKEN` | Cloudflare → My Profile → API Tokens |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare → Overview → right sidebar (Account ID) |
| `CLOUDFLARE_ZONE_ID` | Cloudflare → your domain → Overview → right sidebar |
| `DOMAIN_NAME` | Your custom domain (e.g. `artium-projects.com`) |

## 5. Build the Base Image

Run the base image workflow manually (Actions → Build Base Image → Run workflow). This builds the Nginx + config base image that the deploy pipeline depends on.

> **No DockerHub dependency at runtime.** Both pipelines mirror their upstream images (`nginx:alpine`, `node:20-alpine`) into Artifact Registry before building. The Dockerfiles pull exclusively from your own registry, so builds never depend on DockerHub availability or rate limits, when fails skip step.

## 6. Run the Pipelines

Run the Terraform pipeline (Actions → Terraform → Run workflow). This will create Cloud Run and deploy a Cloudflare Worker that proxies traffic from your domain to Cloud Run.

When it completes, it will automatically trigger the deploy pipeline that will build the app image on top of the base, push it, and deploy to Cloud Run.

### Pipeline Overview

| Workflow | Trigger | Stages |
|---|---|---|
| `build-base.yml` | `Dockerfile.base` or `nginx.conf` changes | Build & push base image |
| `deploy.yml` | `website/**` or `Dockerfile` changes / manual | Build app → Deploy (approval) |
| `terraform.yml` | `devops/terraform/**` changes | Plan → Apply (approval) → Trigger deploy |

## 7. Adding Content

### Profile Photo

Place your profile photo at `website/public/profile.jpg`. This is displayed on the Contact page. Any image format works (`.jpg`, `.png`, `.webp`) — just update the `src` in `website/src/pages/Contact.tsx` if you use a different filename.

### Adding a Project

1. Add an entry to the `projects` array in `website/src/data/projects.ts`:

```ts
{
  id: "my-project",
  title: "My Project Title",
  description: "Short summary shown on the project card.",
  tools: ["Docker", "Terraform", "AWS"],
  status: "in-progress", // "completed" | "in-progress" | "planned"
  repoUrl: "https://github.com/...", // optional
}
```

2. Create a markdown file at `devops/docs/my-project.md` (filename must match the `id`):

```md
## Overview

Write paragraphs, add images, code blocks, lists — standard markdown.

![architecture diagram](/images/my-diagram.png)

## Details

- **Component A**: Does this
- **Component B**: Does that
```

The project detail page renders the markdown automatically.

### Adding Images to Project Docs

Place images in `website/public/images/` and reference them in markdown as `/images/filename.png`.
