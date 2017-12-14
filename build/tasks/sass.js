module.exports = function(gulp, plugins) {
    const browserSync = require('browser-sync');
    return function() {
        gulp.src('./src/css/*/*.scss')
            .pipe(plugins.plumber())
            .pipe(plugins.rev())  //set hash key
            .pipe(plugins.changed('./dist/css'))
            .pipe(plugins.sass())
            .pipe(plugins.minifyCss())
            .pipe(gulp.dest('./dist/css'))
            .pipe(plugins.rev.manifest())
            .pipe(gulp.dest( 'rev/css' ))
            .pipe(browserSync.reload({
                stream: true
            }));

    };
};