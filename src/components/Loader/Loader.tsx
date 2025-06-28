import React from 'react';
import { FadeLoader } from 'react-spinners';
import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <FadeLoader color="#bcac8c" />
    </div>
  );
};

export default Loader;
