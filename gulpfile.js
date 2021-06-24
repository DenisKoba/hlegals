const gulp = require('gulp'),
      sass = require('gulp-sass'),
      fileinclude = require('gulp-file-include'),
      browserSync = require('browser-sync');
      replace = require('gulp-replace');

gulp.task('copy:images', function() {
    return gulp.src('./src/assets/icons/*')
        .pipe(gulp.dest('./dist/assets/icons'))
});

gulp.task('sass', function(){
    return gulp.src("./src/assets/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest('./dist/css', [1]))
        .pipe(browserSync.stream());
});

gulp.task('fileinclude', function() {
    return gulp.src([
        './src/pages/contacts/contacts.html',
        './src/pages/about_us/about_us.html',
        './src/pages/homepage/index.html'
    ]).pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
});

gulp.task("watch", function(done) {
    browserSync.init({
        server: {
            baseDir: "./dist",
            // replace current page
            index: "index.html"
        }
    })

    gulp.watch("./src/**/*.scss", gulp.series('sass'));
    gulp.watch("./src/pages/*.html").on('change', gulp.series('fileinclude'));
    gulp.watch('./**/*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.series(['sass', 'fileinclude', 'watch', 'copy:images']));
