const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const outputRoot = path.resolve(__dirname, './dist');
const srcRoot = path.resolve(__dirname, './src');

var webpackConfig = {
  entry: {},//具体内容由后面编写的脚本填充
  output: {
    path: outputRoot,
    filename: '[name]/[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: srcRoot,
        loader: ['style-loader', 'css-loader']
      },
      {
        test: /\.vue$/,
        include: srcRoot,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        include: srcRoot,
        loader: 'babel-loader',
        options: {
            presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm.js' 
    }
  }
}

let filenamesWechat = fs.readdirSync(path.resolve(srcRoot, 'html'));
filenamesWechat.forEach(function (filename) {
  let stats = fs.statSync(path.resolve(srcRoot, 'html', filename));
  if (stats.isFile()) {
    let extension = path.extname(filename);
    let name = filename.substring(0, filename.lastIndexOf(extension));
    webpackConfig.entry[name] = path.resolve(srcRoot, 'js', name + '.js')
    webpackConfig.plugins.push(new HtmlWebpackPlugin({
      filename: name + '/' + name + '.html',
      template: path.resolve(srcRoot, 'html', name + '.html'),
      inject: true,
      chunks: ['common', name] //这个设置使得每个 html 只包含 common 以及与自己命名相同的那一个 chunk
    }));
  }
});

module.exports = {
  entry: webpackConfig.entry,
  output: webpackConfig.output,
  module: webpackConfig.module,
  plugins: webpackConfig.plugins,
};
