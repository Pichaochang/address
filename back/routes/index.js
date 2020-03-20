const router = require('koa-router')()
const admin = require('./admin/admin.js')
router.use('/admin', admin)
module.exports = router.routes()