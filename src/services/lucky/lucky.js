import request from '../../utils/request';

export function query(params) {
  return request({
    url: '/api/v1/lucky',
    method: 'post',
    data: params,
  });
}
