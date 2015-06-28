'use strict';

module.exports = {
  IS_HOT: process.argv.some(function (arg) {
    return arg.indexOf('webpack-dev-server') !== -1;
  }),
  IS_DEV: process.argv.indexOf('--production') === -1,
  IS_PROD: process.argv.indexOf('--production') !== -1
};
