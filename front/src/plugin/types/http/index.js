import Vue from 'vue'
import axios from 'axios'

// Full config:  https://github.com/axios/axios#request-config
axios.defaults.headers.common['X-Requested-With'] = ' XMLHttpRequest '
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// 增加ie兼容，防止get接口被缓存
axios.defaults.headers.common['Pragma'] = 'no-cache'
axios.defaults.headers.common['Cache-Control'] = 'no-cache'

axios.interceptors.response.use((response) => {}
)

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use((response) => {
  return response.data
}
)

Vue.prototype.$axios = _axios
