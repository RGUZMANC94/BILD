import React from 'react';
import styles from './oportunities-bar.module.css';

const OportunitiesBar = ({
  closed,
  estimatedProgress,
  temperature,
  progress,
}) => {
  let intColor = '';

  switch (temperature) {
    case 'cold':
      intColor = '#3EAAF7';
      break;

    case 'hot':
      intColor = '#F2CC3B';
      break;
    case 'warm':
      intColor = '#7FE698';
      break;
    default:
      intColor = '#3EAAF7';
  }

  const barStyle = {
    width: `${progress * 100}%`,
    backgroundColor: intColor,
  };

  const whiteBarStyle = {
    width: `${closed ? `${estimatedProgress * 100}%` : '100%'}`,
  };

  return (
    <div
      className={`${styles['card-progress-bar-container']} ${
        styles[`${temperature}`]
      }`}>
      <div
        className={styles['card-progress-bar-icon']}
        style={{ left: `calc(${progress * 100}% - 2%)` }}></div>

      <div className={styles['card-progress-bar']} style={barStyle}></div>

      <div
        className={styles['card-progress-bar-white']}
        style={whiteBarStyle}></div>

      <div className={styles['card-progress-bar-grey']}></div>
    </div>
  );
};

export default OportunitiesBar;
