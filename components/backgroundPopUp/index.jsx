import React, { useCallback, useContext, useState } from 'react';
import styles from './backgroundPopUp.module.css';
import { useEffect } from 'react';
import BildContext from '../context';

const BackgroundPopUp = ({ children, closePopUp, closeAnimate }) => {
  const { quicksand } = useContext(BildContext);
  const [active, setActive] = useState(false);
  const { initialState, isDark } = useContext(BildContext);
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
      <div className={`bg-backg-popup ${styles.wrapperBackgroundPopUp}`} onClick={closePop}></div>

      <div className={`bg-popup ${styles['right-side']}`}>
        {' '}
        <div 
        className={`${styles.closeBackgroundPopUp} bg-ct 
        ${
          isDark
            ? 'bg-[url(/images/close-white.svg)]'
            : 'bg-[url(/images/close.svg)]'
        }
      `}
        onClick={closePop}></div>
        {children}
      </div>
    </div>
  );
};

export default BackgroundPopUp;
