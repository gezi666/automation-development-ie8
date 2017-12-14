const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
var minimist = require('minimist');
const knownOptions = {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'production' }
};
const options = minimist(process.argv.slice(2), knownOptions);
module.exports = function getTask(task) {
    return require('./tasks/' + task)(gulp, plugins,options);
};