const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const getTask =require('./build/util.js')



gulp.task('scripts', getTask('scripts'));
gulp.task('less', getTask('less'));
gulp.task('html', getTask('html'));
gulp.task('index-html', getTask('indexhtml'));
gulp.task('components', getTask('components'));
gulp.task('img', getTask('img'));
gulp.task('concatjs', getTask('concatjs'));


gulp.task('default', ['scripts', 'less', 'html','img']);

// 静态服务器 + 监听 scss/html 文件
gulp.task('dev', ['scripts', 'less', 'html','components','img','index-html'], function() {
	browserSync.init({
		server: "./dist"
	});
	gulp.watch('src/*.html', ['index-html']);
	gulp.watch('src/*.html').on('change', reload);
	gulp.watch('src/img/**/*', ['img']);
	gulp.watch('src/img/**/*').on('change', reload);
	gulp.watch('src/js/**/*.js', ['scripts']);
	gulp.watch('src/js/**/*.js').on('change', reload);
	gulp.watch('src/css/**/*.less', ['less']);
	gulp.watch('src/css/**/*.less').on('change', reload);
	gulp.watch("src/components/*.html",['components']);
	gulp.watch("src/components/*.html").on('change', reload);
	gulp.watch('src/html/**/*.html', ['html']);
	gulp.watch('src/html/**/*.html').on('change', reload);

});