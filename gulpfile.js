var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();

var DEST = 'build/';

/*  ================================================================================
    JavaScript related stuff
    ================================================================================ */

// Core
gulp.task('scripts-core', function() {
    return gulp.src([
            'src/js/core/config/*.js',
            'src/js/core/helpers/*.js',
            'src/js/core/*.js',
        ])
        .pipe(concat('core.js'))
        .pipe(gulp.dest(DEST + '/js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(DEST + '/js'))
        .pipe(browserSync.stream());
});

// Site
gulp.task('scripts-site', function() {
    return gulp.src([
            'src/js/site/config/*.js',
            'src/js/site/helpers/*.js',
            'src/js/site/*.js',
        ])
        .pipe(concat('site.js'))
        .pipe(gulp.dest(DEST + '/js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(DEST + '/js'))
        .pipe(browserSync.stream());
});

// Custom
gulp.task('scripts-custom', function() {
    return gulp.src([
            'src/js/custom/helpers/*.js',
            'src/js/custom/*.js',
        ])
        .pipe(concat('custom.js'))
        .pipe(gulp.dest(DEST + '/js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(DEST + '/js'))
        .pipe(browserSync.stream());
});

/*  ================================================================================
    JavaScript related stuff
    ================================================================================ */

// Core
// TODO: Maybe we can simplify how sass compile the minify and unminify version
var compileSASSCore = function(filename, options) {
    return sass('src/scss/core/*.scss', options)
        .pipe(autoprefixer('last 2 versions', '> 5%'))
        .pipe(concat(filename))
        .pipe(gulp.dest(DEST + '/css'))
        .pipe(browserSync.stream());
};

gulp.task('sass-core', function() {
    return compileSASSCore('core.css', {});
});

gulp.task('sass-core-minify', function() {
    return compileSASSCore('core.min.css', { style: 'compressed' });
});

// Custom
var compileSASSCustom = function(filename, options) {
    return sass('src/scss/custom/*.scss', options)
        .pipe(autoprefixer('last 2 versions', '> 5%'))
        .pipe(concat(filename))
        .pipe(gulp.dest(DEST + '/css'))
        .pipe(browserSync.stream());
};

gulp.task('sass-custom', function() {
    return compileSASSCustom('custom.css', {});
});

gulp.task('sass-custom-minify', function() {
    return compileSASSCustom('custom.min.css', { style: 'compressed' });
});

/*  ================================================================================
    Browser sync / watch
    ================================================================================ */

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        },
        startPath: './production/index.html'
    });
});

gulp.task('watch', function() {
    // Watch .html files
    gulp.watch('production/*.html', browserSync.reload);
    // Watch .js files
    gulp.watch('src/js/**/*.js', ['scripts-core', 'scripts-site', 'scripts-custom']);
    // Watch .scss files
    gulp.watch('src/scss/**/*.scss', ['sass-core', 'sass-core-minify', 'sass-custom', 'sass-custom-minify']);
});

// Default Task
gulp.task('default', ['browser-sync', 'watch']);