import delay from 'dva/saga';
import { getUserNameReq, getTableListReq, addReq, removeOneReq, removeManyReq, editReq } from '../services/getUser';

export default {

    namespace: 'user',

    state: {
        name: '',
        tableData: [],
        page: 1,
        size: 2,
        total:0,
    },

    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
        },
    },

    effects: {
        *fetch({ payload }, { call, put }) {  // eslint-disable-line
            yield put({ type: 'save' });
        },
        *getUserName({ payload }, { call, put }) {
            let userData = yield getUserNameReq(payload);
            yield put({ type: 'setName', payload: userData })
        },
        *addUser({ payload }, { call, put }) {
            let userData = yield addReq(payload);
            yield put({ type: 'setName', payload: userData })
        },
        *edit({ payload }, { call, put }) {
            let res = yield editReq(payload);
            if (res.code === 0) {
                console.log("编辑数据成功");
            }
        },
        *delOne({ payload }, { call, put }) {
            let res = yield removeOneReq(payload);
            if (res.code === 0) {
                console.log("删除单条数据成功");
            }
        },
        *delMany({ payload }, { call, put }) {
            let res = yield removeManyReq(payload);
            if (res.code === 0) {
                console.log("删除多条数据成功");
            }
        },
        *getTableList({ payload }, { call, put, select }) {
            yield call(delay, 5000);
            const page = yield select(state => state.user.page);
            const size = yield select(state => state.user.size);
            let tableData = yield getTableListReq({
                page,
                size,
            });
            yield put({ type: 'setTable', payload: tableData });
        },
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
        setName(state, action) {
            let { name } = action.payload;
            return {
                ...state,
                name
            };
        },
        updateName(state, action) {
            return {
                ...state,
                name: action.payload,
            };
        },
        setTable(state, action) {
            return {
                ...state,
                tableData: action.payload.data,
                total:action.payload.total,
            };
        },
        setPage(state, action) {
            return {
                ...state,
                page: action.payload.page,
                size: action.payload.size,
            };
        },
    },

};
