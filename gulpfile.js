var gulp = require("gulp");
var sass = require("gulp-dart-sass");
var browserSync = require("browser-sync").create();
var concat = require("gulp-concat");
// Для сучасного JS краще використовувати terser замість uglify
var terser = require("gulp-terser");
var cleanCSS = require("gulp-clean-css");
var rename = require("gulp-rename");
var autoprefixer = require("gulp-autoprefixer");
var tinypng = require("gulp-tinypng-compress");
var plumber = require("gulp-plumber");

// CSS мінімізація і перейменування
gulp.task("css", function () {
  return gulp
    .src(["docs/css/libs.css", "docs/css/main.css"])
    .pipe(rename({ suffix: ".min" }))
    .pipe(cleanCSS())
    .pipe(gulp.dest("docs/css"));
});

// JS об'єднання і мінімізація
gulp.task("script", function () {
  return gulp
  .src(["docs/js/*.js"])
    .pipe(concat("main.min.js"))
    .pipe(terser())
    .pipe(gulp.dest("docs/js"));
});

// Сервер і слідкування
gulp.task("browser-sync", function () {
  browserSync.init({
    server: {
      baseDir: "docs",
    },
  });

  gulp.watch("docs/sass/**/*.sass", gulp.series("sass"));
  gulp.watch("docs/js/*.js").on("change", browserSync.reload);
  gulp.watch("docs/*.html").on("change", browserSync.reload);
});

// Комппіляція sass + автопрефіксер + живе оновлення в браузері
gulp.task("sass", function () {
  return gulp
    .src("docs/sass/*.sass")
    .pipe(plumber()) // запобігає зламу gulp при помилці
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(autoprefixer()) // читає з browserslist у package.json або .browserslistrc
    .pipe(gulp.dest("docs/css"))
    .pipe(browserSync.stream());
});

// Оптимізація зображень через TinyPNG
gulp.task("img", function (done) {
  gulp
    .src("docs/img/**/*.{png,jpg,jpeg}")
    .pipe(
      tinypng({
        key: "D7HN9g6wPg5yW6hHx6H7Xc36SyjDhqWZ",
      })
    )
    .pipe(gulp.dest("dist/img"));
  done();
});

// Збірка проекту в dist з правильним завершенням
gulp.task("build", function () {
  return Promise.all([
    gulp.src("docs/*.html").pipe(gulp.dest("dist")),
    gulp.src("docs/fonts/**/*").pipe(gulp.dest("dist/fonts")),
    gulp.src("docs/js/*.js").pipe(gulp.dest("dist/js")),
    gulp
      .src(["docs/css/*.css", "!docs/css/libs.css"])
      .pipe(gulp.dest("dist/css")),
    gulp.src("docs/img/**/*.{png,jpg,jpeg,svg}").pipe(gulp.dest("dist/img")),
  ]);
});

// Таск за замовчуванням - запуск сервера і слідкування
gulp.task("default", gulp.series("browser-sync"));
