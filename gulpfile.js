const { src, dest, series, watch } = require("gulp")

const gulp = {
  clean: require("gulp-clean"),
  connect: require("gulp-connect"),
  postcss: require("gulp-postcss"),
  run: require("gulp-run-command").default
}

const eleventyExts = [
  "11tydata.js",
  "json",
  "html",
  "md",
  "11ty.js",
  "liquid",
  "njk",
  "hbs",
  "mustache",
  "ejs",
  "haml",
  "pug",
  "jstl"
]

const cssFiles = ["./src/**/*.css", "./tailwind.config.js", "./postcss.config.js"]

const clean = () => {
  return src("dist", { allowEmpty: true, read: false }).pipe(gulp.clean())
}

const css = () => {
  return src("./src/assets/css/*.css").pipe(gulp.postcss()).pipe(dest("./dist/assets/css"))
}

const eleventy = () => {
  return gulp.run("eleventy")()
}

const reload = () => {
  return src("./dist").pipe(gulp.connect.reload())
}

const develop = (done) => {
  clean()
  eleventy()
  css()

  gulp.connect.server({
    root: "dist",
    port: "8000",
    livereload: true
  })

  cssFiles.map((file) => watch(file, series(css, reload)))
  eleventyExts.map((ext) => watch(`./src/**/*.${ext}`, series(eleventy, css, reload)))

  done()
}

const build = series(clean, css, eleventy)

module.exports = {
  build: build,
  clean: clean,
  css: css,
  default: build,
  develop: develop,
  eleventy: eleventy
}
