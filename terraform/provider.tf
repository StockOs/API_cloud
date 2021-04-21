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
resource "heroku_app" "stock_os_production" {
  name   = "stock-os"
  region = "us"

  config_vars = {
    DATABASE_URL = "database prod"
  }

    buildpacks = [
    "heroku/go"
  ]
}

#STAGING
resource "heroku_app" "stock_os_staging" {
  name   = "stock-os-staging"
  region = "us"

  config_vars = {
    DATABASE_URL = "database staging"
  }

    buildpacks = [
    "heroku/go"
  ]
}

resource "heroku_pipeline" "stock_os_pipeline" {
  name = "stock-os-pipeline"
}

resource "heroku_pipeline_coupling" "stage_staging" {
  app      = heroku_app.stock_os_staging.id
  pipeline = heroku_pipeline.stock_os_pipeline.id
  stage    = "staging"
}

resource "heroku_pipeline_coupling" "stage_production" {
  app      = heroku_app.stock_os_production.id
  pipeline = heroku_pipeline.stock_os_pipeline.id
  stage    = "production"
}
