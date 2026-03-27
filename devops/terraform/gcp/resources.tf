resource "google_artifact_registry_repository" "portfolio" {
  location      = var.region
  repository_id = "portfolio"
  format        = "DOCKER"
}

resource "google_cloud_run_v2_service" "portfolio" {
  name                = "portfolio-website"
  location            = var.region
  ingress             = "INGRESS_TRAFFIC_ALL"
  deletion_protection = false

  template {
    containers {
      image = "${var.region}-docker.pkg.dev/${var.project_id}/portfolio/website:latest"

      ports {
        container_port = 8080
      }

      env {
        name  = "ORIGIN_SECRET"
        value = var.origin_secret
      }

      resources {
        limits = {
          cpu    = "1"
          memory = "512Mi"
        }
      }
    }

    scaling {
      min_instance_count = 0
      max_instance_count = 2
    }
  }
}

resource "google_cloud_run_v2_service_iam_member" "public" {
  name     = google_cloud_run_v2_service.portfolio.name
  location = var.region
  role     = "roles/run.invoker"
  member   = "allUsers"
}
