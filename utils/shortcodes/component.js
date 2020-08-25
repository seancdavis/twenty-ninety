const fs = require("fs")
const glob = require("glob")
const nunjucks = require("nunjucks")
const path = require("path")

const { getComponentsDir } = require("../_helpers/get-components-dir")
const config = require("../../eleventy.config")

exports.Component = class Component {
  /**
   * Initialize a new component.
   *
   * @param {string} name Name of the component as the directory in which the
   * component lives.
   * @param {object} props Properties to render.
   * @param {object} cfg Eleventy config object. (defaults to the project
   * config)
   */
  constructor(name, props = {}, cfg = config) {
    this.load(name, cfg)
    if (!this.template) throw `Template file does not exist: ${name}`
    this.props = props
  }

  /**
   * Load the appropriate component files.
   *
   * @param {string} name Name of the component as the directory in which the
   * component lives.
   * @param {object} config Eleventy config object.
   */
  load(name, config) {
    const dir = getComponentsDir(config)
    // Load transformer as the default export.
    const transformer = glob.sync(path.join(dir, name, "*.transformer.js"))[0]
    if (transformer) {
      const module = require(transformer)
      if (typeof module === "function") this.transformer = module
    }
    // Load the template content.
    const template = glob.sync(path.join(dir, name, "*.template.njk"))[0]
    if (template) this.template = fs.readFileSync(template).toString()
  }

  /**
   * If the component has a transformer, transform the props. (NOTE: This should
   * only be called from the render() function.)
   */
  transform() {
    if (!this.transformer) return this.props
    this.props = this.transformer(this.props)
  }

  /**
   * Render the component, returning the HTML string.
   */
  render() {
    this.transform()
    return nunjucks.renderString(this.template, this.props)
  }
}

/**
 * Provides a method for adding NJK components.
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
exports.default = (eleventyConfig) => {
  eleventyConfig.addNunjucksShortcode("component", (name, props) => {
    try {
      const component = new this.Component(name, props)
      return component.render()
    } catch (error) {
      throw console.error(`ERROR: `, error)
    }
  })
}
