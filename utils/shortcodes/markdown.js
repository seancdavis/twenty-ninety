const MarkdownIt = require("markdown-it")

const md = new MarkdownIt()

/**
 * Convert a markdown string to HTML
 *
 * @param {string} input Markdown string to be converted to HTML
 */
exports.renderMarkdown = (input) => md.render(input)

/**
 * Captures an input string and converts markdown to HTML
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
exports.default = (eleventyConfig) => {
  eleventyConfig.addPairedShortcode("markdown", (input) => exports.renderMarkdown(input))
}
