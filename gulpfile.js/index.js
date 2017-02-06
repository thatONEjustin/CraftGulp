var config      = require('./config.json');

var gulp        = require('gulp');
var webpack     = require('gulp-webpack');
var gutil       = require('gulp-util');

gulp.task('default', function () {
  return gulp.src( config.root.src + '/js/app.js')
		.on('error', outputError)
    .pipe( webpack( require(config.webpack) ) )
		.on('error', outputError)
    .pipe(gulp.dest( config.root.dist + '/js/'))
		.on('error', outputError);
});

function outputError (error) {
    gutil.log(error.toString());
    this.emit('end');
}