var webpack = require('webpack');
var path = require('path');
var HappyPack = require('happypack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
var fs = require('fs');

var loading = {
  ejs: fs.readFileSync(path.resolve(__dirname, 'template/loading.ejs')),
  css: fs.readFileSync(path.resolve(__dirname, 'template/loading.css')),
};

module.exports = {
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: 'dist',
    pathinfo: false, // 不需要输出路径信息
  },
  mode: 'development',
  resolve: {
    alias: {
      Components: path.resolve(__dirname, 'src/components'),
      react: path.resolve(
        __dirname,
        'node_modules/react/umd/react.production.min.js'
      ),
      'react-dom': path.resolve(
        __dirname,
        'node_modules/react-dom/umd/react-dom.production.min.js'
      ),
    },
    modules: [path.resolve(__dirname, 'node_modules')],
    extensions: ['.js', '.jsx', '.json'], // 需要解析的文件后缀
  },
  externals: {
    // 不需要打包的库文件
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'main.js')],
        exclude: path.resolve(__dirname, 'node_modules'),
        use: 'happypack/loader?id=babel',
      },
    ],
  },
  plugins: [
    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader?cacheDirectory'],
    }),
  ],
  devtool: 'cheap-module-eval-source-map',
  optimization: {
    // 开发模式不需要的部分优化
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
};
