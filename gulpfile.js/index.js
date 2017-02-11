var config      = require('./config.json');

var gulp        = require('gulp');
var webpack     = require('gulp-webpack');
var webpack2    = require('webpack');
var gutil       = require('gulp-util');
var browserSync = require('browser-sync').create();

var paths = {
  scripts: {
    src: config.root.src + '/js/app.ts',
    dist: config.root.dist + '/js/app.js'
  }

}

gulp.task('webpack', function () {
  return gulp.src( paths.scripts.src )
    .pipe( webpack( require(config.webpack), webpack2, function(err, stats) {
      if(err) {
        gutil.log('webpack error')
        gutil.log(err);
        this.emit('end');
      } 
    } ))
		.on('error', outputError)
    .pipe(gulp.dest( config.root.dist + '/js/'))
});

gulp.task('browserReload', function() {
    browserSync.reload();
});

gulp.task('browserSync', function() {
  browserSync.init({
    proxy: config.localDev
  });
});

gulp.task('watch', function () {
  // Watch webpack
  gulp.watch(paths.scripts.src, ['webpack']);

  // Watch dist change
  gulp.watch(paths.scripts.dist, ['browserReload']);
});

gulp.task('default', ['webpack', 'browserSync', 'watch']);

function outputError (error) {
  gutil.log('gulp error');
  gutil.log(error.toString());
  this.emit('end');
}