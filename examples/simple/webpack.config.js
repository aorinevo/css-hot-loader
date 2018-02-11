const webpack = require('webpack'); // webpack itself
const path = require('path'); // nodejs dependency when dealing with paths
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin'); // require webpack plugin

let config = { // config object
  entry: {
    output: './src/index.js', // entry file
    bar: './src/bar.js', // entry file
  },
  output: { // output
    path: path.resolve(__dirname, 'dist'), // ouput path
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: ['css-hot-loader'].concat(ExtractTextWebpackPlugin.extract({  // HMR for styles
          fallback: 'style-loader',
          use: ['css-loader'],
        })),
      },
    ] // end rules
  },
  plugins: [ // webpack plugins
    new ExtractTextWebpackPlugin('[name].css'),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    inline: true,
    compress: true, // Enable gzip compression for everything served:
    hot: true // Enable webpack's Hot Module Replacement feature
  },
  devtool: 'eval-source-map', // enable devtool for better debugging experience
}

module.exports = config;
