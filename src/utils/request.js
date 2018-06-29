import axios from 'axios';
import lodash from 'lodash';
import pathToRegexp from 'path-to-regexp';
import { Toast } from 'antd-mobile';

const service = axios.create({
  timeout: 10000,
});

// request拦截器
service.interceptors.request.use(config => {
  return config;
}, error => {
  console.log(error);
  Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use((res) => {
  return res;
}, error => {
  console.log('err' + error);
  return Promise.reject(error);
},
);

const fetch = (options) => {
  let {
    method = 'get',
    data,
    url,
  } = options

  const cloneData = lodash.cloneDeep(data)

  try {
    let domin = ''
    if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
      [domin] = url.match(/[a-zA-z]+:\/\/[^/]*/)
      url = url.slice(domin.length)
    }
    const match = pathToRegexp.parse(url)
    url = pathToRegexp.compile(url)(data)
    for (let item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }
    url = domin + url
  } catch (e) {
    Toast.offline(e.message, 2);
  }

  switch (method.toLowerCase()) {
    case 'get':
      return service.get(url, {
        params: cloneData,
      })
    case 'delete':
      return service.delete(url, {
        data: cloneData,
      })
    case 'post':
      return service.post(url, cloneData)
    case 'put':
      return service.put(url, cloneData)
    case 'patch':
      return service.patch(url, cloneData)
    default:
      return service(options)
  }
}

export default function request (options) {
  return fetch(options).then((response) => {
    const { statusText, status, data } = response
    let ressult = data
    if (ressult instanceof Array) {
      ressult = {
        list: ressult,
      }
    }
    if(data.code === 0){
      return Promise.resolve({
        success: true,
        message: statusText,
        statusCode: status,
        ...ressult.data,
      });
    } else {
      return Promise.resolve({
        success: false,
        message: data.message,
        statusCode: data.code,
      });
    }
  }).catch((error) => {
    const { response } = error
    let msg
    let statusCode
    if (response && response instanceof Object) {
      const { data, statusText } = response
      statusCode = response.status
      msg = data.message || statusText
      switch (statusCode) {
        case 500:
        case 404:
        case 502:
        case 504:
          msg = '服务器开小差啦'
          break
        default:
      }
    } else {
      statusCode = 600
      msg = error.message || '服务器异常'
    }
    return Promise.reject({ success: false, statusCode, message: msg })
  })
}
