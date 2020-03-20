import Vue from 'vue'

import App from './App'
// 全家桶
import router from './router'

// 引入组件
import './plugin/index'
// 接口汇总
import './utils/apis/'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
