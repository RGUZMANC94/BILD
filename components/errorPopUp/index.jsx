import React, { useEffect, useState } from 'react';
import styles from './error.module.css';

const ErrorPopUp = (errorMessage) => {
  const [activePopUp, setActivePopUp] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setActivePopUp((prevState) => true);
    }, 250);
    setTimeout(() => {
      setActivePopUp((prevState) => false);
    }, 2500);
  }, []);

  return (
    <div
      className={`${styles.popError} ${activePopUp ? styles.activePopUp : ''}`}>
      <div className={`bg-blur ${styles.bgPopUp}`}></div>
      <div className={`${styles.popup2} bg-popup`}>
        <div className={styles.content}>
          <div className={styles['icon-box']}>
            <img src="/images/error-circle.png" />
            <span className={styles['pop-text']}>
              <span className={styles['pop-text-bold']}>¡Oops!</span>{' '}
              {`Algo no
      está bien.${
        errorMessage
          ? `\n${errorMessage}`
          : '\nPor favor, revisa los datos ingresados e inténtalo de nuevo'
      }.`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPopUp;
