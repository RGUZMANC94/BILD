import React from 'react';
import styles from './oportunities-card.module.css';
import OportunitiesBar from '../../components/oportunitiesBar';

const OportunitiesCard = ({
  closed,
  estimatedProgress,
  state,
  name,
  location,
  image,
  type,
  followingDate,
  historyComponent: HistoryComponent,
  temperature,
  progress,
}) => {
  return (
    <>
      <div
        className={`${styles['card-unit']} ${
          styles[`${state ? 'card-state-active' : 'card-state-disabled'}`]
        }`}>
        <div className={styles['card-right-arrow-icon']}></div>
        <div className={styles['card-info-container']}>
          <div className={styles['img-card']}>
            <img className={styles['image-card-circle']} src={image} />
          </div>

          <div className={styles['card-info']}>
            <span className={styles['card-title']}>{name}</span>
            <span className={styles['card-location']}>{location}</span>
            <span className={styles['card-sub']}>{type}</span>
            <div className={styles['card-detalles']}>
              Seguimiento: {followingDate}
            </div>
          </div>
        </div>

        <div className={styles['card-bar-container']}>
          <OportunitiesBar
            closed={closed}
            estimatedProgress={estimatedProgress}
            temperature={temperature}
            progress={progress}
          />
        </div>
        <div className={styles['card-history-container']}>
          <HistoryComponent />
        </div>
      </div>
    </>
  );
};

export default OportunitiesCard;
