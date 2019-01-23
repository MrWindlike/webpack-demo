var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
var fs = require('fs');
var baseConfig = require('./webpack.base');
var { mergeOptions } = require('./utils');

var loading = {
  ejs: fs.readFileSync(path.resolve(__dirname, '../template/loading.ejs')),
  css: fs.readFileSync(path.resolve(__dirname, '../template/loading.css')),
};

module.exports = mergeOptions(baseConfig, {
  output: {
    filename: 'main.[hash].js', // 当更新代码时需清除缓存，所以需要用hash
    chunkFilename: '[name].[chunkhash].js',
  },
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(['dist']), // 构建前清空目录
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../template/index.ejs'),
      loading: loading, // 在React渲染完前添加loading
    }),
    new ScriptExtHtmlWebpackPlugin({
      // 给script标签加上defer
      defaultAttribute: 'defer',
    }),
    // new PrerenderSpaPlugin(
    //   // Absolute path to compiled SPA
    //   path.resolve(__dirname, '../dist'),
    //   // List of routes to prerender
    //   ['/']
    // ),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: true,
      automaticNameDelimiter: '-',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
});
