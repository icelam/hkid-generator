const Webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const baseWebpackConfig = require('./webpack.base.conf');

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  // devtool: 'source-map',
  stats: 'errors-only',
  bail: true,
  output: {
    filename: 'assets/js/[name].[chunkhash:8].js',
    chunkFilename: 'assets/js/[name].[chunkhash:8].chunk.js'
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new Webpack.optimize.ModuleConcatenationPlugin(),
    new UglifyJSPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
          drop_debugger: true,
          drop_console: true
        },
        ecma: 8
      },
      sourceMap: true,
      parallel: true
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/bundle.css'
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: false,
      skipWaiting: false,
      globIgnores: ['**/.DS_Store']
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: '../bundle-analyzer-plugin-report.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.s?css/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../'
            }
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  }
});
