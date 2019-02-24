import React from 'react';
import dva from 'dva';
import { Route, routerRedux, Switch } from 'dva/router';
import createHashHistory from 'history/createHashHistory';

import App from './routes/App.js';
import Home from './routes/Home/index.js';
import createLoading from 'dva-loading';
import user from './models/user';
import './index.css';

const { ConnectedRouter } = routerRedux;

// 1. Initialize
const app = dva({
    history: createHashHistory(),
});
app.use(createLoading());

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
app.model(user);

// 4. Router
function Product({ match }) {
    if (match.path === "/product/saleIn") {
        return <h1>商品买入</h1>;
    };
    if (match.path === "/product/saleOut") {
        return <h1>商品售出</h1>;
    };
    return <h1>Hello 商品页</h1>;
};

function User() {
    return <h1>Hello 用户!</h1>;
};

app.router(({ history }) => {
    return (
        <ConnectedRouter history={history}>
            <App>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/home" exact component={Home} />
                    <Route path="/product" exact component={Product} />
                    <Route path="/product/saleIn" exact component={Product} />
                    <Route path="/product/saleOut" exact component={Product} />
                    <Route path="/user" exact component={User} />
                </Switch>
            </App>
        </ConnectedRouter>
    )
})

// app.router(require('./router').default);

// 5. Start
app.start('#root');
