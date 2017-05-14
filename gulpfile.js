var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-ruby-sass');
var webpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config.js');

//样式
gulp.task('styles', function(){
  return sass('src/sass/*.scss')
    .pipe(minifycss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('src/css_min'));
});

//脚本
gulp.task('scripts', function(){
  return  gulp.src('build/jsx/*.js')
  .pipe(webpack(webpackConfig))
  .pipe(uglify())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('build/jsx_build'));
});

gulp.task('default', function(){
  gulp.start('styles', 'scripts');
});
