var webpack = require('webpack');
var path = require('path');
var HappyPack = require('happypack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
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
    filename: 'main.[hash].js', // 当更新代码时需清除缓存，所以需要用hash
    chunkFilename: '[name].[chunkhash].js',
  },
  mode: 'production',
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
    extensions: ['.js', '.jsx', '.json'],
  },
  externals: {
    // 整体性强的库不需要打包
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
    new CleanWebpackPlugin(['dist']), // 构建前清空目录
    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader?cacheDirectory'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'template/index.ejs'),
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
};
