module.exports = function(gulp, plugins,options) {
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
    return function() {
        gulp.src(['rev/*/*.json','./src/html/*/*.html'])
            .pipe(plugins.plumber())
            .pipe(plugins.htmlExtend({annotations:true,verbose:false}))
            .pipe(plugins.if(options.env === 'production',plugins.revCollector({
                replaceReved: true,
                dirReplacements: {
                    '../../css': '../../css/',
                    '../../js': '../../js/',
                    'cdn/': function(manifest_value) {
                        return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
                    }
                }
            })))
            .pipe(plugins.if(options.env === 'production',plugins.minifyHtml({
                empty:true,
                spare:true
            })))
            .pipe(gulp.dest('./dist/html'))
            .pipe(reload({
                stream: true
            }));

    };
};