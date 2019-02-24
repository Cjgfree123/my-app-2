import delay from 'dva/saga';
import { getUserNameReq, getTableListReq } from '../services/getUser';

export default {

    namespace: 'user',

    state: {
        name: '',
        tableData: [],
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
        *getTableList({ payload }, { call, put }) {
            yield call(delay, 5000);
            let tableData = yield getTableListReq(payload);
            yield put({ type: 'setTable', payload: tableData })
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
    },

};
