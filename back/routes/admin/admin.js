const router = require('koa-router')()
const DB = require('../../model/db.js')
const tools = require('../../model/tools.js')
const collectionName = 'address'
router.post('/findData', async ctx => {
  var result = await DB.findData(collectionName, {}, 1, 999)
  ctx.body = {
    result:result
  }
})
router.post('/doAdd', async ctx => {
  var addData = ctx.request.body
  const result = await DB.insert(collectionName, addData)
  ctx.body = {
    result
  }
})
router.post('/doEdit', async ctx => {
  var editData = ctx.request.body
  ctx.body = {
    xx: 11
  }
})
module.exports = router.routes()