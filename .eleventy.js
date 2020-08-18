const utils = require("./utils")

module.exports = function (eleventyConfig) {
  // --- Direct Copies --- //
  eleventyConfig.addPassthroughCopy({ static: "/" })

  // --- Transforms --- //
  Object.entries(utils.transforms).map(([name, func]) => eleventyConfig.addTransform(name, func))

  // --- Config --- //
  return {
    dir: {
      includes: "_includes",
      input: "src",
      layouts: "_layouts",
      output: "dist"
    },
    markdownTemplateEngine: "njk"
  }
}
