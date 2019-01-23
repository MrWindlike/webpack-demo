var path = require('path');
var HappyPack = require('happypack');
var babelOptions = require('../.babelrc');

module.exports = {
  entry: path.resolve(__dirname, '../main.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    alias: {
      Components: path.resolve(__dirname, '../src/components'),
      react: path.resolve(
        __dirname,
        '../node_modules/react/umd/react.production.min.js'
      ),
      'react-dom': path.resolve(
        __dirname,
        '../node_modules/react-dom/umd/react-dom.production.min.js'
      ),
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
    ],
  },
  plugins: [
    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader?cacheDirectory'],
    }),
  ],
};