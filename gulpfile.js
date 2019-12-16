var gulp = require('gulp'),
	  watch = require('gulp-watch'),
	  sass = require('gulp-sass'),
	  rigger = require('gulp-rigger'),
    image = require('gulp-image'),
    jquery = require('gulp-jquery'),
    webfont = require('gulp-webfont');


    gulp.task('watch', function () {
    	return watch('src/assets/**/*.scss', { ignoreInitial: false })
        .pipe(gulp.dest('dist/assets/css'));
	});


  gulp.task('sass:watch', function () {
    return gulp.src('src/assets/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/assets/css'));
  });


// Index

  gulp.task('default', function () {
      gulp.src('./*.html')
          .pipe(rigger())
          .pipe(gulp.dest('dist/'));
  });


// Image
gulp.task('image', function () {
  gulp.src('src/img/**/*')
    .pipe(image({
      pngquant: true,
      optipng: false,
      zopflipng: true,
      jpegRecompress: false,
      jpegoptim: true,
      mozjpeg: true,
      gifsicle: true,
      svgo: true,
      concurrent: 10
    }))
    .pipe(gulp.dest('dist/img/'));
});

gulp.task('default:image', function () {
    gulp.src('src/img/**/*')
        .pipe(rigger())
        .pipe(gulp.dest('dist/img/'));
});

// Gulp jQuery
gulp.task('jquery', function () {
    return gulp.src('src/**/*.js')
        .pipe(jquery({
            flags: ['-deprecated', '-event/alias', '-ajax/script', '-ajax/jsonp', '-exports/global']
        }))
        .pipe(gulp.dest('dist/'));
    // creates ./public/vendor/jquery.custom.js
});


gulp.task('script:jquery', function () {
    gulp.src('src/**/*.js')
        .pipe(rigger())
        .pipe(gulp.dest('dist/'));
});


// WebFont
var webfont_config = {
    types:'eot,woff2,woff,ttf,svg',
    ligatures: true
};

gulp.task('webfont', function () {
  return gulp.src('./fonts/**')
    .pipe(webfont(webfont_config))
    .pipe(gulp.dest('dist/'));
});