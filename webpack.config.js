const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

module.exports = {
  entry: {
    'lu-schedule': './src/index.ts',
    'lu-schedule.min': './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, 'bundles'),
    filename: '[name].js',
    libraryTarget: 'umd',
    libraryExport: 'Schedule',
    library: 'LuSchedule',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [new UglifyJsPlugin({
      include: /\.min\.js$/
    })]
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'awesome-typescript-loader',
      exclude: /node_modules/,
      query: {
        declaration: false,
      }
    }]
  }
}
