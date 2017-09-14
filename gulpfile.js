var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var webpack = require('gulp-webpack');
var runSequence = require('run-sequence');
var webpackConfig = require('./webpack.config.js');

gulp.task('webpack', function(){
  var myConfig = Object.create(webpackConfig);
  return  gulp.src('build/jsx/*.js')
  .pipe(webpack(myConfig))
  .pipe(uglify())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('build/jsx_build'));
});

//样式
gulp.task('styles', function(){
  return gulp.src('src/sass/*.scss')
    .pipe(sass())
    .pipe(minifycss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('src/css_min'));
});

gulp.task('watch', function(){
  gulp.watch('build/jsx/*', ['webpack']);
  gulp.watch('src/sass/*', ['styles']);
});

gulp.task('default', function(){
  runSequence('webpack', 'styles', 'watch');
});
