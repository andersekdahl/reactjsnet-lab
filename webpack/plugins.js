'use strict';

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var EnvironmentPlugin = require('webpack/lib/EnvironmentPlugin');
var WebpackNotifierPlugin = require('webpack-notifier');

var mode = require('./mode');

module.exports = [new EnvironmentPlugin(['NODE_ENV'])];

if (mode.IS_HOT) {
  module.exports.push(new webpack.HotModuleReplacementPlugin());
} else {
  var cssBundleName = '/assets/bundle.css';
  if (mode.IS_PROD) {
    cssBundleName = '/assets/bundle.[hash].css';
  }

  module.exports.push(new ExtractTextPlugin(cssBundleName));
}

if (mode.IS_PROD) {
  module.exports.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    output: {
      comments: false
    }
  }));

  module.exports.push(new webpack.optimize.DedupePlugin());
  module.exports.push(new webpack.optimize.OccurenceOrderPlugin());
  module.exports.push(new webpack.optimize.AggressiveMergingPlugin());
} else {
  module.exports.push(new WebpackNotifierPlugin());
}
