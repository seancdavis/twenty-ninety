const glob = require("glob")
const fs = require("fs")
const path = require("path")

const config = require("./eleventy.config")

module.exports = function (eleventyConfig) {
  // --- Direct Copies --- //
  eleventyConfig.addPassthroughCopy({ static: "/" })
  eleventyConfig.addPassthroughCopy("src/assets/images")

  // --- Utils --- //
  const loadUtils = (type) => {
    const dir = path.join(__dirname, `./utils/${type}`)
    const files = glob.sync(path.join(dir, "*.js"), { ignore: path.join(dir, "*.spec.js") })
    files.map((file) => require(file)(eleventyConfig))
  }

  loadUtils("transforms")

  // Return the config object. (This is what actually sets the config for
  // Eleventy. It was written above for reference within utils.)
  return config
}
