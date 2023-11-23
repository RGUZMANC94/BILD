import React from 'react';
import { useState } from 'react';
import { openPopUp } from "../../redux/popUpOportunity";
import styles from "./oportunities-all.module.css";
import OportunitiesCard from "../../components/oportunitiesCard";

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
          <OportunitiesCard hot={true}  state={false} image={"/images/tipo-1.png"} name={"Fontana Campestre"} location={"Fontana Campestre"} type={"TIPO 1 - 302"} followingDate={"23/05/23"}></OportunitiesCard>
          <OportunitiesCard hot={false} state={true}  image={"/images/tipo-1.png"} name={"Fontana Campestre"} location={"Fontana Campestre"} type={"TIPO 1 - 302"} followingDate={"23/05/23"}></OportunitiesCard>
          <OportunitiesCard hot={true} state={true}  image={"/images/tipo-1.png"} name={"Fontana Campestre"} location={"Fontana Campestre"} type={"TIPO 1 - 302"} followingDate={"23/05/23"}></OportunitiesCard>

        </div>
        

        <div className={styles["wrap-right"]}>
          <div className={styles["right"]}>
            <div className={styles["line"]}>
              <img src="/images/Ellipse 81.png" />
              <div className={styles["ver-line"]}></div>
            </div>

            <div className={styles["pendientes"]}>
              <div className={styles["pendiente-top"]}>
                <span className={styles["tipo-sub"]}>John Lennon</span>
                <ul className={styles.ulNode}>
                  <li>Fontana Campestre</li>
                  <li>Tipo 2:302</li>
                </ul>
              </div>
              <div className={styles["greybox"]}>
                <div className={styles["info"]}>
                  <label>
                    <input
                      className={styles.input}
                      type="checkbox"
                      name="cb-terminosservicio"
                      required
                    />{" "}
                    <span>05/01/22</span>
                  </label>
                  <ul>
                    <li className={styles["pendiente-list"]}>
                      <b>Pendiente 3:</b>
                    </li>
                    <li>Entregar la información de documentación</li>
                  </ul>
                </div>
                <div className={styles["time"]}>
                  <span className={styles["hour"]}>11:07 am</span>
                </div>
                <div className={styles["blue-point"]}></div>
              </div>

              <div className={styles["box-dotted"]}>
                <div className={styles["blue-point-plus"]}>3+</div>
              </div>

              <div className={styles["box"]}>
                <span>05/01/22</span>
                <ul>
                  <li className={styles["pendiente-list"]}>
                    Creación del Contacto
                  </li>
                  <li>Visita en la sala de ventas</li>
                </ul>
                <div className={styles["blue-point"]}></div>
              </div>
            </div>
            <div className={styles["pendientes-bottom"]}>
              <button
                className={styles["ver-oportunidad"]}
                onClick={() => dispatch(openPopUp(true))}
              >
                Ver Oportunidad
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default oportunitiesAll;
