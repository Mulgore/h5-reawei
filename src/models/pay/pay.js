import pathToRegexp from 'path-to-regexp';
import {
  apply
} from '../../services/pay/pay';

export default {

  namespace: 'pay',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({
        pathname
      }) => {
        const match = pathToRegexp('/pay').exec(pathname);
        if (match) {
          dispatch({
            type: 'querySuccess'
          });
        }
      });
    },
  },

  effects: {
    * apply({ payload }, { call, put }) {
      const data = yield call(apply, payload);
      if (data.success) {
        yield put({
          type: 'querySuccess'
        });
      }
    },
  },

  reducers: {
    querySuccess(state, payload) {
      return { ...state,
        ...payload
      };
    },
  },

};
