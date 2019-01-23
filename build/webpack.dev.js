var baseConfig = require('./webpack.base');
var { mergeOptions } = require('./utils');

module.exports = mergeOptions(baseConfig, {
  output: {
    filename: 'main.js',
    publicPath: 'dist',
    pathinfo: false, // 不需要输出路径信息
  },
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  optimization: {
    // 开发模式不需要的部分优化
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
});
