import React, { useEffect, useState } from 'react';
import styles from './success.module.css';

const SuccessPopUp = ({ message }) => {
  const [activePopUp, setActivePopUp] = useState(false);

  useEffect(() => {
    setActivePopUp((prevState) => true);
    setTimeout(() => {
      setActivePopUp((prevState) => false);
    }, 2000);
  }, []);
  return (
    <div className={`${styles.popSuccessCreated} ${activePopUp ? styles.activePopUp : ''}`}>
      <div className={styles.bgPopUp}></div>
      <div className={styles.popup2}>
        <div className={styles.content}>
          <div className={styles['icon-box']}>
            <img src="/images/check-circle.png" />
            <span className={styles['pop-text']}>{message}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopUp;
