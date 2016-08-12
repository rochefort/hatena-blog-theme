var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require("gulp-plumber");
var browserSync = require('browser-sync').create();

gulp.task('run', function() {
  browserSync.init({
    server: "./"
  });
  gulp.watch(['komforta.less', 'less/*.less'], ['compile']);
  gulp.watch('*.css').on('change', browserSync.reload);
});

gulp.task('compile', function() {
  return gulp.src('./komforta.less')
    .pipe(plumber({
      errorHandler: function(error) {
        console.log(error.message);
        this.emit('end');
      }
    }))
    .pipe(less())
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
});
