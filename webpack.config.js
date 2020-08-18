const webpack = require("webpack")

const env = process.env.ELEVENTY_ENV || "production"

module.exports = {
  output: {
    libraryTarget: "var",
    library: "App"
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify(env),
      GOOGLE_ANALYTICS_ID: JSON.stringify(process.env.GOOGLE_ANALYTICS_ID),
      ANALYTICS_APP_NAME: JSON.stringify(process.env.ANALYTICS_APP_NAME)
    })
  ],
  mode: env,
  watch: env === "development"
}
