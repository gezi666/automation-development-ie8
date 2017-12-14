module.exports = function(gulp, plugins, options) {
    const browserSync = require('browser-sync').create();
    const reload = browserSync.reload;
    let url = []
    if (options.env === 'production') {
        url = ['rev/js/*.json', 'src/index.html']
    } else {
        url = ['src/*.html']
    }
    return function() {
        gulp.src(url)
            .pipe(plugins.plumber("This file has an error: <%= file.relative %>!"))
            .pipe(plugins.htmlExtend({
                annotations: true,
                verbose: false
            }))
            .pipe(plugins.if(options.env === 'production', plugins.revCollector({
                replaceReved: true,
                dirReplacements: {
                    '../../css': '../../css/',
                    '../../js': '../../js/'
                }
            })))
            .pipe(plugins.if(options.env === 'production', plugins.minifyHtml({
                empty: true,
                spare: true
            })))
            .pipe(gulp.dest('dist/'))
            .pipe(reload({
                stream: true
            }));

    };
};