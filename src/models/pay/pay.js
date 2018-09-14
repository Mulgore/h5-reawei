import pathToRegexp from 'path-to-regexp';
import {
  apply, query
} from '../../services/pay/pay';
import { Toast } from 'antd-mobile';

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
            type: 'query'
          });
        }
      });
    },
  },

  effects: {
    * query({ payload }, { call, put }) {
      const data = yield call(query, {amount: '0.01'});
      if (data.success) {
        yield put({
          type:'querySuccess',
          payload: {
            req_data: data.req_data,
          }
        })
      } else {
        Toast.offline(data.message, 2);
      }
    },
    * apply({ payload }, { call, put }) {
      const data = yield call(apply, payload);
      if (data.success) {
        yield put({
          type:'querySuccess',
          payload: data
        })
      //  window.location.href=data.url;
      } else {
        Toast.offline(data.message, 2);
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
