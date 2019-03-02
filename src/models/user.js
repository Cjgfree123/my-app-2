import delay from 'dva/saga';
import { getUserNameReq, getTableListReq } from '../services/getUser';

export default {

    namespace: 'user',

    state: {
        name: '',
        tableData: [],
        page: 1,
        size: 2,
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
        *getTableList({ payload }, { call, put, select }) {
            yield call(delay, 5000);
            const page = yield select(state => state.user.page);
            const size = yield select(state => state.user.size);
            console.log("第几页",page);
            console.log("一页几条",size);
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
                tableData: action.payload,
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
