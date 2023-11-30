import React, { useState } from "react";
import Button from "../button";
import styles from "./Units.module.css";
import { useSelector } from "react-redux";
import Unit from "../unit";
import Link from "next/link";

const Units = ({ setCreateOportunity, units }) => {
  const [showFormUnits, setShowFormUnits] = useState(false);
  const { user_rol } = useSelector((state) => state.userState);

  return (
    <div className="caracteristicas">
      {user_rol === "ADMIN" && (
        <Button
          classNameInherit={"align-end"}
          buttonType={"primary"}
          label="Agregar Unidad"
          iconImage={"/images/plus.svg"}
          clickFunction={() => {
            setShowFormUnits(true);
          }}
        />
      )}
      <div className="caracteristicas-top">
        <div className="top-tabla">ID</div>
        <div className="top-tabla">Alcobas</div>
        <div className="top-tabla">Baños</div>
        <div className="top-tabla">Precio</div>
        <div className="top-tabla"></div>
      </div>
      {units.map((unit, i) => (
        <Unit key={i} unit={unit} setCreateOportunity={setCreateOportunity} />
      ))}

      <form
        className={`${styles.formUnits} ${
          showFormUnits ? styles.activeFormUnits : ""
        } flex j-c a-c`}
      >
        <div
          className={`${styles.removeEditUnit} bg-ct`}
          onClick={() => {
            setShowFormUnits(false);
          }}
        ></div>

        <div className={`${styles.outerInput}`}>
          <input type="number" className={styles.inputFormUnit} />
        </div>
        <div className={`${styles.outerInput}`}>
          <input type="text" className={styles.inputFormUnit} />
        </div>
        <div className={`${styles.outerInput}`}>
          <input type="number" className={styles.inputFormUnit} />
        </div>
        <div className={`${styles.outerInput}`}>
          <input type="text" className={styles.inputFormUnit} />
        </div>

        <button className={`${styles.submitUnit} bg-ct`}></button>
      </form>

      {user_rol === "ADMIN" && (
        <div className={`${styles.excelsButtons} flex j-e a-c`}>
          <Button
            inheritClass={styles.excelsButton}
            className={`primary`}
            buttonType={"primary"}
            label="Subir excel"
            iconImage={false}
          />
          <Button
            inheritClass={styles.excelsButton}
            buttonType={"secondary"}
            label="Descargar excel"
            iconImage={false}
          />
        </div>
      )}
    </div>
  );
};

export default Units;
