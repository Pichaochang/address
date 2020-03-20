// vue.config.js
// 获取hash信息并写入文件
require('./hash')

const path = require('path')
const exec = require('child_process').execSync

// 在vue-config.js 中加入
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const isProduction = process.env.NODE_ENV === 'production';

function resolve (dir) {
  return path.join(__dirname, dir)
}

// 获取最后一次提交的commitID,处理异常报错
let version
try {
  version = exec('git rev-parse --short HEAD').toString().replace(/\n/, '')
} catch (e) {
  /* eslint-disable no-console */
  console.warn('Getting revision FAILED. Maybe this is not a git project.')
}

module.exports = {
  // 选项...
  assetsDir: 'build',
  devServer: {
    port: 8090,
  },
  productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
  configureWebpack:config => {
    if (isProduction) {
        config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }))
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].version = version
        args[0].title = ''
        args[0].buildTime = new Date().toLocaleString("zh-Hans-CN", {hour12: false})
        return args
      })
      .end()

    config.module
      .rule('snapsvg')
        .test(require.resolve('snapsvg'))
        .use('imports')
          .loader('imports-loader?this=>window,fix=>module.exports=0')
          .end()

    config.resolve.alias
      .set('static', resolve('public/static'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('snapsvg', resolve('node_modules/snapsvg/dist/snap.svg.js'))
      .end()

    config.externals(['hls.js'])

    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
  },
  publicPath: './'
}
