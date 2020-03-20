/**
 * 通过webpack自动解析目录types下文件，自动解析文件内容进行赋值
 * @see https://webpack.docschina.org/api/module-methods/#require-context
 * @see http://nodejs.cn/api/path/path_basename_path_ext.html
 */
import Vue from 'vue'
import path from 'path'
// 解析目录types下文件
const files = require.context('@/utils/apis/types', false, /.js$/)
const apis = {}
// 遍历目录下文件
files.keys().forEach(item => {
  // 获取文件名
  const name = path.basename(item, '.js')
  // 接口赋值
  apis[name] = files(item).default || files(item)
})
Vue.prototype.$apis = apis
