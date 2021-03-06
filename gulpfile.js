var  
  gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  htmlreplace = require('gulp-html-replace'),
  source = require('vinyl-source-stream'),
  browserify = require('browserify'),
  watchify = require('watchify'),
  reactify = require('reactify'),
  streamify = require('gulp-streamify'),
  sass = require('gulp-sass');

var path = {
  HTML: 'src/index.html',
  SASS: 'src/sass/**/*.scss',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST: 'dist',
  DEST_BUILD: 'dist/build',
  DEST_SRC: 'dist/src',
  ENTRY_POINT: './src/components/App.js'
};

// Development Tasks
gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

gulp.task('replaceHTMLsrc', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'src/' + path.OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('sass', function () {
  gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('watch', ['replaceHTMLsrc'], function() {
  gulp.watch(path.HTML, ['replaceHTMLsrc']);
  gulp.watch(path.SASS, ['sass']);

  var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));
 
  return watcher.on('update', function () {
    watcher.bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC));
      console.log('Updated');
  })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
});

// Production Tasks
gulp.task('build', function(){
  browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify]
  })
    .bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(uglify(path.MINIFIED_OUT)))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'build/' + path.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

// Main Tasks
gulp.task('default', ['watch']);
gulp.task('production', ['replaceHTML', 'sass', 'build']);