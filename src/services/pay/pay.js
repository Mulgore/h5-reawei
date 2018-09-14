import request from '../../utils/request';

export function apply(params) {
  return request({
    url: '/api/v1/pay',
    method: 'post',
    data: params,
  });
}

export function query(params) {
  return request({
    url: '/api/v1/pay',
    method: 'get',
    data: params,
  });
}
