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
  let height = document.body.clientHeight * 121 / 750;
  return (
    <div>
      <Helmet>
        <title>一键最佳</title>
      </Helmet>
      <div className={styles.from_bg}>
        <div className={styles.from_}>
          <InputItem className={styles.phone_input} {...getFieldProps('phone')} type="phone" placeholder="领取红包手机号">手机号码</InputItem>
          <InputItem className={styles.url_input} {...getFieldProps('url')} type="text" placeholder="饿了么红包链接">红包链接</InputItem>
          <div className={styles.btn_div}>
            <Button type="primary" onClick={() => onHandleOk()}>一键领取</Button>
          </div>
          <div className={styles.footer_info}>
            <span>1. 饿了么红包：https://h5.ele.me/hongbao/开头的链接,链接不带 lucky_number 的不是拼手气，不能用。</span><br/>
            <span>如何复制红包链接？</span><br/>
            <span>1. 分享到 QQ，选择 “我的电脑”，PC 版 QQ 复制链接。</span><br/>
            <span>2. 分享到微信，PC 版微信右键用浏览器打开，复制链接。</span><br/>
          </div>
        </div>
      </div>
      <img className={styles.banner_img} src={require('../../assets/lucky/fw658.png')} alt="aa"/>
    </div>
  );
}


Lucky.propTypes = {
  form: PropTypes.object,
  lucky: PropTypes.object,
};

export default connect(({ lucky, loading }) => ({ lucky, loading }))(createForm()(Lucky));
