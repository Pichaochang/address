// 解析目录types下文件
const context = require.context('@/plugin/types', true, /index.js$/)
context.keys().forEach(key => context(key))
