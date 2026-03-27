variable "cloudflare_account_id" {
  description = "Cloudflare account ID"
  type        = string
}

variable "cloudflare_zone_id" {
  description = "Cloudflare zone ID"
  type        = string
}

variable "domain_name" {
  description = "Custom domain name"
  type        = string
}

variable "cloud_run_host" {
  description = "Cloud Run hostname (without https://)"
  type        = string
}

variable "origin_secret" {
  description = "Shared secret between Cloudflare Worker and Nginx"
  type        = string
  sensitive   = true
}
