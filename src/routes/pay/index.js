import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button } from 'antd-mobile';
import { createForm } from 'rc-form';

const Pay = ({ pay, dispatch, form: { getFieldProps, validateFields } }) => {

  const onHandleOk = () => {
    validateFields((errors, value) => {
        value.amount = 0.01;
        value.merNo ="8000000735634733";
      dispatch({type:'pay/apply', payload: value})
    });
  };
  return (
    <div>
      <Helmet>
        <title>收银台</title>
      </Helmet>
      <Button onClick={ () => onHandleOk() }>确认付款</Button>
    </div>
  );
}


Pay.propTypes = {
  form: PropTypes.object,
  pay: PropTypes.object,
};

export default connect(({ pay, loading }) => ({ pay, loading }))(createForm()(Pay));
