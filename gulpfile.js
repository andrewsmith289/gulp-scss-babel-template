const { src, dest, series, parallel, watch } = require('gulp');

function processScss() {
  const sass = require('gulp-sass');
  const sourcemaps = require('gulp-sourcemaps');

  return src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(dest('build/css'));
}

function watchScss() {
  return watch('src/scss/**/*.scss', processScss);
}

function processJs() {
  const concat = require('gulp-concat');
  const babel = require('gulp-babel');

  return src('src/js/**/*.js')
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
      })
    )
    .pipe(concat('scripts.js'))
    .pipe(dest('build/js/'));
}

function watchJs() {
  return watch('src/js/**/*.js', processJs);
}

exports.build = series(processScss, processJs);
exports.watch = parallel(processScss, watchScss, watchJs);
