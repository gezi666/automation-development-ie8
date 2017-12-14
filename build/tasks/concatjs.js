/*
 * js concat
 * 执行任务 需要手动配置合并的文件路径  可以用正则匹配 或者 包含文件路径的数组
 * 打包的顺序会根据你的输入数组的顺序来合并
 */
 module.exports = function(gulp, plugins, options) {
    return function() {
       gulp.src(['./src/js/common/jquery.js', './src/js/common/c.js']) //需要合并的文件
        .pipe(plugins.concat('all.js')) //合并后文件名称
        .pipe(plugins.uglify()) //压缩文件
        .pipe(gulp.dest('./dist/')); // 输出文件路径

    };
};