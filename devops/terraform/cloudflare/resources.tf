resource "cloudflare_workers_script" "proxy" {
  account_id = var.cloudflare_account_id
  name       = "cloud-run-proxy"
  content    = replace(replace(file("${path.module}/worker.js"), "CLOUD_RUN_HOST", "\"${var.cloud_run_host}\""), "ORIGIN_SECRET", "\"${var.origin_secret}\"")
  module     = true
}

resource "cloudflare_record" "proxy" {
  zone_id         = var.cloudflare_zone_id
  allow_overwrite = true
  name            = var.domain_name
  type            = "A"
  content         = "192.0.2.1"
  proxied         = true
}

resource "cloudflare_record" "www" {
  zone_id         = var.cloudflare_zone_id
  allow_overwrite = true
  name            = "www"
  type            = "A"
  content         = "192.0.2.1"
  proxied         = true
}

resource "cloudflare_workers_route" "proxy" {
  zone_id     = var.cloudflare_zone_id
  pattern     = "${var.domain_name}/*"
  script_name = cloudflare_workers_script.proxy.name
}

resource "cloudflare_workers_route" "www" {
  zone_id     = var.cloudflare_zone_id
  pattern     = "www.${var.domain_name}/*"
  script_name = cloudflare_workers_script.proxy.name
}
