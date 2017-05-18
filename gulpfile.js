'use strict';

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require("gulp-rename"),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    babel = require('gulp-babel'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin')


var path = {
  'sass' : 'public/stylesheets/**/*.scss',
  'es6' : 'public/javascripts/es6/**/*.js',
}, dest = {
  'build' : 'public/build',
}

// gulp.task('image-min', () =>
//     gulp.src('src/assets/**')
//         .pipe(imagemin())
//         .pipe(gulp.dest('build/assets'))
// )

// autoprefixes & minifies css
gulp.task('sass', function () {
  return gulp.src(path.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({
      dirname: "",
      basename: "styles",
      extname: ".css"
    }))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest(dest.build))
})

// merges all js into one file & uglifies
gulp.task('es6', function() {
  return gulp.src(path.es6)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dest.build))
})

gulp.task('watch', function() {
    gulp.watch(path.sass, ['sass'])
    gulp.watch(path.es6, ['es6'])
})

gulp.task('default',['sass','es6','watch'])
