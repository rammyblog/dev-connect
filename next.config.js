const isProd = process.env.NODE_ENV === "production"

module.exports = {
  env: {
    BASE_URL: process.env.BASE_URL,
    WEB_APP_URL: process.env.WEB_APP_URL,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  },
}
