provider "heroku" {
  email="andrewgauger@hotmail.com"
  api_key="${var.heroku_api_key}"
}
resource "heroku_app" "socialconnectclient"{
  name="socialconnect"
  region = "us"
}
