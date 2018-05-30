import pathToRegexp from 'path-to-regexp';
import {
  query
} from '../../services/lucky/lucky';

export default {

  namespace: 'lucky',

  state: {},

  subscriptions: {
    setup({
      dispatch,
      history
    }) {
      history.listen(({
        pathname
      }) => {
        const match = pathToRegexp('/lucky').exec(pathname);
        if (match) {
          dispatch({
            type: 'querySuccess'
          });
        }
      });
    },
  },

  effects: {
    * getLucky({
      payload
    }, {
      call,
      put
    }) {
      const data = yield call(query, payload);
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
