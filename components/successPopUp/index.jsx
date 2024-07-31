import React, { useEffect, useState, useContext } from 'react';
import styles from './success.module.css';
import BildContext from '../context';

const SuccessPopUp = ({ message }) => {
  const [activePopUp, setActivePopUp] = useState(false);
  const { isDark } = useContext(BildContext);

  useEffect(() => {
    setActivePopUp((prevState) => true);
    setTimeout(() => {
      setActivePopUp((prevState) => false);
    }, 2000);
  }, []);
  return (
    <div
      className={`${styles.popSuccessCreated} ${
        activePopUp ? styles.activePopUp : ''
      }`}>
      <div className={`bg-blur  ${styles.bgPopUp}`}></div>
      <div className={`${styles.popup2} bg-popup`}>
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
