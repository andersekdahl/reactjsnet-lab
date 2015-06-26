'use strict';

var optimist = require('optimist');
var path = require('path');

var mode = require('./mode');
var loaders = require('./loaders');
var plugins = require('./plugins');

var devPort = optimist.argv.port || 8080;

var publicPath = '';
if (mode.IS_HOT) {
	// todo: Avoid this (https://github.com/webpack/style-loader/issues/55)
	publicPath = 'http://localhost:' + devPort + '/';
}

var filename = '/assets/bundle.js';
if (mode.IS_PROD) {
	filename = '/assets/bundle.[hash].js';
}

module.exports = {
	entry: './ReactJSNET/Js/index.js',

	debug: mode.IS_PROD ? null : true,
	devtool: mode.IS_PROD ? null : 'cheap-eval-source-map',

	externals: {
		// require("jquery") is external and available
		// on the global var jQuery
		'jquery': 'jQuery'
	},

	output: {
		path: './',
		filename: filename,
		pathinfo: true,
		publicPath: publicPath
	},

	resolve: {
		extensions: ['', '.js'],
		alias: {
			'jquery.validate': 'libs/jquery.validate.min',
			'jquery.validate.unobtrusive': 'libs/jquery.validate.unobtrusive.min',
			'bootstrap': 'libs/bootstrap',
			'picturefill': 'libs/picturefill',
			'easing': 'libs/jquery.easing.min',
			'fancybox': 'libs/jquery.fancybox',
			'fancybox.media': 'libs/jquery.fancybox-media',
			'matchHeight': 'libs/jquery.matchHeight',
			'ui': 'libs/jquery-ui.min',
			'lazyload': 'libs/jquery.lazyload.min.js',
			'spin': 'libs/spin',
			'ladda': 'libs/ladda',
			'accounting': 'libs/accounting',
			'placeholder-polyfill': 'libs/placeholder-polyfill',
			'moment': 'libs/moment.min',
			'datetimepicker': 'libs/bootstrap-datetimepicker',
			'deparam': 'libs/jquery.deparam'
		},
		root: path.join(__dirname, '../Content/js/')
	},

	devServer: {
		proxy: {
			'*': 'http://dev.toyota-forklifts.eu/'
		},
		port: devPort,
		inline: true,
		hot: true
	},

	module: {
		loaders: loaders
	},

	plugins: plugins
};
