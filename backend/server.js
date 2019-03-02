const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const port = 8016;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017');

const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

const User = require('./model/user');
new User({
    name: 'cc1',
    age: 23,
    address: '地址'
}).save();
new User({
    name: 'cc2',
    age: 23,
    address: '地址'
}).save();
new User({
    name: 'cc3',
    age: 23,
    address: '地址'
}).save();
new User({
    name: 'cc4',
    age: 23,
    address: '地址'
}).save();
new User({
    name: 'cc5',
    age: 23,
    address: '地址'
}).save();

mongoose.connection.on('connected', (err) => {
    if (err) return;
    console.log('链接成功');
    app.use(async function (ctx, next) {
        ctx.set("Access-Control-Allow-Origin", '*')
        ctx.set('Content-Type', 'application/json')
        await next();
    });

    // localhost:8016/getdata?page=1&size=2  需求:分页
    router.get('/getdata', async function (ctx, next) {
        let req = ctx.request.query;
        let current = req.page || 1;
        let size = req.size * 1 || 2;
        let data = await User.find()
            .skip((current - 1) * size)
            .limit(size); // pagesize:一页几条

        let total = await User.find().count();
        ctx.body = {
            code: 0,
            total,
            data,
        }
    });
    app.use(router.routes())
    app.listen(8016, () => console.log("端口启动:" + `${port}`));

});

