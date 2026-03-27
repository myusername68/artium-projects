output "service_url" {
  description = "URL of the deployed Cloud Run service"
  value       = module.gcp.service_uri
}

output "artifact_registry" {
  description = "Artifact Registry repository path"
  value       = module.gcp.artifact_registry
}
