import React from 'react';
import { useState } from 'react';
import { openPopUp } from "../../redux/popUpOportunity";
import styles from "./oportunities-all.module.css";
import OportunitiesCard from "../../components/oportunitiesCard";
import OportunitiesHistory from "../../components/oportunitiesHistory";

const oportunitiesAll = () => {

  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };


  return (
    <>
       <div className={styles["filter_container"]}>
              
              <label htmlFor="subject"></label>
              <select
                placeholder="Subject line"
                name="subject"
                className={styles["filter_input"]}
              >
                <option disabled defaultValue={0} hidden selected></option>
                <option>MAS CALIENTE</option>
                <option>MAS FRÍA</option>
                <option>MAS RECIENTE</option>
                <option>MENOS RECIENTE</option>
              </select>
              <span className={styles["label_filter"]}>Ordenar por:</span>
          </div>

          <div className={styles["oportunidades"]}>
        <div className={styles["card-container"]}>
          <OportunitiesCard hot={"cold"}  state={false} image={"/images/perfil-img.jpeg"} name={"Fontana Campestre"} location={"Fontana Campestre"} type={"TIPO 1 - 302"} followingDate={"23/05/23"}></OportunitiesCard>
          <OportunitiesCard hot={"hot"} state={true}  image={"/images/perfil-img.jpeg"} name={"Fontana Campestre"} location={"Fontana Campestre"} type={"TIPO 1 - 302"} followingDate={"23/05/23"}></OportunitiesCard>
          <OportunitiesCard hot={"warm"} state={true}  image={"/images/perfil-img.jpeg"} name={"Fontana Campestre"} location={"Fontana Campestre"} type={"TIPO 1 - 302"} followingDate={"23/05/23"}></OportunitiesCard>

        </div>
        

        <div className={styles["wrap-right"]}>
          <OportunitiesHistory></OportunitiesHistory>
        </div>
      </div>
    </>
  );
};

export default oportunitiesAll;
