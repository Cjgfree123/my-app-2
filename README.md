# my-app-2
dva基础构建(自定义侧边栏配置)

## 将路由信息:同步到redux里

* 方式一: 使用routerRedux

```
this.props.dispatch(routerRedux.push({
            pathname: 'url',
            query: {id: id}
}));

const params  = location.query;
```

* 方式二: 使用connectedRouter

```
import { routerRedux } from 'dva/router';

import createHashHistory from 'history/createHashHistory';

const { ConnectedRouter } = routerRedux;

const app = dva({
    history: createHashHistory(),
});

<ConnectedRouter history={history}></ConnectedRouter>
```



