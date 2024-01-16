import { useState, useRef } from 'react';
import Button from '../button';
import styles from './Add-unit-pop.module.css';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const AddTypePop = ({ showPopUpUnit, setShowPopUpUnit }) => {
  const router = useRouter();
  const mainImage = useRef(null);
  const firstImage = useRef(null);
  const secondImage = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const { id } = useSelector((state) => state.userState);
  const { typeSelectedName } = useSelector((state) => state.typeState);

  const [datos, setDatos] = useState({
    projectId: router.query.id,
    nuimb: '',
    phase: '1',
    type: typeSelectedName,
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
    parkingAmount: '',
    parkingType: '',
    view: 'E',
    parkingPrice: '0.0',
    storageAreaPrice: '0.0',
    propertyPrice: '',
    piso: '0',
  });

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
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
      parkingArea: addDecimalZero(datos.parkingArea),
      storageArea: addDecimalZero(datos.storageArea),
      builtArea: addDecimalZero(datos.builtArea),
      parkingPrice: addDecimalZero(datos.parkingPrice),
      storageAreaPrice: addDecimalZero(datos.storageAreaPrice),
      propertyPrice: addDecimalZero(datos.propertyPrice),
    };

    console.log(
      JSON.stringify({
        id,
        updatedDatos,
      })
    );

    /* try {
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
        throw new Error('Failed to create unit');
      }

      const responseData = await typeCreated.json();

      console.log('Proyecto creado:', responseData);

      document
        .querySelector(`.${styles.popSuccessTypeCreated}`)
        .classList.add(styles.activePopUp);

      setTimeout(() => {
        // router.push(`/detail-estate/${router.query.id}`);
        window.location.reload();
        setShowPopUpUnit(false);
      }, 2000);
    } catch (error) {
      console.error('Error al crear el proyecto:', error);
    }*/
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

          <span className={styles.label}>Nombre proyecto</span>
          <span className={styles.labelSubtitle}>Nombre tipo</span>

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
                  <span className={styles.labelInputTitle}>ALCOBAS</span>
                  <input
                    type="text"
                    name="bedrooms"
                    value={datos.bedrooms}
                    className={styles.inputTypeForm}
                    onChange={handleChange}
                    required
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
              </div>
            </div>

            <div className={`${styles.inputsGroup} flex j-sb a-st`}>
              <div className={`${styles.typeFeatures}`}>
                <label
                  className={`${styles.typeLabel} ${styles.manyTypeLabels} flex j-sb a-c`}>
                  <span className={styles.labelInputTitle}>A. CONSTR</span>
                  <input
                    type="text"
                    name="builtArea"
                    value={datos.builtArea}
                    className={styles.inputTypeForm}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label
                  className={`${styles.typeLabel} ${styles.manyTypeLabels} flex j-sb a-c`}>
                  <span className={styles.labelInputTitle}>A. HABITAB</span>
                  <input
                    type="text"
                    name="privateArea"
                    value={datos.privateArea}
                    className={styles.inputTypeForm}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label
                  className={`${styles.typeLabel} ${styles.manyTypeLabels} flex j-sb a-c`}>
                  <span className={styles.labelInputTitle}>A. TERRAZA</span>
                  <input
                    type="text"
                    name="terraceArea"
                    value={datos.terraceArea}
                    className={styles.inputTypeForm}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label
                  className={`${styles.typeLabel} ${styles.manyTypeLabels} flex j-sb a-c`}>
                  <span className={styles.labelInputTitle}>A. BALCÓN</span>
                  <input
                    type="text"
                    name="balconyArea"
                    value={datos.balconyArea}
                    className={styles.inputTypeForm}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
            </div>

            <div className={`${styles.inputsGroup} flex j-sb a-st`}>
              <div className={`${styles.typeFeatures}`}>
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

                <label
                  className={`${styles.typeLabel} ${styles.manyTypeLabels} flex j-sb a-c`}>
                  <span className={styles.labelInputTitle}>DEPOSITO A.</span>
                  <input
                    type="text"
                    name="storageArea"
                    value={datos.storageArea}
                    className={styles.inputTypeForm}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
            </div>

            <div className={`${styles.buttonsCreateType}`}>
              <Button
                buttonType={'primary'}
                iconImage={false}
                label={'CANCELAR'}
                inheritClass={styles.buttonCreateType}
                href="/"
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
      <div className={`${styles.popSuccessTypeCreated}`}>
        <div className={styles.bgPopUp}></div>
        <div className={styles.popup2}>
          <div className={styles.content}>
            <div className={styles['icon-box']}>
              <img src="/images/check-circle.png" />
              <span className={styles['pop-text']}>
                ¡Tú unidad ha sido creado con éxito!
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTypePop;
