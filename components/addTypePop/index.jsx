import { useState, useRef } from 'react';
import Button from '../button';
import styles from './Add-type-pop.module.css';

const AddTypePop = ({ showPopUpType, setShowPopUpType }) => {
  const [typeName, setTypeName] = useState('');
  const [typeSize, setTypeSize] = useState('');
  const [typeBaths, setTypeBaths] = useState('');
  const [typeBeds, setTypeBeds] = useState('');
  const [typeGarage, setTypeGarage] = useState('');
  const [typePrice, setTypePrice] = useState('');
  const [typesStatus, setTypesStatus] = useState('');
  const [typesAdvisor, setTypesAdvisor] = useState('');
  const mainImageType = useRef(null);

  const createType = async (e) => {
    e.preventDefault();

    const data = {
      type_name: typeName,
      type_size: typeSize,
      type_bathrooms: typeBaths,
      type_beds: typeBeds,
      type_garages: typeGarage,
      type_price: typePrice,
      type_status: typesStatus,
      type_advisor: typesAdvisor,
      // image: URL.createObjectURL(
      //   mainImageType.current.style.backgroundImage !== ""
      //     ? mainImageType.current.style.backgroundImage
      //         .match(/url\(([^)]+)\)/i)[1]
      //         .replace(/['"]+/g, "")
      //     : ""
      // ),
    };

    const typeCreated = await fetch('/api/createType', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });

    console.log(typeCreated);
    setShowPopUpType(false);
  };

  return (
    <div
      className={`${styles.typePopUp} ${
        showPopUpType ? styles.activePopUp : ''
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

        <form className={styles.formType} onSubmit={createType}>
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
              buttonType={'primary'}
              iconImage={false}
              label={'CANCELAR'}
              inheritClass={styles.buttonCreateType}
            />
            <Button
              buttonType={'secondary'}
              iconImage={false}
              label={'Guardar'}
              inheritClass={styles.buttonCreateType}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTypePop;
