var webpack = require('webpack');
var path = require('path');
var HappyPack = require('happypack');

module.exports = {
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
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
        include: path.resolve(__dirname, 'src'),
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
