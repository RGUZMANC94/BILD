import React from 'react';
import styles from './oportunities-card.module.css';
import OportunitiesBar from '../../components/oportunitiesBar';
import { useState, useEffect } from 'react';
import OportunitiesHistory from '../../components/oportunitiesHistory';

const OportunitiesCard = ({
  closed,
  estimatedProgress,
  state,
  name,
  location,
  image,
  type,
  followingDate,
  HistoryComponent,
  temperature,
  progress,
  opportunitySelected,
  oppSelectedObject,
  setRefreshFlag,
  setSelectedItemOpp,
  setOppIsSelected,
  id,
  setShowEditContact,
  setPdfURL,
  prePriceInfo,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [openFlag, setOpenFlag] = useState(false);
  const handleResize = () => {
    setIsMobile(window.innerWidth < 1024);
  };

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsMobile(true);
      setOpenFlag(false);
    }
  }, []);
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setSelectedItemOpp]);

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
          {isMobile && (
            <OportunitiesHistory
            opportunitySelected={opportunitySelected}
            oppSelectedObject={oppSelectedObject}
            setRefreshFlag={setRefreshFlag}
            setSelectedItemOpp={setSelectedItemOpp}
            setOppIsSelected={setOppIsSelected}
            id={id}
            setShowEditContact={setShowEditContact}
            setPdfURL={setPdfURL}
            prePriceInfo={prePriceInfo}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default OportunitiesCard;
