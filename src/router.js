import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import App from './routes/App.js';

function Home() {
  return <h1>Hello 主页!</h1>;
};

function Product({match}) {
  if(match.path === "/product/saleIn"){
    return <h1>商品买入</h1>;
  };
  if(match.path === "/product/saleOut"){
    return <h1>商品售出</h1>;
  };
  return <h1>Hello 商品页</h1>;
};

function User() {
  return <h1>Hello 用户!</h1>;
};

function RouterConfig({ history }) {
  return (
    <Router history={history}>
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
    </Router>
  );
}

export default RouterConfig;
