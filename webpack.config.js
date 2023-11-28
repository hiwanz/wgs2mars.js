const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')

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
    static: [path.join(__dirname, 'demo'), path.join(__dirname, 'lib')],
    open: true,
    port: 1024
  },
  plugins: [new ESLintPlugin()],
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
