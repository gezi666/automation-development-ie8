module.exports = function(gulp, plugins, options) {
    const browserSync = require('browser-sync');
    return function() {
        gulp.src(['./src/js/*/**.js'])
            .pipe(plugins.plumber())
            .pipe(plugins.if(options.env === 'production', plugins.rev())) //set hash key
            .pipe(plugins.changed('./dist/js'))
            .pipe(plugins.babel({
                presets: ['env']
            }))
            .pipe(gulp.dest("dist/js"))
            .pipe(plugins.if(options.env === 'production', plugins.rev.manifest()))
            .pipe(plugins.if(options.env === 'production', gulp.dest('rev/js')))
            .pipe(browserSync.reload({
                stream: true
            }));
    };
};