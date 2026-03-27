import {
  id = "projects/${var.project_id}/locations/${var.region}/repositories/portfolio"
  to = module.gcp.google_artifact_registry_repository.portfolio
}

module "gcp" {
  source = "./gcp"

  project_id    = var.project_id
  region        = var.region
  origin_secret = var.origin_secret
}

module "cloudflare" {
  source = "./cloudflare"

  cloudflare_account_id = var.cloudflare_account_id
  cloudflare_zone_id    = var.cloudflare_zone_id
  domain_name           = var.domain_name
  cloud_run_host        = replace(module.gcp.service_uri, "https://", "")
  origin_secret         = var.origin_secret
}

