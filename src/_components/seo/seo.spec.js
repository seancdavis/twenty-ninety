const transform = require("./seo.transformer")
const defaults = require("../../_data/seo_defaults.json")

describe("SEO", () => {
  it("throws an error if nothing passed", () => {
    expect(() => transform()).toThrow()
  })

  it("has global defaults", () => {
    const seo = transform({})
    const expResult = {
      description: defaults.description,
      image: `${defaults.base_url}${defaults.image}`,
      og: {
        description: defaults.description,
        image: `${defaults.base_url}${defaults.image}`,
        title: defaults.title_template.replace("%s", defaults.title),
        type: defaults.og.type
      },
      title: defaults.title_template.replace("%s", defaults.title),
      twitter: {
        description: defaults.description,
        image: `${defaults.base_url}${defaults.image}`,
        title: defaults.title_template.replace("%s", defaults.title),
        card: defaults.twitter.card
      },
      url: `${defaults.base_url}`
    }
    expect(seo).toEqual(expResult)
  })

  it("uses page attributes as fallbacks", () => {
    const args = {
      title: "Foo",
      description: "Bar",
      image: "baz.png",
      path: "/about"
    }
    const { title, description, image, path } = args
    const seo = transform(args)
    const expResult = {
      description: description,
      image: `${defaults.base_url}${image}`,
      og: {
        description: description,
        image: `${defaults.base_url}${image}`,
        title: defaults.title_template.replace("%s", title),
        type: defaults.og.type
      },
      title: defaults.title_template.replace("%s", title),
      twitter: {
        description: description,
        image: `${defaults.base_url}${image}`,
        title: defaults.title_template.replace("%s", title),
        card: defaults.twitter.card
      },
      url: `${defaults.base_url}${path}`
    }
    expect(seo).toEqual(expResult)
  })

  it("allows overriding page-level attributes", () => {
    const page = {
      title: "Foo",
      description: "Bar",
      image: "baz.png",
      path: "/about"
    }
    const overrides = {
      title: "Hello",
      description: "World",
      image: "hello-world.jpg",
      path: "/hello-world" // path can't be overridden
    }
    const { title, description, image, path } = overrides
    const seo = transform({ ...page, overrides: overrides })
    const expResult = {
      description: description,
      image: `${defaults.base_url}${image}`,
      og: {
        description: description,
        image: `${defaults.base_url}${image}`,
        title: defaults.title_template.replace("%s", title),
        type: defaults.og.type
      },
      title: defaults.title_template.replace("%s", title),
      twitter: {
        description: description,
        image: `${defaults.base_url}${image}`,
        title: defaults.title_template.replace("%s", title),
        card: defaults.twitter.card
      },
      url: `${defaults.base_url}${page.path}`
    }
    expect(seo).toEqual(expResult)
  })

  it("uses og overrides to set twitter values", () => {
    const og = { title: "Foo", description: "Bar", image: "baz.png", type: "video" }
    const seo = transform({ overrides: { og: og } })
    const expResult = {
      description: defaults.description,
      image: `${defaults.base_url}${defaults.image}`,
      og: {
        description: og.description,
        image: `${defaults.base_url}${og.image}`,
        title: defaults.title_template.replace("%s", og.title),
        type: og.type
      },
      title: defaults.title_template.replace("%s", defaults.title),
      twitter: {
        description: og.description,
        image: `${defaults.base_url}${og.image}`,
        title: defaults.title_template.replace("%s", og.title),
        card: defaults.twitter.card
      },
      url: `${defaults.base_url}`
    }
    expect(seo).toEqual(expResult)
  })

  it("will set twitter values", () => {
    const twitter = { title: "Foo", description: "Bar", image: "baz.png", card: "summary" }
    const seo = transform({ overrides: { twitter: twitter } })
    const expResult = {
      description: defaults.description,
      image: `${defaults.base_url}${defaults.image}`,
      og: {
        description: defaults.description,
        image: `${defaults.base_url}${defaults.image}`,
        title: defaults.title_template.replace("%s", defaults.title),
        type: defaults.og.type
      },
      title: defaults.title_template.replace("%s", defaults.title),
      twitter: {
        description: twitter.description,
        image: `${defaults.base_url}${twitter.image}`,
        title: defaults.title_template.replace("%s", twitter.title),
        card: twitter.card
      },
      url: `${defaults.base_url}`
    }
    expect(seo).toEqual(expResult)
  })
})
