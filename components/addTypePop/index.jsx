import { useState, useRef } from 'react';
import Button from '../button';
import styles from './Add-type-pop.module.css';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const AddTypePop = ({ showPopUpType, setShowPopUpType }) => {
  const router = useRouter();
  const mainImage = useRef(null);
  const firstImage = useRef(null);
  const secondImage = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const { id } = useSelector((state) => state.userState);

  const [datos, setDatos] = useState({
    projectId: router.query.id,
    typeDescription: '',
    minSize: '',
    maxSize: '',
    minBed: '',
    maxBed: '',
    minBath: '',
    maxBath: '',
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

  const sendFormInfo = async (e) => {
    e.preventDefault();

    console.log(
      JSON.stringify({
        id,
        datos,
      })
    );

    try {
      const typeCreated = await fetch('/api/createType', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          datos,
        }),
      });

      console.log('Tipo creado: ', typeCreated);

      if (!typeCreated.ok) {
        throw new Error('Failed to create project');
      }

      const responseData = await typeCreated.json();

      console.log('Proyecto creado:', responseData);

      if (typeCreated.ok) {
        const formData = new FormData();
        formData.append('type', 'TIPOM');
        formData.append('subType', 'IMGPR');
        formData.append('idObject', responseData.idType);
        formData.append('file', selectedFile);

        try {
          const response = await fetch(
            'http://44.206.53.75/Sales-1.0/REST_Index.php/backend/UploadFile',
            {
              method: 'POST',
              body: formData,
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
        window.location.reload();
        setShowPopUpType(false);
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
      console.error('Error al crear el proyecto:', error);
    }
  };

  return (
    <>
      <div
        className={`${styles.typePopUp} ${
          showPopUpType ? styles.activePopUp : ''
        } flex j-e a-s`}>
        <div
          className={`${styles.bgTypePopUp}`}
          onClick={() => setShowPopUpType(false)}></div>
        <div className={`${styles.wrapperTypePopUp}`}>
          <div className={`${styles.closeDeleteControls} flex j-sb a-c`}>
            <div
              className={`${styles.arrowBack} bg-ct`}
              onClick={() => setShowPopUpType(false)}></div>
            <div className={`${styles.deleteIcon} bg-ct`}></div>
          </div>

          <form className={styles.formType} onSubmit={sendFormInfo}>
            <label className={`${styles.typeLabel} flex wrap j-s a-c`}>
              <span className={styles.labelText}>Nombre</span>
              <input
                type="text"
                name="typeDescription"
                value={datos.typeDescription}
                className={styles.inputTypeForm}
                onChange={handleChange}
                required
              />
            </label>
            {/* image*/}
            <span className={styles.label}>IMAGEN DEL PROYECTO:</span>
            <div className={`${styles.inputsGroup} flex j-sb a-st`}>
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
              <div className={`${styles.typeFeatures}`}>
                <label
                  className={`${styles.typeLabel} ${styles.manyTypeLabels} flex j-sb a-c`}>
                  <span className={styles.labelInputTitle}>Área Mt2</span>
                  <input
                    type="text"
                    name="minSize"
                    value={datos.minSize}
                    className={styles.inputTypeForm}
                    onChange={handleChange}
                    required
                  />

                  <span className={styles.labelInputText}>-</span>

                  <input
                    type="text"
                    name="maxSize"
                    value={datos.maxSize}
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
                    name="minBath"
                    value={datos.minBath}
                    className={styles.inputTypeForm}
                    onChange={handleChange}
                    required
                  />

                  <span className={styles.labelInputText}>-</span>

                  <input
                    type="text"
                    name="maxBath"
                    value={datos.maxBath}
                    className={styles.inputTypeForm}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label
                  className={`${styles.typeLabel} ${styles.manyTypeLabels} flex j-sb a-c`}>
                  <span className={styles.labelInputTitle}>Cuartos</span>
                  <input
                    type="text"
                    name="minBed"
                    value={datos.minBed}
                    className={styles.inputTypeForm}
                    onChange={handleChange}
                    required
                  />

                  <span className={styles.labelInputText}>-</span>

                  <input
                    type="text"
                    name="maxBed"
                    value={datos.maxBed}
                    className={styles.inputTypeForm}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
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
              <span className={styles['pop-text-bold']}>¡Oops!</span>Algo no está bien. Por favor, revisa los datos ingresados e inténtalo de nuevo.
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTypePop;
