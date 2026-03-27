output "service_uri" {
  description = "Cloud Run service URI"
  value       = google_cloud_run_v2_service.portfolio.urls[0]
}

output "artifact_registry" {
  description = "Artifact Registry repository path"
  value       = "${var.region}-docker.pkg.dev/${var.project_id}/portfolio"
}
