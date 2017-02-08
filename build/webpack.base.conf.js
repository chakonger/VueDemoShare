var path = require('path')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var projectRoot = path.resolve(__dirname, '../')
// 计算hash值库
var fnv = require('fnv-plus');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var env = process.env.NODE_ENV
// check env & config/index.js to decide weither to enable CSS Sourcemaps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

var versionObj = {}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'vue$': 'vue/dist/vue',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'utils': path.resolve(__dirname, '../src/assets/js/utils.js'),
      'mock': path.resolve(__dirname, '../src/mock'),
      'components': path.resolve(__dirname, '../src/components'),
      'topHandle': path.resolve(__dirname, '../src/components/top-handle.vue')  // topHandle 每个有顶部导航的都会用到
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
    loaders: utils.cssLoaders({sourceMap: useCssSourceMap}),
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: './src/assets/i18n',
      to: './static/i18n',
      transform: function (content, path) {
        var name = path.split('/').pop();
        if (name.includes('version')) {
          return JSON.stringify(versionObj);
        } else {
          let newContent = content.toString('utf-8');
          // 保存每个版本HASH值
          let hash = fnv.hash(newContent, 64).hex();
          versionObj[name] = hash;
          // 添加版本信息
          let newContentObj = JSON.parse(newContent);
          newContentObj.version = hash;
          return JSON.stringify(newContentObj);
        }
      }
    }], {
      copyUnmodified: true
    }),
    new webpack.ProvidePlugin({
      '$': 'webpack-zepto',
      'zepto': 'zepto',
      'window.zepto': 'webpack-zepto'
    })
  ]
}
