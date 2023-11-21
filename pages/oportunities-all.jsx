import OportunitiesAll from "../components/oportunitiesAll";
import OportunitiesPending from "../components/oportunitiesPending";
import Button from "../components/button";
import { openPopUp } from "../redux/popUpOportunity";
import styles from "../styles/Oportunities-All.module.css";
import { useDispatch } from "react-redux";
import { useState } from 'react';



const OportunitiesAllFilter = () => {
    const [showBar, setShowBar] = useState(false);

    const [showSection, setShowSection] = useState("all");

    const toggleShowBar = () => {
        setShowBar(!showBar);
    };


  return (
    
        <section className={styles["main"]}>

            <div className={styles["top-content-buttonsBar"]}>
                <div className={styles["top-content-container"]}>
                    <button
                    className={styles["top-content-buttons"]}
                    onClick={() =>  setShowSection("all")}
                    >
                    TODAS
                    </button>
                    <div className={styles["top-content-bar"]}></div>
                </div>
                <div className={styles["top-content-container"]}>
                    <button
                    className={styles["top-content-buttons"]}
                    onClick={() =>  setShowSection("pending")}
                    >
                    PENDIENTES
                    </button>
                    <div className={styles["top-content-bar"]}></div>
                </div>
                <div className={styles["top-content-container"]}>
                    <button
                    className={styles["top-content-buttons"]}
                    onClick={() =>  setShowSection("closed")}
                    >
                    CERRADAS
                    </button>
                    <div className={styles["top-content-bar"]}></div>
                </div>
            </div>

           

            {showSection === "all" && <OportunitiesAll />}
            {showSection === "pending" && <OportunitiesPending />}
                
           
            
        </section>
        
        
  );
};


export default OportunitiesAllFilter;
