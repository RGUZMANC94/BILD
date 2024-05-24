import React, { useEffect, useState } from 'react';
import styles from './error.module.css';

const ErrorPopUp = (errorMessage, render) => {
  const [activePopUp, setActivePopUp] = useState(false);

  useEffect(() => {
    setActivePopUp((prevState) => true);
    setTimeout(() => {
      setActivePopUp((prevState) => false);
    }, 2000);
  }, [render]);

  return (
    <div className={`${styles.popError} ${activePopUp ? styles.activePopUp : ''}`}>
      <div className={styles.bgPopUp}></div>
      <div className={styles.popup3}>
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
