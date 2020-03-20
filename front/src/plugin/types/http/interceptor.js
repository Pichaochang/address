import cache from '@/utils/cache'

let tipCount = Number(localStorage.getItem('tipCount') || 0)
let errorCount = Number(localStorage.getItem('errorCount') || 0)

/**
 * 成功回调
 * @param {object} response 返回参数
 * @param {string} type 类型
 */
function responseDoSuccess (response, type) {
  // console.warn(type, response.config.url)
  if (response && response.data) {
    let data = response.data
    if (data.login) {
      tipCount++
      localStorage.setItem('tipCount', tipCount)
      if (tipCount === 1) {
        vuexStore && vuexStore.dispatch('changeAccountState', false)
      }
    } else {
      return data
    }
  }
}

/**
  * 失败回调
  * 接口报错，验证是否登陆，失败则触发全局的登出并转到登陆页面
  * @param {object} response 返回参数
  * @param {string} type 类型
  */
function responseDoError () {
  errorCount++
  localStorage.setItem('errorCount', errorCount)
  console.error(errorCount)
  if (errorCount === 1) {
    // 接口报错，验证是否登陆，失败则触发全局的登出并转到登陆页面
    cache.checkAcountLogin(() => {
      localStorage.setItem('errorCount', 0)
    })
  }
}

export default {
  responseDoSuccess,
  responseDoError,
}
