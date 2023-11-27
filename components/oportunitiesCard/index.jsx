import React from 'react';
import styles from "./oportunities-card.module.css";


const OportunitiesCard = ({
  state,
  name,
  location,
  image,
  type,
  followingDate,
  hot
}) => {
  
  
  return (
    <>        
        <div className={`${styles["card-unit"]} ${styles[`${state ? 'card-state-active' : 'card-state-disabled'}`]}`}>

          <div className={styles["card-info-container"]}>
            
            <div className={styles["img-card"]}>
              <img 
                className={styles["image-card-circle"]}
                src={image}/>
            </div>

            <div className={styles["card-info"]}>

              <span className={styles["card-title"]}>{name}</span>
              <span className={styles["card-location"]}>{location}</span>
              <span className={styles["card-sub"]}>{type}</span>
              <div className={styles["card-detalles"]}>Seguimiento: {followingDate}</div>

            </div>

            <div className={styles["card-right-arrow-icon"]}></div>
            
          </div>

          <div className={styles["card-progress-bar-container"]}>
            {hot === "cold" &&  
              <>
                <div className={styles["card-progress-bar-frost-icon"]}></div>
                <div className={styles["card-progress-bar-cold"]}></div>
              </>
            }

            {hot === "hot" &&  
              <>
                <div className={styles["card-progress-bar-hot-icon"]}></div>
                <div className={styles["card-progress-bar-hot"]}></div>
              </>
            }

            {hot === "warm" &&  
              <>
                <div className={styles["card-progress-bar-warm-icon"]}></div>
                <div className={styles["card-progress-bar-warm"]}></div>
              </>
            }         

          </div>

        </div>      
    </>
  );
};

export default OportunitiesCard;
