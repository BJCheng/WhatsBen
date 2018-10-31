'use strict';
/* eslint no-console: 0 */
require('@babel/register');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const gulp = require('gulp');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const WebpackDevServer = require('webpack-dev-server');

gulp.task('build-view', function (callback) {
	let buildConfig = { ...webpackConfig };
	buildConfig.mode = 'production';
	buildConfig.plugins.push(new UglifyJsPlugin());
	buildConfig.plugins.push(new webpack.DefinePlugin({
		'process.env': {
			'NODE_ENV': '"production"'
		}
	}));

	webpack(buildConfig, (err, stats) => {
		if (err) {
			callback(err);
		}
		else {
			console.log(stats.toString({ chunks: false, colors: true }));
			callback();
		}
	});
});

gulp.task('view-server', function () {
	let devConfig = { ...webpackConfig };
	devConfig.mode = 'development';
	const compiler = webpack(devConfig);
	const server = new WebpackDevServer(compiler, devConfig.devServer);
	server.listen(5000, '0.0.0.0', function (err) {
		if (err) {
			console.log('could not start spa server');
			console.error(err);
		}
	});
});


// var mocha = require('gulp-mocha');
// var testPaths = ['./test-root.js', './src/**/__tests__/*.tests.js'];

// gulp.task('test', function () {
// 	return gulp
// 		.src(testPaths, {
// 			read: false
// 		})
// 		.pipe(mocha({
// 			reporter: 'nyan'
// 		}));
// });
