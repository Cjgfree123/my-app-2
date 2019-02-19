import { getUserNameReq } from '../services/getUser';

export default {

    namespace: 'user',

    state: {
        name: '',
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
        }
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
    },

};
