const path = require("path")
const webpack = require("webpack")

const env = process.env.ELEVENTY_ENV || "production"

module.exports = {
  output: {
    libraryTarget: "var",
    library: "App"
  },
  plugins: [new webpack.DefinePlugin({ ENV: JSON.stringify(env) })],
  mode: env,
  watch: env === "development"
}
