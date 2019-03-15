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
        let data = await User.find().sort({ '_id': -1 }) // 将新创建的头插
            .skip((current - 1) * size)
            .limit(size); // pagesize:一页几条

        let total = await User.find().count();
        ctx.body = {
            code: 0,
            total,
            data,
        }
    });

    // /remove?name=chen
    router.post('/remove', async function (ctx, next) {
        let postData = ctx.request.body;
        let name = postData.name;
        await User.remove({ 'name': name });
        ctx.body = {
            code: 0,
            errmsg: '删除成功',
        };
    });

    // /removeMany? _id=16999 
    router.post('/removeMany', async function (ctx, next) {
        let req = ctx.request.body;
        let delArr = req._id || [];
        for (let key in delArr) {
            await User.remove({ '_id': delArr[key] });
        };
        ctx.body = {
            code: 0,
            errmsg: '删除成功',
        };
    });

    // /add (有问题，增加的数据不正确?  解决:请求头为application/json)
    router.post('/add', async function (ctx, next) {
        ctx.set('Content-Type', 'application/json');
        let postData = ctx.request.body;
        let newData = new User(postData);
        await newData.save();
        ctx.body = {
            code: 0,
            errmsg: "添加成功",
        };
    });

    // /edit 
    router.post('/edit', async function (ctx, next) {
        let postData = ctx.request.body;
        let name = postData.name;
        await User.update({ "name":name }, postData);
        ctx.body = {
            code: 0,
            errmsg: "修改成功",
        }
    })

    app.use(router.routes())
    app.listen(8016, () => console.log("端口启动:" + `${port}`));

});

