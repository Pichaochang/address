var Koa = require('koa'),
    static_ = require('koa-static'),
    compress = require('koa-compress'),
    router = require('koa-router')(),
    render = require('koa-art-template'),
    path = require('path'),
    cors = require('koa2-cors');
var app = new Koa();
let index = require('./routes/index.js')
// let apis = require('./routes/apis/apis.js')
//配置 koa-art-template模板引擎
render(app, {
    root: path.join(__dirname, 'views'),   // 视图的位置
    extname: '.html',  // 后缀名
    debug: process.env.NODE_ENV !== 'production'  //是否开启调试模式

});
app.use(require('koa-bodyparser')())
app.use(static_(
    path.join(__dirname, './views')
))
const options = { threshold: 2048 };
app.use(compress(options));
app.use(
    cors({
        origin: () => {
            // return 'http://localhost:8999'
            return '*'
        },
        // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
        credentials: true,
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'Access-Control-Allow-Methods', 'Content-Length', 'X-Requested-With','Pragma', 'Cache-Control'],
        exposeHeaders: ['Pragma', 'Cache-Control'] //设置获取其他自定义字段
    })
)
router.get('/', async (ctx) => {
    await ctx.render('index');
})
//接收post提交的数据
router.get('/news', async (ctx) => {

    let app = {

        name: '张三11',
        h: '<h2>这是一个h211</h2>',
        num: 20,
        data: ['11111111', '2222222222', '33333333333']
    };
    await ctx.render('news', {
        list: app
    });
})
router.use(index)
app.use(router.routes()).use(router.allowedMethods())
app.listen(5000);






