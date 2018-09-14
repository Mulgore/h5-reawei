import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { createForm } from 'rc-form';

const Pay = ({ pay, dispatch, form: { getFieldProps, validateFields } }) => {
  const { payload } = pay
  return (
    <div>
      <Helmet>
        <title>收银台</title>
      </Helmet>
      <form action="http://127.0.0.1:10011/pay/url/return" method="post">
      <input type="hidden" name="amount" value={payload && payload.req_data}/>
      <input type="submit" value="确认付款" />
      </form>
    </div>
  );
}


Pay.propTypes = {
  form: PropTypes.object,
  pay: PropTypes.object,
};

export default connect(({ pay, loading }) => ({ pay, loading }))(createForm()(Pay));
