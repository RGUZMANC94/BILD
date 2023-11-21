import React from 'react';
import PendingCalendar from "../../components/pendingCalendar";
import PendingList from "../../components/pendingList";
import { openPopUp } from "../../redux/popUpOportunity";
import styles from "./oportunities-pending.module.css";
import { useDispatch } from "react-redux";
import { useState } from 'react';

const oportunitiesPending = () => {
  
  const [showVisualization, setVisualization] = useState("calendar");
  return (
    <>
       <div className={styles["weekly-container"]}>
        <div className={styles["weekly-title"]}>ESTA SEMANA</div>
        
          <div className={styles["pending-buttonsBar"]}>

                <div className={styles["pending-container"]}>
                    <div className={styles["pending-container-button"]}>
                    <div className={styles["icon-calendar"]}></div>
                      <button
                      className={styles["pending-buttons"]}
                      onClick={() =>  setVisualization("calendar")}
                      >
                      Candelario
                      </button>
                    </div>
                    
                    <div className={styles["pending-bar"]}></div>
                </div>
                <div className={styles["pending-container"]}>
                  <div className={styles["pending-container-button"]}>
                  <div className={styles["icon-list"]}></div>
                  
                    <button
                    className={styles["pending-buttons"]}
                    onClick={() =>  setVisualization("list")}
                    >
                    Lista
                    </button>
                  </div>
                    <div className={styles["pending-bar"]}></div>
                </div>
            </div>
        
      </div>

        {showVisualization === "calendar" && <PendingCalendar />}
        {showVisualization === "list" && <PendingList />}
    </>
  );
};

export default oportunitiesPending;
