'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var mode = require('./mode');

module.exports = [];

var jsLoaders = ['babel', 'eslint'];

module.exports.push({
  test: /\.js$/,
  exclude: /node_modules|js\/libs/,
  loaders: jsLoaders
});

var sassLoaders;
var cssLoaderOptions = {};
var autoprefixerLoaderOptions = {
  browsers: ['last 2 version', 'ie 10']
};
var sassLoaderOptions = {};

if (mode.IS_DEV) {
  cssLoaderOptions.sourceMap = true;
  sassLoaderOptions.sourceMap = true;
}

if (mode.IS_HOT) {
  sassLoaders = [
    'style',
    'css?' + JSON.stringify(cssLoaderOptions),
    'autoprefixer?' + JSON.stringify(autoprefixerLoaderOptions),
    'sass?' + JSON.stringify(sassLoaderOptions)
  ].join('!');
} else {
  sassLoaders = ExtractTextPlugin.extract('style', [
    'css?' + JSON.stringify(cssLoaderOptions),
    'autoprefixer?' + JSON.stringify(autoprefixerLoaderOptions),
    'sass?' + JSON.stringify(sassLoaderOptions)
  ].join('!'));
}

module.exports.push({
  test: /\.scss$/,
  loader: sassLoaders
});

var filename = '/assets/[name].[ext]';
if (mode.IS_PROD) {
  filename = '/assets/[name].[hash].[ext]';
}

module.exports.push({
  test: /\.(woff2?|svg|eot|ttf)/i,
  loader: 'file?name=' + filename
});

module.exports.push({
  test: /\.(png|jpg|jpeg|gif)/i,
  loader: 'file?name=' + filename
});
