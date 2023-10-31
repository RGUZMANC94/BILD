import React from "react";
import Button from "../button";
import styles from "./Add-type-pop.module.css";

const AddTypePop = ({ showPopUpType, setShowPopUpType }) => {
  return (
    <div
      className={`${styles.typePopUp} ${
        showPopUpType ? styles.activePopUp : ""
      } flex j-e a-s`}
    >
      <div
        className={`${styles.bgTypePopUp}`}
        onClick={() => setShowPopUpType(false)}
      ></div>
      <div className={`${styles.wrapperTypePopUp}`}>
        <div className={`${styles.closeDeleteControls} flex j-sb a-c`}>
          <div
            className={`${styles.arrowBack} bg-ct`}
            onClick={() => setShowPopUpType(false)}
          ></div>
          <div className={`${styles.deleteIcon} bg-ct`}></div>
        </div>

        <form className={styles.formType}>
          <label className={`${styles.typeLabel} flex wrap j-s a-c`}>
            <span className={styles.labelText}>Nombre</span>
            <input type="text" className={styles.inputTypeForm} />
          </label>

          <div className={`${styles.inputsGroup} flex j-sb a-st`}>
            <div className={`${styles.imgType} bg-ct`}>
              <label htmlFor="imgType" className={`${styles.labelImgType}`}>
                <input type="file" name="imgType" id="imgType" hidden />
              </label>
            </div>
            <div className={`${styles.typeFeatures}`}>
              <label
                className={`${styles.typeLabel} ${styles.manyTypeLabels} flex j-sb a-c`}
              >
                <span className={styles.labelText}>Área Mt2</span>
                <input type="number" className={styles.inputTypeForm} />
              </label>
              <label
                className={`${styles.typeLabel} ${styles.manyTypeLabels} flex j-sb a-c`}
              >
                <span className={styles.labelText}>Baños</span>
                <input type="number" className={styles.inputTypeForm} />
              </label>
              <label
                className={`${styles.typeLabel} ${styles.manyTypeLabels} flex j-sb a-c`}
              >
                <span className={styles.labelText}>Cuartos</span>
                <input type="number" className={styles.inputTypeForm} />
              </label>
              <label
                className={`${styles.typeLabel} ${styles.manyTypeLabels} flex j-sb a-c`}
              >
                <span className={styles.labelText}>Garajes</span>
                <input type="number" className={styles.inputTypeForm} />
              </label>
            </div>
          </div>

          <div className={`${styles.inputsGroup} flex j-sb a-s`}>
            <label htmlFor="" className={`${styles.labelGroup}`}>
              <p className={`${styles.labelTextGroup}`}>PRECIO:</p>
              <input
                type="number"
                name=""
                id=""
                placeholder="$ 000.000.000"
                className={`${styles.targetInputGroup} t-c ${styles.inputPriceType}`}
              />
            </label>
            <label htmlFor="" className={`${styles.labelGroup}`}>
              <p className={`${styles.labelTextGroup} `}>DISPONIBILIDAD:</p>
              <select
                name=""
                id=""
                className={`${styles.targetInputGroup} t-c ${styles.statusType}`}
              >
                <option value="0" selected>
                  Disponible
                </option>
                <option value="1"></option>
                <option value="2"></option>
                <option value="3"></option>
              </select>
            </label>
          </div>

          <label htmlFor="" className={styles.compeleteLabel}>
            <p className={`${styles.labelTextGroup}`}>ASIGNAR PROYECTO:</p>
            <input
              placeholder="SELECCIONA LOS ASESORES"
              type="text"
              className={`${styles.targetInputGroup} ${styles.tl}`}
            />
          </label>

          <div className={`${styles.buttonsCreateType} flex j-sb a-s`}>
            <Button
              buttonType={"gradient"}
              iconImage={false}
              label={"CANCELAR"}
              inheritClass={styles.buttonCreateType}
            />
            <Button
              buttonType={"secondary"}
              iconImage={false}
              label={"Guardar"}
              inheritClass={styles.buttonCreateType}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTypePop;
