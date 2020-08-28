const { src, dest, series, watch } = require("gulp")
const fs = require("fs")

const gulp = {
  clean: require("gulp-clean"),
  connect: require("gulp-connect"),
  postcss: require("gulp-postcss"),
  run: require("gulp-run-command").default,
  webpack: require("webpack-stream"),
  webpackCompiler: require("webpack"),
  vinylNamed: require("vinyl-named")
}

const htmlExts = [
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
const htmlFiles = htmlExts.map((ext) => `./src/**/*.${ext}`).concat(".eleventy.js")

const clean = () => {
  return src("dist", { allowEmpty: true, read: false }).pipe(gulp.clean())
}

const css = () => {
  return src("./src/_assets/css/*.css")
    .pipe(gulp.postcss())
    .pipe(dest("./dist/twenty-ninety/assets/css"))
}

const html = () => {
  return gulp.run("eleventy")()
}

const js = () => {
  return src("./src/_assets/js/*.js")
    .pipe(gulp.vinylNamed())
    .pipe(gulp.webpack(require("./webpack.config.js"), gulp.webpackCompiler, reload))
    .pipe(dest("./dist/twenty-ninety/assets/js"))
}

const reload = (done) => {
  if (!fs.existsSync("dist")) return done ? done() : null
  return src("./dist").pipe(gulp.connect.reload())
}

const develop = (done) => {
  clean()
  html()
  css()
  js()

  gulp.connect.server({
    root: "dist",
    port: "8000",
    livereload: true
  })

  cssFiles.map((file) => watch(file, series(css, reload)))
  htmlFiles.map((file) => watch(file, series(html, css, reload)))

  done()
}

const build = series(clean, html, css, js)

module.exports = {
  build: build,
  clean: clean,
  css: css,
  default: build,
  develop: develop,
  html: html,
  js: js,
  reload: reload
}
