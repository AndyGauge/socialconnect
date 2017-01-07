provider "heroku" {
  email="andrewgauger@hotmail.com"
  api_key="${var.heroku_api_key}"
}
resource "heroku_app" "socialconnectclient"{
  name="ngsocialconnect"
  region = "us"
  provisioner "local-exec" {
    command = "git remote add heroku ${heroku_app.socialconnectclient.git_url} & git push heroku master"
  }
}
