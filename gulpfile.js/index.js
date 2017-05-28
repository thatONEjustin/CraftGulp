var config      = require('./config.json');

var gulp        = require('gulp');
var gutil       = require('gulp-util');
var newer       = require('gulp-newer');
var del         = require('del');
var path        = require('path');

var sass        = require('gulp-sass');
var webpack     = require('gulp-webpack');
var webpack2    = require('webpack');

var browserSync = require('browser-sync').create();

var paths = {
  craft: {
    src: './src/{.htaccess, web.config}',
    dist: './craft/templates'
  },
  html: {
    src: ['src/**{,/*.html}', '!src/_assets{,/**,/**.*}'],
    dist: './craft/templates/'
  },
  scripts: {
    src: config.root.src + 'js/{app.ts, *.vue}',
    dist: config.root.dist + 'js/app.js'
  },

  css: {
    src: config.root.src + 'scss/main.scss',
    dist: config.root.dist + 'css'
  }
}


gulp.task('html', function () {
  return gulp.src( paths.html.src, {base: 'src/'} )
    .pipe(newer(paths.html.dist))
    .pipe(gulp.dest(paths.html.dist))
    .pipe(browserSync.stream())
    .on('error', outputError);
});

gulp.task('craftBase', function () {
  return gulp.src( paths.html.src )
    .pipe(newer(paths.html.dist))
    .pipe(gulp.dest(paths.craft.dist))
    .pipe(browserSync.stream())
    .on('error', outputError);
});

gulp.task('sass', function () {
  return gulp.src( paths.css.src )
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest( paths.css.dist ))
    .pipe(browserSync.stream())
    .on('error', outputError);
});

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
    .pipe(browserSync.stream())
    .on('error', outputError);
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
  // Watch src changes
  var watchWebpack = gulp.watch(paths.scripts.src, ['webpack']);
  var watchCss     = gulp.watch(paths.css.src, ['sass']);
  var watchHtml    = gulp.watch(paths.html.src, ['html']);

  // Watch dist changes
  watchHtml.on('change', function (ev) {
    console.log(ev);
    if(ev.type === 'deleted') {
      try {
        del(path.relative('./', ev.path)
          .replace('src', 'craft/templates'));
        browserSync.stream();
      } catch (err) {
        console.log(err.message);
      }
    }
    console.log(ev);
  }).on('error', outputError);
  
});

gulp.task('default', ['html', 'craftBase', 'sass', 'webpack', 'browserSync', 'watch']);

gulp.task('gulpTests', function () {
  console.log(paths);
});

// gulp.task('default', ['sass', 'webpack', /*'browserSync',*/ 'watch']);

function outputError (error) {
  gutil.log('gulp error');
  gutil.log(error.toString());
  this.emit('end');
}