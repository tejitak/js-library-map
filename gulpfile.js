var gulp = require('gulp');
var del = require('del');
var argv = require('yargs').argv;
var gulpif = require('gulp-if');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var pleeease = require('gulp-pleeease');
var stylus = require('gulp-stylus');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var webpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config.js');

var port = process.env.PORT || 8080;
var reloadPort = process.env.RELOAD_PORT || 35729;

gulp.task('clean', function () {
  return del.sync(['dist']);
});

gulp.task('stylus', function(){
  return gulp.src([
    './stylus/*.styl'
  ])
  .pipe(stylus())
  .pipe(pleeease())
  .pipe(minifyCss({keepSpecialComments: 0}))
  .pipe(rename({extname: '.css'}))
  .pipe(gulp.dest('./css/'));
});

gulp.task('build', function () {
  return gulp.src(webpackConfig.entry.main[0])
    .pipe(webpack(webpackConfig))
    .pipe(gulpif(argv.production, uglify()))
    .pipe(gulp.dest('dist/'));
});

gulp.task('serve', function () {
  connect.server({
    port: port,
    root: '.',
    livereload: {
      port: reloadPort
    }
  });
});

gulp.task('reload-js', function () {
  return gulp.src('dist/*.js')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['dist/*.js'], ['reload-js']);
  gulp.watch(['stylus/**/*.styl'],['stylus']);
});

gulp.task('default', ['clean', 'stylus', 'build', 'serve', 'watch']);
