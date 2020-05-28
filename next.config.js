const isProd = process.env.NODE_ENV === "production"

module.exports = {
  env: {
    BASE_URL: process.env.BASE_URL,
    WEB_APP_URL: process.env.WEB_APP_URL,
  },
}
