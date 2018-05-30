import React from 'react';
import styles from './index.less';

const Home = () => {
  return (
     <img className={styles.home_img} src={require('../../assets/home/home_1.jpeg')} alt="Home" />
  );
}

export default Home;
