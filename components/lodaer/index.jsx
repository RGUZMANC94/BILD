import React from 'react';
import styles from './loader.module.css';

const Loader = () => {
  return (
    <div className={styles.wrapperLoader}>
      <div className={styles['lds-ripple']}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
