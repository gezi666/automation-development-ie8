module.exports = function(gulp, plugins, options) {
    const browserSync = require('browser-sync');
    return function() {
        gulp.src('./src/img/*')
            .pipe(plugins.plumber())
            .pipe(plugins.changed('./dist/img'))
            .pipe(plugins.imagemin())
            .pipe(gulp.dest('dist/img'))
            .pipe(browserSync.reload({
                stream: true
            }));

    };
};