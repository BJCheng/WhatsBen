'use strict';
const path = require('path');

module.exports = {
	target: 'web',
	// debug: true
	devtool: 'source-map',
	context: path.join(__dirname),
	entry: {
		app: path.join(__dirname, 'src', 'view', 'app')
	},
	output: {
		path: path.join(__dirname, 'build', 'view'),
		publicPath: '/build/view/',
		filename: '[name].bundle.js'
	},
	module: {
		rules: [
			{
				test: /src(\/|\\).*\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react']
					}
				}
			},
			{
				test: /src(\/|\\).*\.scss$/,
				loaders: ['style-loader', 'css-loader', 'sass-loader']
			}
		]
	},
	plugins: [],
	devServer: {
		contentBase: path.join(__dirname, 'www'),
		quiet: false,
		noInfo: false,
		publicPath: '/build/view/',
		stats: { chunks: false, colors: true }
	}
};