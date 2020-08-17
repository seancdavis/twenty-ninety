module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ static: "/" })

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
