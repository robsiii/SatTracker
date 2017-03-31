// Dependencies
const gulp = require('gulp'),
  css_nano = require('gulp-cssnano'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  plumber = require('gulp-plumber'),
  cleanCSS = require('gulp-clean-css'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  babel = require("gulp-babel"),
  concatCss = require('gulp-concat-css');

// CSS task
gulp.task('css', function () {
  return gulp.src([
        './src/css/reset.css',
        './src/css/main.css'
  ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concatCss("main.min.css"))
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css/'));
});

// JS task
gulp.task('js', function () {
  return gulp.src([ // Get JS files (in order)
            './src/js/converter.js',
            './src/js/script.js'
  ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('script.min.js')) // Concat in one file
    .pipe(uglify()) // Minify them
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/js/')); // Put it in folder
});

// Watch task
gulp.task('watch', function () {
  // Watch for Stylus CSS modifications
  gulp.watch('./src/css/**', ['css']);

  // Watch for JS modifications (but not for script.min.js)
  gulp.watch(['./src/js/**'], ['js']);
});

gulp.task('default', ['css', 'js', 'watch']);
