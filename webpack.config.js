const path = require('path');

module.exports = {
  entry: [
    './lib/wgs2mars.js'
  ],
  output: {
    path: __dirname + '/lib/',
    library: 'transformFromWGSToGCJ',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this',
    libraryExport: 'default',
    filename: 'wgs2mars.min.js'
  },
  devServer: {
    contentBase: [path.join(__dirname, 'demo'), path.join(__dirname, 'lib')],
    open: true,
    port: 1024
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /(\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  }
};
