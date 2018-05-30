import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import styles from './index.less';
import { InputItem, Toast, Button } from 'antd-mobile';
import { createForm } from 'rc-form';

const Lucky = ({ lucky, dispatch, form: { getFieldProps, validateFields } }) => {

  const onHandleOk = () => {
    validateFields((errors, value) => {
      if (!value.phone) {
        Toast.info('手机号不能为空', 1);
        return;
      } else {
        const reg = /^(13|14|15|16|17|18|19)\d{9}$/;
        let phone = value.phone.replace(/\s/g, "");
        if (phone === '' || !(reg.test(phone))) {
          Toast.info('请输入正确的手机号');
          return false;
        }
        value.phone = phone;
      }
      if (!value.url) {
        Toast.info('红包链接不能为空', 1);
        return;
      } else {
        let regText1 = "https";
        let regText2 = "ele";
        let regText3 = "hongbao";
        let regText4 = "lucky_number";
        if (value.url.search(regText1) < 0 || value.url.search(regText2)< 0 || value.url.search(regText3)< 0 || value.url.search(regText4)< 0) {
          Toast.info('红包链接格式不正确', 1);
          return;
        }
      }
      dispatch({type:'lucky/getLucky', payload: value})
    });
  };

  return (
    <div className={styles.bg}>
      <Helmet>
        <title>一键最佳</title>
      </Helmet>
      <div className={styles.banner}/>
      <div className={styles.from_}>
        <InputItem className={styles.phone_input} {...getFieldProps('phone')} type="phone" placeholder="领取红包手机号">手机号码</InputItem>
        <InputItem className={styles.url_input} {...getFieldProps('url')} type="text" placeholder="饿了么红包链接">红包链接</InputItem>
      </div>
      <div className={styles.btn_div}>
        <Button type="primary" onClick={() => onHandleOk()}>一键领取</Button>
      </div>
    </div>
  );
}


Lucky.propTypes = {
  form: PropTypes.object,
  lucky: PropTypes.object,
};

export default connect(({ lucky, loading }) => ({ lucky, loading }))(createForm()(Lucky));
