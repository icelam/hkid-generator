/* eslint "import/no-extraneous-dependencies": ["error", {"optionalDependencies": false} ] */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/index.js')
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'assets/js/[name].js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../src/assets/images'),
          to: 'assets/images',
          globOptions: { ignore: ['**/.DS_Store'] }
        },
        {
          from: path.resolve(__dirname, '../src/assets/fonts'),
          to: 'assets/fonts',
          globOptions: { ignore: ['**/.DS_Store'] }
        },
        {
          from: path.resolve(__dirname, '../src/manifest.json'),
          to: 'manifest.json'
        }
      ]
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@js': path.resolve(__dirname, '../src/assets/js'),
      '@style': path.resolve(__dirname, '../src/assets/scss'),
      '@fonts': path.resolve(__dirname, '../src/assets/fonts'),
      '@images': path.resolve(__dirname, '../src/assets/images')
    }
  },
  module: {
    rules: [
      {
        test: /\.(html|htm)(\?.*)?$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [
          path.resolve(__dirname, '../src/assets/fonts')
        ],
        options: {
          limit: -1,
          name: 'assets/images/[ext]/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: -1,
          name: 'assets/media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [
          path.resolve(__dirname, '../src/assets/images')
        ],
        options: {
          limit: -1,
          name: 'assets/fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  }
};
