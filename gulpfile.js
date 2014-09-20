var gulp = require('gulp');
var sass = require('gulp-sass');
var lr = require('tiny-lr');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var changed = require('gulp-changed');
var server = lr();

gulp.task('styles', function() {
    gulp.src('./library/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./library/css'))
        .pipe(livereload(server))
        .pipe(notify("Done building bones styles."));
});

gulp.task('watch', function() {

    server.listen(35729, function(err) {
        if (err) {
            return console.log(err);
        }
        gulp.watch('./library/scss/**/*.scss', ['styles']);
    });


});
