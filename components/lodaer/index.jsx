import React from 'react';
import styles from './loader.module.css';

const Loader = () => {
  return (
    <div className={styles.wrapperLoader}>
      <span className={styles.lodaer}></span>
    </div>
  );
};

export default Loader;
