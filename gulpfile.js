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
    .src(["app/css/libs.css", "app/css/main.css"])
    .pipe(rename({ suffix: ".min" }))
    .pipe(cleanCSS())
    .pipe(gulp.dest("app/css"));
});

// JS об'єднання і мінімізація
gulp.task("script", function () {
  return gulp
    .src(["app/libs/bootstrap-4.5.0/js/bootstrap.js"])
    .pipe(concat("libs.min.js"))
    .pipe(terser())
    .pipe(gulp.dest("app/js"));
});

// Сервер і слідкування
gulp.task("browser-sync", function () {
  browserSync.init({
    server: {
      baseDir: "app",
    },
  });

  gulp.watch("app/sass/**/*.sass", gulp.series("sass"));
  gulp.watch("app/js/*.js").on("change", browserSync.reload);
  gulp.watch("app/*.html").on("change", browserSync.reload);
});

// Комппіляція sass + автопрефіксер + живе оновлення в браузері
gulp.task("sass", function () {
  return gulp
    .src("app/sass/*.sass")
    .pipe(plumber()) // запобігає зламу gulp при помилці
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(autoprefixer()) // читає з browserslist у package.json або .browserslistrc
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream());
});

// Оптимізація зображень через TinyPNG
gulp.task("img", function (done) {
  gulp
    .src("app/img/**/*.{png,jpg,jpeg}")
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
    gulp.src("app/*.html").pipe(gulp.dest("dist")),
    gulp.src("app/fonts/**/*").pipe(gulp.dest("dist/fonts")),
    gulp.src("app/js/*.js").pipe(gulp.dest("dist/js")),
    gulp
      .src(["app/css/*.css", "!app/css/libs.css"])
      .pipe(gulp.dest("dist/css")),
    gulp.src("app/img/**/*.{png,jpg,jpeg,svg}").pipe(gulp.dest("dist/img")),
  ]);
});

// Таск за замовчуванням - запуск сервера і слідкування
gulp.task("default", gulp.series("browser-sync"));
