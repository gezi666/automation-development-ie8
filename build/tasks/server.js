module.exports = function(gulp, plugins) {
    const browserSync = require('browser-sync');
    return function() {
        gulp.src('./src/css/*/*.less')
            .pipe(plugins.plumber())
            .pipe(plugins.changed('./dist/css'))
            .pipe(plugins.less())
            .pipe(plugins.minifyCss())
            .pipe(gulp.dest('./dist/css'))
            .pipe(browserSync.reload({
                stream: true
            }));

    };
};
/*浏览器实时刷新*/
gulp.task('server', ['less', 'fileinclude', 'scripts'], function() {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    });

    gulp.watch('src/css/*/*.less', ['less']);
    gulp.watch('src/html/*/*.html', ['fileinclude']);
    gulp.watch('src/js/*/*.js', ['scripts']);

});