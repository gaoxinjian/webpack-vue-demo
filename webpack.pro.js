const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const WebpackCleanupPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
  devtool: 'nosources-source-map',
  plugins: [
    new WebpackCleanupPlugin(),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  mode: 'production',
});