import React, { useRef, useState } from 'react';
import Button from '../button';
import styles from './Units.module.css';
import { useSelector } from 'react-redux';
import Unit from '../unit';

const Units = ({
  setCreateOportunity,
  setShowPopUpUnit,
  units,
  setUnitFlag,
  xlsxTemplate,
  setShowEditUnit,
}) => {
  const [showFormUnits, setShowFormUnits] = useState(false);
  const { user_rol } = useSelector((state) => state.userState);
  const featuredProject = useRef(null);
  const [xlsxFileName, setXlsxFileName] = useState(null);
  const inputXlsx = useRef(null);
  console.log('units', units);

  const changeXlsx = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      const allowedExtensions = ['xlsx', 'csv'];

      const fileExtension = event.target.files[0].name
        .split('.')
        .pop()
        .toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        return;
      }

      reader.onload = (e) => {
        setXlsxFileName(event.target.files[0].name);
        if (featuredProject.current) {
          featuredProject.current.classList.add(styles.showXlsx);
        }
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const deleteXlsx = () => {
    featuredProject.current.classList.remove(styles.showXlsx);
    setTimeout(() => {
      setXlsxFileName('');
      inputXlsx.current.value = '';
      setXlsxData(null);
    }, 300);
  };

  const [xlsxData, setXlsxData] = useState(null);

  const handleXlsxData = (e) => {
    setXlsxData(e.target.files[0]);
  };

  const sendXlsx = async () => {
    if (xlsxData) {
      const formData = new FormData();
      formData.append('properties', xlsxData);

      console.log('formData: ', formData);

      try {
        const response = await fetch(
          'http://44.206.53.75/Sales-1.0/REST_Index.php/backend/UploadProperties',
          {
            method: 'POST',
            body: formData,
            mode: 'no-cors',
          }
        );

        if (response.ok) {
          console.log('Batch de unidades subido correctamente');
        } else {
          const errorText = await response.text();
          const errorDta = await response;
          console.log('Error: ', errorText);
          console.log('Error: ', errorDta);
        }

        document
          .querySelector(`.${styles.popSuccessCreated}`)
          .classList.add(styles.activePopUp);

        setTimeout(() => {
          setUnitFlag(true);
          document
            .querySelector(`.${styles.popSuccessCreated}`)
            .classList.remove(styles.activePopUp);
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
        console.error(error.message);
        console.error('Error al realizar la solicitud:', error.message);
      }
    } else {
      console.error('No se ha seleccionado ningún archivo.');
    }
  };

  function handleXlsxClick(e) {
    changeXlsx(e);
    handleXlsxData(e);
  }

  return (
    <>
      <div className="caracteristicas">
        <div className={styles.upperButtons}>
          {user_rol === 'ADMIN' && (
            <Button
              buttonType={'primary'}
              label="Agregar Unidad"
              iconImage={'/images/plus.svg'}
              clickFunction={() => {
                setShowPopUpUnit(true);
                // setShowFormUnits(true);
              }}
            />
          )}
          <label className={styles.file}>
            <a
              className={styles.descargar}
              href={xlsxTemplate ? xlsxTemplate[0].url : '#'}>
              <img src="/images/download.svg" />
              Descargar Excel Base
            </a>
          </label>
        </div>
        <div className="caracteristicas-top">
          <div className="top-tabla">ID</div>
          <div className="top-tabla">Alcobas</div>
          <div className="top-tabla">Baños</div>
          <div className="top-tabla">Precio</div>
        </div>
        {units.length > 0 &&
          units.map((unit, i) => (
            <Unit
              key={i}
              unit={unit}
              setCreateOportunity={setCreateOportunity}
              setShowEditUnit={setShowEditUnit}
            />
          ))}
        {units.length === 0 && (
          <div className={styles['bottom-content']}>
            No hay unidades registradas
          </div>
        )}

        <form
          className={`${styles.formUnits} ${
            showFormUnits ? styles.activeFormUnits : ''
          } flex j-c a-c`}>
          <div
            className={`${styles.removeEditUnit} bg-ct`}
            onClick={() => {
              setShowFormUnits(false);
            }}></div>

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

        {user_rol === 'ADMIN' && (
          <div className={`${styles.excelsButtons}`}>
            <div className={`${styles.uploadButtons} flex j-e a-c`}>
              {/*
          <Button
            inheritClass={styles.excelsButton}
            className={'primary'}
            buttonType={'primary'}
            label="Subir excel"
            iconImage={false}
            clickFunction={(e) => {handleXlsxClick(e);}}
          />
          <Button
            inheritClass={styles.excelsButton}
            buttonType={'secondary'}
            label="Descargar excel"
            iconImage={false}
            clickFunction={() => {sendXlsx();}}
          />
      */}

              <label className={styles.subir}>
                SUBIR EXCEL de INVENTARIO
                <input
                  type="file"
                  hidden
                  ref={inputXlsx}
                  onChange={handleXlsxClick}
                  accept=".xlsx, .xls, .csv"
                  name="excel"
                />
              </label>

              <label
                className={xlsxData ? styles.subir : styles.disabledButton}>
                SUBIR PROYECTOS
                <input type="button" hidden onClick={sendXlsx} name="excel" />
              </label>
            </div>
            <div className={`${styles.projectDocument}`} ref={featuredProject}>
              <p className={styles['text-origen']}>DOCUMENTO unidades:</p>
              <div className={`${styles.projectUploaded} flex j-sb a-c`}>
                <div className={`${styles.backroundSide} flex j-s a-c`}>
                  <div className={`${styles.xlsxIcon} bg-ct`}></div>
                  <p className={`${styles.xlsxName}`}>{xlsxFileName}</p>
                </div>
                <div
                  className={`${styles.deleteXlsxUploaded} bg-ct`}
                  onClick={deleteXlsx}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={`${styles.popSuccessCreated}`}>
        <div className={styles.bgPopUp}></div>
        <div className={styles.popup2}>
          <div className={styles.content}>
            <div className={styles['icon-box']}>
              <img src="/images/check-circle.png" />
              <span className={styles['pop-text']}>
                ¡Tús Unidades han sido creadas con éxito!
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
                <span className={styles['pop-text-bold']}>¡Oops!</span> Algo no
                está bien. Por favor, revisa los datos ingresados e inténtalo de
                nuevo.
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Units;
