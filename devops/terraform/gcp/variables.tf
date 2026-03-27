variable "project_id" {
  description = "GCP project ID"
  type        = string
}

variable "region" {
  description = "GCP region for Cloud Run and Artifact Registry"
  type        = string
}

variable "origin_secret" {
  description = "Shared secret for origin verification"
  type        = string
  sensitive   = true
}

