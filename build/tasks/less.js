module.exports = function(gulp, plugins,options) {
    const browserSync = require('browser-sync');
    return function() {
        gulp.src('./src/css/*/*.less')
            .pipe(plugins.plumber())
            .pipe(plugins.changed('./dist/css'))
            .pipe(plugins.if(options.env === 'production', plugins.rev()))  //set hash key
            .pipe(plugins.less())
            .pipe(plugins.minifyCss())
            .pipe(gulp.dest('./dist/css'))
            .pipe(plugins.if(options.env === 'production', plugins.rev.manifest()))
            .pipe(plugins.if(options.env === 'production',gulp.dest( 'rev/css' )))
            .pipe(browserSync.reload({
                stream: true
            }));

    };
};