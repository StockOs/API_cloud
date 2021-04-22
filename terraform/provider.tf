terraform {
  required_providers {
    heroku = {
      source = "heroku/heroku"
      version = "3.2.0"
    }
  }
}
provider "heroku" {
  email = var.email_address
  api_key = var.heroku_api_key
}

#PRODUCTION
resource "heroku_app" "projet_cloud_app_production" {
  name   = "projet-cloud-app-production"
  region = "us"
}

#STAGING
# resource "heroku_app" "projet_cloud_app_staging" {
#   name   = "projet-cloud-app-staging"
#   region = "us"
# }

# resource "heroku_pipeline" "projet_cloud_app_pipeline" {
#   name = "projet-cloud-app-pipeline"
# }

# resource "heroku_pipeline_coupling" "stage_staging" {
#   app      = heroku_app.projet_cloud_app_staging.id
#   pipeline = heroku_pipeline.projet_cloud_app_pipeline.id
#   stage    = "staging"
# }

resource "heroku_pipeline_coupling" "stage_production" {
  app      = heroku_app.projet_cloud_app_production.id
  pipeline = "14dad3cc-d2f0-461e-b6d1-2d14cdaae44f"
  stage    = "production"
}
