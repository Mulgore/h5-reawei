import React from 'react';
import styles from './index.less';

const Love = () => {
  return (
     <img className={styles.love_img} src={require('../../assets/love/love.jpeg')} alt="Love" />
  );
}

export default Love;
