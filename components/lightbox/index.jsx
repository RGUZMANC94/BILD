import React, { useEffect, useState } from 'react';
import styles from './Lightbox.module.css';

const LightBox = ({ image, setLightboxImage }) => {
  const [animate, setAnimate] = useState(false);
  const style = {
    backgroundImage: `${image ? `url(${image})` : 'none'}`,
  };

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 0);
  }, []);

  return (
    <div className={`${styles.lightbox} ${animate ? 'fade' : ''} unFade`}>
      <div
        className={styles['background-lightbox']}
        onClick={() => {
          setAnimate(false);
          setTimeout(() => {
            setLightboxImage('');
          }, 550);
        }}></div>
      <div
        className={`bg-ct ${styles['close-lightbox']}`}
        onClick={() => {
          setAnimate(false);
          setTimeout(() => {
            setLightboxImage('');
          }, 550);
        }}></div>
      <div className={styles['wrapper-lightbox']}>
        <div className={`bg-cv ${styles['inner-image']}`} style={style}></div>
      </div>
    </div>
  );
};

export default LightBox;
