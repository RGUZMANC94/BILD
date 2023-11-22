import React from 'react';
import styles from "./oportunities-card.module.css";

const OportunitiesCard = ({
  name,
  image,
  type,
  followingDate
}) => {
  return (
    <>        
          <div className={`${styles["card-unit"]} ${styles.active}`}>

            <div className={styles["img-card"]}>
              <img 
                className={styles["image-card-circle"]}
                src="/images/tipo-1.png"/>
            </div>

            <div className={styles["card-info"]}>

              <span className={styles["card-title"]}>{name}</span>
              <span className={styles["card-sub"]}>{type}</span>
              <div className={styles["card-detalles"]}>Seguimiento: {followingDate}</div>

            </div>

            <div className={styles["card-right-arrow-icon"]}></div>

          </div>      
    </>
  );
};

export default OportunitiesCard;
