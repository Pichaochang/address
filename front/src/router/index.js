import Vue from 'vue'
import Router from 'vue-router'
/** 系统管理 */
import { routes as hello } from '@/view/hello/routes'

Vue.use(Router)

export default new Router({
  routes: [
    ...hello
  ],
  hashbang: false,
  history: false
})
