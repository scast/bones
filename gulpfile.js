var gulp = require('gulp');
var sass = require('gulp-sass');
var lr = require('tiny-lr');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var changed = require('gulp-changed');
var minifyCss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var server = lr();

gulp.task('styles', function() {
    gulp.src('./library/scss/**/*.scss')
        .pipe(sass())
        .pipe(minifyCss({ keepSpecialComments: 1 }))
        .pipe(gulp.dest('./library/css'))
        .pipe(livereload(server))
        .pipe(notify("Done building bones styles."));
});

gulp.task('livereload-php', function() {
    gulp.src('./**/*.php')
        .pipe(livereload(server));
});


gulp.task('scripts', function() {
    gulp.src('./library/js/scripts.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(livereload(server))
        .pipe(notify("Done hinting JS files."));
});
gulp.task('watch', function() {

    server.listen(35729, function(err) {
        if (err) {
            return console.log(err);
        }
        gulp.watch('./library/scss/**/*.scss', ['styles']);
        gulp.watch('./**/*.php', ['livereload-php']);
        gulp.watch('./library/js/scripts.js', ['scripts']);
    });


});
