import { useState, useRef } from 'react';
import Button from '../button';
import styles from './Add-unit-pop.module.css';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import SquareInput from '../squareInput';

const AddTypePop = ({
  showPopUpUnit,
  setShowPopUpUnit,
  types,
  setUnitFlag,
}) => {
  const router = useRouter();
  const mainImage = useRef(null);
  const firstImage = useRef(null);
  const secondImage = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const { id } = useSelector((state) => state.userState);
  const { typeSelectedName } = useSelector((state) => state.typeState);
  const { projectsList } = useSelector((state) => state.projectState);
  const [optionalPop, setOptionalPop] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [datos, setDatos] = useState({
    projectId: router.query.id,
    nuimb: '',
    phase: '1',
    type: '-1',
    status: '0',
    group: '0',
    fieldSize: '0.0',
    privateArea: '',
    balconyArea: '',
    terraceArea: '',
    parkingArea: '0.0',
    storageArea: '',
    builtArea: '',
    bedrooms: '',
    baths: '',
    parkingAmount: '0',
    parkingType: 'D',
    view: 'E',
    parkingPrice: '0.0',
    storageAreaPrice: '0.0',
    propertyPrice: '',
    piso: '1',
  });

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleOptional = () => {
    setOptionalPop(!optionalPop);
  };

  function handleBloth(e) {
    handleFileChange(e);
    readURL(e);
  }

  const readURL = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (event.target.id === 'mainImgProject') {
          mainImage.current.style.backgroundImage = `url(${e.target.result})`;
          mainImage.current.parentNode.parentNode.classList.add(styles.active);
          return;
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const deleteImage = (e) => {
    const deleteIconSelected = e.target;
    const parentDeleteIcon = deleteIconSelected.parentNode;
    const imageSelected = parentDeleteIcon.querySelector(
      `.${styles.imageSelected}`
    );
    const inputSelected = parentDeleteIcon.querySelector('input');

    if (parentDeleteIcon) {
      imageSelected.style.backgroundImage = 'none';
      parentDeleteIcon.classList.remove(styles.active);
      inputSelected.value = '';
    }
  };

  const addDecimalZero = (value) => {
    const floatValue = parseFloat(value);
    return isNaN(floatValue) ? `${value}.0` : floatValue.toFixed(1);
  };

  const sendFormInfo = async (e) => {
    e.preventDefault();

    const updatedDatos = {
      ...datos,
      fieldSize: addDecimalZero(datos.fieldSize),
      privateArea: addDecimalZero(datos.privateArea),
      balconyArea: addDecimalZero(datos.balconyArea),
      terraceArea: addDecimalZero(datos.terraceArea),
      // parkingArea: addDecimalZero(datos.parkingArea),
      storageArea: addDecimalZero(datos.storageArea),
      builtArea: addDecimalZero(datos.builtArea),
      // parkingPrice: addDecimalZero(datos.parkingPrice),
      // storageAreaPrice: addDecimalZero(datos.storageAreaPrice),
      propertyPrice: addDecimalZero(datos.propertyPrice),
      type: typeSelectedName,
      parkingAmount: '0',
    };

    console.log('Datos a enviar:', updatedDatos);

    if (!optionalPop) {
      delete updatedDatos.privateArea;
      delete updatedDatos.balconyArea;
      delete updatedDatos.storageArea;
      delete updatedDatos.builtArea;
      delete updatedDatos.bedrooms;
      delete updatedDatos.baths;
      delete updatedDatos.storageAreaPrice;
    }

    console.log(
      JSON.stringify({
        id,
        updatedDatos,
      })
    );

    try {
      const typeCreated = await fetch('/api/createUnit', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          updatedDatos,
        }),
      });

      console.log('Tipo creado: ', typeCreated);

      if (!typeCreated.ok) {
        const errorMessage = await typeCreated.text();
        console.log('Error FInal: ', errorMessage);
        try {
          const errorObj = JSON.parse(errorMessage);
          if (errorObj && errorObj.error) {
            const errorDescription = errorObj.error.match(
              /"Description":"([^"]*)"/
            )[1];
            const decodedErrorDescription = errorDescription.replace(
              /\\u[\dA-F]{4}/gi,
              (match) =>
                String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16))
            );
            console.log('Error Description:', decodedErrorDescription);
            setErrorMessage(decodedErrorDescription);
          } else {
            console.log('Error object or error property not found');
          }
        } catch (error) {
          console.log('Error parsing JSON:', error);
        }
        throw new Error(errorMessage);
      }

      const responseData = await typeCreated.json();

      console.log('Proyecto creado:', responseData);

      document
        .querySelector(`.${styles.popSuccessCreated}`)
        .classList.add(styles.activePopUp);

      setTimeout(() => {
        setUnitFlag(true);
        document
          .querySelector(`.${styles.popSuccessCreated}`)
          .classList.remove(styles.activePopUp);
        cleanForm();
        setShowPopUpUnit(false);
      }, 4000);
    } catch (error) {
      document
        .querySelector(`.${styles.popError}`)
        .classList.add(styles.activePopUp);

      setTimeout(() => {
        document
          .querySelector(`.${styles.popError}`)
          .classList.remove(styles.activePopUp);
      }, 4000);
      console.error('Error al crear el proyecto:', error);
    }
  };

  const cleanForm = () => {
    setDatos({
      projectId: router.query.id,
      nuimb: '',
      phase: '1',
      type: '-1',
      status: '0',
      group: '0',
      fieldSize: '0.0',
      privateArea: '',
      balconyArea: '',
      terraceArea: '',
      parkingArea: '0.0',
      storageArea: '',
      builtArea: '',
      bedrooms: '',
      baths: '',
      parkingAmount: '0',
      parkingType: 'D',
      view: 'E',
      parkingPrice: '0.0',
      storageAreaPrice: '0.0',
      propertyPrice: '',
      piso: '1',
    });
  };

  return (
    <>
      <div
        className={`${styles.typePopUp} ${
          showPopUpUnit ? styles.activePopUp : ''
        } flex`}>
        <div
          className={`${styles.bgTypePopUp}`}
          onClick={() => setShowPopUpUnit(false)}></div>
        <div className={`${styles.wrapperTypePopUp}`}>
          <div className={`${styles.closeDeleteControls} flex `}>
            <div
              className={`${styles.arrowBack} bg-ct`}
              onClick={() => setShowPopUpUnit(false)}></div>
            <div className={`${styles.deleteIcon} bg-ct`}></div>
          </div>

          <span className={styles.label}>{`${
            projectsList.filter(
              (project) => router.query.id === project.projectId
            )[0].projectName
          }`}</span>
          <span className={styles.labelSubtitle}>
            {typeSelectedName !== -1 &&
              types.filter((type) => type.idType === typeSelectedName)[0].type}
          </span>

          <form className={styles.formType} onSubmit={sendFormInfo}>
            <div className={`${styles.inputsGroup} flex j-sb a-st`}>
              <div className={`${styles.typeFeatures}`}>
                <label
                  className={`${styles.typeLabel} ${styles.manyTypeLabels} flex j-sb a-c`}>
                  <span className={styles.labelInputTitle}>ID</span>
                  <input
                    type="text"
                    name="nuimb"
                    value={datos.nuimb}
                    className={styles.inputTypeForm}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label
                  className={`${styles.typeLabel} ${styles.manyTypeLabels} flex j-sb a-c`}>
                  <span className={styles.labelInputTitle}>PRECIO</span>
                  <input
                    type="text"
                    name="propertyPrice"
                    value={datos.propertyPrice}
                    className={styles.inputTypeForm}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label
                  className={`${styles.typeLabel} ${styles.manyTypeLabels} flex j-sb a-c`}>
                  <span className={styles.labelInputTitle}>AREA TERRAZA</span>
                  <input
                    type="text"
                    name="terraceArea"
                    value={datos.terraceArea}
                    className={styles.inputTypeForm}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
            </div>

            <div className={styles.squareInputContainer}>
              <SquareInput onChangeFunct={handleOptional} />
              <span className={styles.labelQuotesSelectNoLine}>
                Personalizar informacion
              </span>
            </div>
            {optionalPop && (
              <>
                <div className={`${styles.inputsGroup} flex j-sb a-st`}>
                  <div className={`${styles.typeFeatures}`}>
                    <label
                      className={`${styles.typeLabel} ${styles.manyTypeLabels} flex j-sb a-c`}>
                      <span className={styles.labelInputTitle}>
                        HABITACIONES
                      </span>
                      <input
                        type="text"
                        name="bedrooms"
                        value={datos.bedrooms}
                        className={styles.inputTypeForm}
                        onChange={handleChange}
                      />
                    </label>

                    <label
                      className={`${styles.typeLabel} ${styles.manyTypeLabels} flex j-sb a-c`}>
                      <span className={styles.labelInputTitle}>BAÑOS</span>
                      <input
                        type="text"
                        name="baths"
                        value={datos.baths}
                        className={styles.inputTypeForm}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>

                <div className={`${styles.inputsGroup} flex j-sb a-st`}>
                  <div className={`${styles.typeFeatures}`}>
                    <label
                      className={`${styles.typeLabel} ${styles.manyTypeLabels} flex j-sb a-c`}>
                      <span className={styles.labelInputTitle}>
                        AREA CONSTR
                      </span>
                      <input
                        type="text"
                        name="builtArea"
                        value={datos.builtArea}
                        className={styles.inputTypeForm}
                        onChange={handleChange}
                      />
                    </label>

                    <label
                      className={`${styles.typeLabel} ${styles.manyTypeLabels} flex j-sb a-c`}>
                      <span className={styles.labelInputTitle}>
                        AREA PRIVADA
                      </span>
                      <input
                        type="text"
                        name="privateArea"
                        value={datos.privateArea}
                        className={styles.inputTypeForm}
                        onChange={handleChange}
                      />
                    </label>

                    <label
                      className={`${styles.typeLabel} ${styles.manyTypeLabels} flex j-sb a-c`}>
                      <span className={styles.labelInputTitle}>
                        AREA BALCÓN
                      </span>
                      <input
                        type="text"
                        name="balconyArea"
                        value={datos.balconyArea}
                        className={styles.inputTypeForm}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>

                <div className={`${styles.inputsGroup} flex j-sb a-st`}>
                  <div className={`${styles.typeFeatures}`}>
                    {/* 
                      
                       <label
                      className={`${styles.typeLabel} ${styles.manyTypeLabels} flex j-sb a-c`}>
                      <span className={styles.labelInputTitle}>N° PARQU.</span>
                      <input
                        type="text"
                        name="parkingAmount"
                        value={datos.parkingAmount}
                        className={styles.inputTypeForm}
                        onChange={handleChange}
                        required
                      />
                    </label>

                    <label
                      className={`${styles.typeLabel} ${styles.manyTypeLabels} flex j-sb a-c`}>
                      <span className={styles.labelInputTitle}>TIPO PARQU.</span>
                      <label htmlFor="subject"></label>
                      <select
                        type="text"
                        name="parkingType"
                        value={datos.parkingType}
                        onChange={handleChange}
                        className={styles.subject_input}
                        required>
                        <option disabled defaultValue={0} hidden selected></option>
                        <option value="S">sencillo</option>
                        <option value="D">Doble</option>
                      </select>
                    </label>
                      
                      */}

                    <label
                      className={`${styles.typeLabel} ${styles.manyTypeLabels} flex j-sb a-c`}>
                      <span className={styles.labelInputTitle}>
                        AREA DEPOSITO
                      </span>
                      <input
                        type="text"
                        name="storageArea"
                        value={datos.storageArea}
                        className={styles.inputTypeForm}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>
              </>
            )}

            <div className={`${styles.buttonsCreateType}`}>
              <Button
                buttonType={'primary'}
                iconImage={false}
                label={'CANCELAR'}
                inheritClass={styles.buttonCreateType}
                href="/"
                clickFunction={() => setShowPopUpUnit(false)}
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
      <div className={`${styles.popSuccessCreated}`}>
        <div className={styles.bgPopUp}></div>
        <div className={styles.popup2}>
          <div className={styles.content}>
            <div className={styles['icon-box']}>
              <img src="/images/check-circle.png" />
              <span className={styles['pop-text']}>
                ¡Tú unidad ha sido creada con éxito!
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.popError} `}>
        <div className={styles.bgPopUp}></div>
        <div className={styles.popup3}>
          <div className={styles.content}>
            <div className={styles['icon-box']}>
              <img src="/images/error-circle.png" />
              <span className={styles['pop-text']}>
                <span className={styles['pop-text-bold']}>¡Oops!</span>{' '}
                {`Algo no
                está bien.${
                  errorMessage
                    ? `\n${errorMessage}`
                    : '\nPor favor, revisa los datos ingresados e inténtalo denuevo'
                }.`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTypePop;
