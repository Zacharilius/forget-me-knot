var gulp    = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify  = require('gulp-uglify');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var ngHtml2Js = require("gulp-ng-html2js");

gulp.task('scripts', function() {
  gulp.src(['./app_client/**/*.js', '!./app_client/**/*.test.js', '!./app_client/app.min.js'])
    .pipe(sourcemaps.init())
      .pipe(concat('./app.min.js'))
      .pipe(uglify({mangle: true}))
      .pipe(gulp.dest('app_client'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('app_client'));
});

gulp.task('stylesheets', function() {
  gulp.src(['./public/stylesheets/*.css', '!./public/stylesheets/app.min.css'])
    .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(concat('./public/stylesheets/app.min.css'))
      .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
  watch(['./app_client/**/*.js', '!./app_client/**/*.test.js', '!./app_client/app.min.js'], function () {
    gulp.start('scripts');
  });
  watch(['./public/stylesheets/*.css', '!./public/stylesheets/app.min.css'], function () {
    gulp.start('stylesheets');
  });
});

gulp.task('default', ['scripts', 'stylesheets', 'watch']);
