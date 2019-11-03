var path = require('path');
var HappyPack = require('happypack');
var babelOptions = require('../.babelrc');
var webpack = require('webpack');
var SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
var smp = new SpeedMeasurePlugin();

module.exports = smp.wrap({
  entry: path.resolve(__dirname, '../main.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    alias: {
      Components: path.resolve(__dirname, '../src/components'),
      Config: path.resolve(__dirname, '../src/config'),
    },
    modules: [path.resolve(__dirname, '../node_modules')],
    extensions: ['.js', '.jsx', '.json'], // 需要解析的文件后缀
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../main.js')],
        exclude: path.resolve(__dirname, '../node_modules'),
        use: 'happypack/loader?id=babel',
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: path.resolve('node_modules', '.cache', 'cache-loader-css'),
            },
          },
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader?cacheDirectory=true'],
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDom: 'react-dom',
      PropTypes: 'prop-types',
    }),
  ],
});