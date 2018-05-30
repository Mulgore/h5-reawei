import React from 'react';
import Helmet from 'react-helmet'
import styles from './index.less';

const Error = () => {

  const goBack = ()=>{
    window.history.go(-1);
  }
  return (
    <div className={styles.bg}>
      <Helmet>
        <title>404</title>
      </Helmet>
      <img onClick={() => goBack()} className={styles.errorImg} src={require('../../assets/error/error_1.jpg')} alt="Error" />
    </div>
  );
}

export default Error;
