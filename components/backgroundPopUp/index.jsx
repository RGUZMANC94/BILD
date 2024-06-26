import React, { useCallback, useContext, useState } from 'react';
import styles from './backgroundPopUp.module.css';
import { useEffect } from 'react';
import BildContext from '../context';

const BackgroundPopUp = ({ children, closePopUp, closeAnimate }) => {
  const { quicksand } = useContext(BildContext);
  const [active, setActive] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setActive((prevState) => true);
    }, 100);
  }, []);

  const closePop = useCallback(() => {
    setActive((prevState) => false);
    setTimeout(() => {
      closePopUp();
    }, 350);
  }, []);

  useEffect(() => {
    if (closeAnimate) {
      closePop();
    }
  }, [closeAnimate]);

  return (
    <div
      className={`${styles.backgroudnPopUp} ${active ? styles.activePop : ''}`}>
      <div className={styles.wrapperBackgroundPopUp} onClick={closePop}></div>

      <div className={styles['right-side']}>
        {' '}
        <div className={styles.closeBackgroundPopUp} onClick={closePop}></div>
        {children}
      </div>
    </div>
  );
};

export default BackgroundPopUp;
