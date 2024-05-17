import { useState, useRef, useEffect } from 'react';
import Button from '../button';
import styles from './Edit-type-pop.module.css';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { event } from 'jquery';

const EditTypePop = ({
  showEditType,
  setShowEditType,
  setTypeFlag,
  types,
  projectSelected,
}) => {
  const router = useRouter();
  const mainImage = useRef(null);
  const firstImage = useRef(null);
  const secondImage = useRef(null);
  const [selectedFileEdit, setSelectedFileEdit] = useState(null);
  const { id } = useSelector((state) => state.userState);
  const [errorMessage, setErrorMessage] = useState(null);
  const { typeEdit } = useSelector((state) => state.editObjectState);
  const [infoType, setInfoType] = useState({});

  const [datos, setDatos] = useState({
    projectId: router.query.id,
    typeDescription: '',
    size: '',
    bed: '',
    bath: '',
    privateArea: '',
    balconyArea: '',
    storageArea: '',
    priceStorage: '0',
  });

  const getType = async () => {
    const response = await fetch('/api/getTypeInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        typeId: typeEdit.idType,
      }),
    });
    const responseType = await response.json();

    setInfoType(responseType[0]);
    console.log('respuesta type: ', responseType[0]);
  };

  useEffect(() => {
    getType();
  }, [typeEdit]);

  useEffect(() => {
    getType();
  }, []);

  useEffect(() => {
    if (showEditType && types.find((type) => type.idType === typeEdit.idType)) {
      setDatos({
        ...datos,
        typeDescription: types.filter(
          (type) => type.idType === typeEdit.idType
        )[0].type,
      });
    }
  }, [showEditType]);

  useEffect(() => {
    if (infoType) {
      setDatos({ ...datos, ...infoType });
      console.log('Datos: ', datos);
    }
  }, [infoType]);

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleFileChange = (event) => {
    setSelectedFileEdit(event.target.files[0]);
  };

  function handleBloth(e) {
    handleFileChange(e);
    readURL(e);
  }

  const readURL = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (event.target.id === 'mainImgProjectEdit') {
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

  const cancelInfo = () => {
    setShowEditType(false);
    // cleanForm();
  };

  const sendFormInfo = async () => {
    console.log(
      JSON.stringify({
        id,
        datos,
      })
    );

    try {
      const typeCreated = await fetch('/api/editType', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          datos,
        }),
      });

      console.log('Tipo Editado: ', typeCreated);

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

      if (typeCreated.ok && selectedFileEdit) {
        const formData = new FormData();
        formData.append('type', 'TIPOM');
        formData.append('subType', 'IMGPR');
        formData.append('idObject', typeEdit.idType);
        formData.append('file', selectedFileEdit);

        try {
          const response = await fetch(
            'http://44.206.53.75/Sales-1.0/REST_Index.php/backend/UploadFile',
            {
              method: 'POST',
              body: formData,
              mode: 'no-cors',
            }
          );

          if (response.ok) {
            console.log('Imagen subida correctamente');
          } else {
            console.error('Error al subir la imagen');
          }
        } catch (error) {
          console.error('Error al realizar la solicitud:', error);
        }
      }

      document
        .querySelector(`.${styles.popSuccessCreated}`)
        .classList.add(styles.activePopUp);

      setTimeout(() => {
        // router.push(`/detail-estate/${router.query.id}`);
        // window.location.reload();
        setTypeFlag(true);
        document
          .querySelector(`.${styles.popSuccessCreated}`)
          .classList.remove(styles.activePopUp);

        cleanForm();
        setShowEditType(false);
      }, 2000);
    } catch (error) {
      document
        .querySelector(`.${styles.popError}`)
        .classList.add(styles.activePopUp);

      setTimeout(() => {
        document
          .querySelector(`.${styles.popError}`)
          .classList.remove(styles.activePopUp);
      }, 2000);
      console.error('Error al Editar el proyecto:', error);
    }
  };

  const cleanForm = () => {
    setDatos({
      projectId: router.query.id,
      typeDescription: '',
      size: '',
      bed: '',
      bath: '',
      privateArea: '',
      balconyArea: '',
      storageArea: '',
      priceStorage: '0',
    });
  };

  return (
    <>
      <div
        className={`${styles.typePopUp} ${
          showEditType ? styles.activePopUp : ''
        } flex j-e a-s`}>
        <div
          className={`${styles.bgTypePopUp}`}
          onClick={() => setShowEditType(false)}></div>
        <div className={`${styles.wrapperTypePopUp}`}>
          <div className={`${styles.topContent}`}>
            <div className={`${styles.topContentInfo}`}>
              <h1 className={`${styles.topContentTitle}`}>
                {projectSelected.projectName}
              </h1>
              <h2 className={`${styles.topContentSubTitle}`}>
              Edición de tipo
              </h2>
            </div>
            <div
              className={`${styles.closeIcon} bg-ct`}
              onClick={() => setShowEditType(false)}
            />
          </div>

          <form className={styles.formType} onSubmit={sendFormInfo}>
            <div className={`${styles.inputsGroup} flex a-st`}>
              <span className={styles.labelText}>Nombre</span>
              <input
                type="text"
                name="typeDescription"
                value={datos.typeDescription}
                className={styles.inputTypeForm}
                onChange={handleChange}
                required
              />
            </div>
            <div className={`${styles.inputsGroup} flex a-st`}>
              <span className={styles.labelText}>Imágen del Proyecto</span>
              <div className={styles.image}>
                <div className={styles['main-image']}>
                  <div
                    className={`bg-ct ${styles.deleteIcon}`}
                    onClick={deleteImage}></div>
                  <label
                    htmlFor="mainImgProject"
                    className={styles.labelInputImage}>
                    <input
                      id="mainImgProject"
                      type="file"
                      hidden
                      onChange={handleBloth}
                      accept="image/*"
                      name="mainImage"
                    />
                    <div
                      className={`${styles.imageSelected}`}
                      ref={mainImage}></div>
                  </label>
                </div>
              </div>
            </div>

            <div className={`${styles.inputsGroup}`}>
              <label
                className={`${styles.typeLabel} ${styles.manyTypeLabels} flex j-sb a-c`}>
                <span className={styles.labelInputTitle}>Habitaciones</span>
                <input
                  type="text"
                  name="bed"
                  value={datos.bed}
                  className={styles.inputTypeForm}
                  onChange={handleChange}
                  required
                />
              </label>

              <label
                className={`${styles.typeLabel} ${styles.manyTypeLabels} flex j-sb a-c`}>
                <span className={styles.labelInputTitle}>Baños</span>
                <input
                  type="text"
                  name="bath"
                  value={datos.bath}
                  className={styles.inputTypeForm}
                  onChange={handleChange}
                  required
                />
              </label>

              <label
                className={`${styles.typeLabel} ${styles.manyTypeLabels} flex j-sb a-c`}>
                <span className={styles.labelInputTitle}>Área Priv.</span>
                <input
                  type="text"
                  name="size"
                  value={datos.size}
                  className={styles.inputTypeForm}
                  onChange={handleChange}
                  required
                />
              </label>

              <label
                className={`${styles.typeLabel} ${styles.manyTypeLabels} flex j-sb a-c`}>
                <span className={styles.labelInputTitle}>Área Constr.</span>
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
                <span className={styles.labelInputTitle}>Área Balcón</span>
                <input
                  type="text"
                  name="balconyArea"
                  value={datos.balconyArea}
                  className={styles.inputTypeForm}
                  onChange={handleChange}
                  required
                />
              </label>

              <label
                className={`${styles.typeLabel} ${styles.manyTypeLabels} flex j-sb a-c`}>
                <span className={styles.labelInputTitle}>Depósito Área</span>
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

            {/*
            <label htmlFor="" className={styles.compeleteLabel}>
            <p className={`${styles.labelTextGroup}`}>ASIGNAR PROYECTO:</p>
            <input
              placeholder="SELECCIONA LOS ASESORES"
              type="text"
              className={`${styles.targetInputGroup} ${styles.tl}`}
            />
          </label>
          */}
          </form>
          <div className={`${styles.BottomContent}`}>
            <Button
              buttonType={'secondary'}
              iconImage={false}
              label={'CANCELAR'}
              inheritClass={styles.buttonCreateType}
              clickFunction={cancelInfo}
            />
            <Button
              buttonType={'primary'}
              iconImage={false}
              label={'Guardar'}
              inheritClass={styles.buttonCreateType}
              clickFunction={sendFormInfo}
            />
          </div>
        </div>
      </div>
      <div className={`${styles.popSuccessCreated}`}>
        <div className={styles.bgPopUp}></div>
        <div className={styles.popup2}>
          <div className={styles.content}>
            <div className={styles['icon-box']}>
              <img src="/images/check-circle.png" />
              <span className={styles['pop-text']}>
                ¡Tú tipo ha sido creado con éxito!
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.popError}`}>
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

export default EditTypePop;
