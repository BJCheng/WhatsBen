'use strict';
const path = require('path');

module.exports = {
  target: 'web',
  devtool: 'source-map',
  context: path.join(__dirname),
  entry: {
    index: path.join(__dirname, 'src', 'view', 'index')
  },
  output: {
    path: path.join(__dirname, 'build', 'view'),
    publicPath: '/build/view/',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /src(\/|\\).*\.jsx?$/,
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
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: 'images/'
            }
          }
        ]
      }
    ]
  },
  plugins: [],
  devServer: {
    contentBase: path.join(__dirname, 'www'),
    watchContentBase: true,
    quiet: false,
    noInfo: false,
    publicPath: '/build/view/',
    stats: { chunks: false, colors: true },
    historyApiFallback: true
  }
};