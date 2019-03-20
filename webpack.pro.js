const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const WebpackCleanupPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
  plugins: [
    new WebpackCleanupPlugin()
  ],
  mode: 'development'
});