module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/assets/css/bundle.css")

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
