import React, { useRef, useState, useEffect, useContext } from 'react';
import Button from '../button';
import styles from './Add-project-pop.module.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Tooltip from '../toolTip';
import BildContext from '../context';

const AddProjectPop = ({
  showAddProject,
  setShowAddProject,
  setRefreshProjects,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { isDark } = useContext(BildContext);
  const mainImage = useRef(null);
  const firstImage = useRef(null);
  const secondImage = useRef(null);
  const dragZone = useRef(null);
  const xlsxInput = useRef(null);
  const featuredProject = useRef(null);
  const inputXlsx = useRef(null);
  const inputProjectName = useRef(null);
  const inputProjectCity = useRef(null);
  const inputProjectLocation = useRef(null);
  const inputProjectType = useRef(null);
  const inputProjectStage = useRef(null);
  const inputProjectDescription = useRef(null);

  const [xlsxFileName, setXlsxFileName] = useState(null);
  const [xlsxTemplate, setXlsxTemplate] = useState(null);
  const [cities, setCities] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JS van de 0 a 11
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const getXlsxTemplate = async () => {
    const response = await fetch('/api/multimediaRequest', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idobject: '1',
        type: 'GL',
        subtype: 'PPR',
      }),
    });
    const templateResponse = await response.json();
    setXlsxTemplate(templateResponse);
  };

  const getCities = async () => {
    const response = await fetch('/api/localisation', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        codecountry: 'COL',
        codedeparment: '',
        namecountry: '',
      }),
    });
    const citiesResponse = await response.json();
    setCities(citiesResponse);
  };

  useEffect(() => {
    getXlsxTemplate();
    getCities();
  }, []);

  const readURL = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (event.target.id === 'mainImgProject') {
          mainImage.current.style.backgroundImage = `url(${e.target.result})`;
          mainImage.current.parentNode.parentNode.classList.add(styles.active);
          return;
        }
        if (event.target.id === 'firstImgProject') {
          firstImage.current.style.backgroundImage = `url(${e.target.result})`;
          firstImage.current.parentNode.parentNode.classList.add(styles.active);
          return;
        }
        if (event.target.id === 'secondImgProject') {
          secondImage.current.style.backgroundImage = `url(${e.target.result})`;
          secondImage.current.parentNode.parentNode.classList.add(
            styles.active
          );
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

  const dragHandler = (e) => {
    e.preventDefault();
    dragZone.current.classList.add(styles.activeZone);
  };
  const dropHandler = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const { name } = file;
    const ext = name.split('.')[1];

    if (ext !== 'xlsx') {
      return;
    }

    const dT = new DataTransfer();
    dT.items.add(file);
    inputXlsx.current.files = dT.files;
    setXlsxData(file);
    setXlsxFileName(name);
    dragZone.current.classList.remove(styles.activeZone);
    featuredProject.current.classList.add(styles.showXlsx);
  };

  const deleteXlsx = () => {
    setXlsxData(null);
    featuredProject.current.classList.remove(styles.showXlsx);
    setTimeout(() => {
      setXlsxFileName('');
      inputXlsx.current.value = '';
    }, 300);
  };

  const createProjectForm = async (e) => {
    e.preventDefault();

    const newProjectInfo = {
      id: Date.now(),
      name: inputProjectName.current.value,
      imgProject:
        mainImage.current.style.backgroundImage !== ''
          ? mainImage.current.style.backgroundImage
              .match(/url\(([^)]+)\)/i)[1]
              .replace(/['"]+/g, '')
          : '',
    };

    const form = new FormData(document.getElementById('IDForm'));
    console.log(form);
  };

  const [datos, setDatos] = useState({
    projectName: '',
    projectType: 'E',
    location: '',
    neighborhoodId: '5',
    startDate: `${getCurrentDate()}`,
    pool: '',
    TurkishBath: '',
    sauna: '',
    bbq: '',
    gym: '',
    coworking: 'X',
    laundry: '',
    minPercentage: '',
  });

  const { id } = useSelector((state) => state.userState);

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const searchContact = (e) => {
    console.log(e.target.value);
  };

  const [sendFlag, setSendFlag] = useState(false);

  const dateFormatting = () => {
    setDatos((prevDatos) => ({
      ...prevDatos,
      endDate: formatDate(endDate),
    }));
    setSendFlag(true);
  };

  useEffect(() => {
    if (sendFlag) {
      sendFormInfo();
      setSendFlag(false);
    }
  }, [sendFlag]);

  const sendFormInfo = async () => {
    console.log(
      JSON.stringify({
        id,
        datos,
      })
    );

    try {
      const projectCreated = await fetch('/api/createProject', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          datos,
        }),
      });

      console.log('projectCreated: ', projectCreated);

      if (!projectCreated.ok) {
        const errorMessage = await projectCreated.text();
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

      const responseData = await projectCreated.json();

      console.log('Proyecto creado:', responseData);

      if (projectCreated.ok) {
        const formData = new FormData();
        formData.append('type', 'PRY');
        formData.append('subType', 'IMGPR');
        formData.append('idObject', responseData.projectId);
        formData.append('file', selectedFile);

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
            console.log(response);

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
        document
          .querySelector(`.${styles.popSuccessCreated}`)
          .classList.remove(styles.activePopUp);
        setShowAddProject(false);
        setRefreshProjects(true);
        cleanForm();
      }, 2000);
    } catch (error) {
      document
        .querySelector(`.${styles.popError}`)
        .classList.add(styles.activePopUp);

      setTimeout(() => {
        document
          .querySelector(`.${styles.popError}`)
          .classList.remove(styles.activePopUp);
      }, 5000);
      console.error('Error al crear el proyecto:', error.message);
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  function handleBloth(e) {
    handleFileChange(e);
    readURL(e);
  }

  const [endDate, setEndDate] = useState('');

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };
  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [xlsxData, setXlsxData] = useState(null);

  const handleXlsxData = (e) => {
    setXlsxData(e.target.files[0]);
  };

  const sendXlsx = async () => {
    if (xlsxData) {
      const formData = new FormData();
      formData.append('projects', xlsxData);

      console.log('formData: ', formData);

      try {
        const response = await fetch(
          'http://44.206.53.75/Sales-1.0/REST_Index.php/backend/UploadProjects',
          {
            method: 'POST',
            body: formData,
            mode: 'no-cors',
          }
        );

        if (response.ok) {
          console.log('Batch de proyectos subido correctamente');
        } else {
          const errorText = await response.text();
          const errorDta = await response;
          console.log('Error: ', errorText);
          console.log('Error Data: ', errorDta);
        }

        document
          .querySelector(`.${styles.popSuccessCreated}`)
          .classList.add(styles.activePopUp);
        setTimeout(() => {
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

  const changeXlsx = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      const allowedExtensions = ['xlsx', 'csv']; // Agrega 'csv' a las extensiones permitidas

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

  useEffect(() => {
    sendXlsx(xlsxData);
  }, [xlsxData]);

  const cleanForm = () => {
    setDatos({
      projectName: '',
      projectType: 'E',
      location: '',
      neighborhoodId: '5',
      startDate: '',
      endDate: '',
      pool: '',
      TurkishBath: '',
      sauna: '',
      bbq: '',
      gym: '',
      coworking: 'X',
      laundry: '',
      minPercentage: '',
    });
  };

  const handleMinQuoteChange = (e) => {
    const value = e.target.value;
    if (value === '' || (Number(value) <= 100 && Number(value) >= 0)) {
      setDatos({ ...datos, minPercentage: e.target.value });
    }
  };

  return (
    <>
      <div
        className={`${styles.typePopUp} ${
          showAddProject ? styles.activePopUp : ''
        } flex j-e a-s`}>
        <div
          className={`${styles.bgTypePopUp}`}
          onClick={() => {
            setShowAddProject(false);
            cleanForm();
          }}></div>
        <div className={`${styles.wrapperTypePopUp} bg-popup`}>
          <div className={`${styles.topContent} header-popup header-popup`}>
            <div className={`${styles.topContentInfo} `}>
              <h1 className={`${styles.topContentTitle}`}>
                Creacion de Proyecto
              </h1>
            </div>
            <div
              className={`${styles.closeIcon} bg-ct 
                ${
                  isDark
                    ? 'bg-[url(/images/close-white.svg)]'
                    : 'bg-[url(/images/light/back.png)]'
                }
              `}
              onClick={() => {
                setShowAddProject(false);
                cleanForm();
              }}
            />
          </div>

          <form className={styles.formType} onSubmit={sendFormInfo}>
            <div className={styles.inputsGroup}>
              <span className={styles.labelText}>Nombre del Proyecto:</span>
              <input
                type="text"
                name="projectName"
                value={datos.projectName}
                className={` ${styles.inputTypeForm}`}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputsGroup}>
              <span className={styles.labelText}>Ciudad:</span>
              <label htmlFor="subject"></label>
              <select
                type="text"
                name="neighborhoodId"
                value={datos.neighborhoodId}
                onChange={handleChange}
                className={`${styles.inputTypeForm} ${styles.labelSelect} `}
                required>
                <option disabled defaultValue={0} hidden selected></option>
                {cities &&
                  cities.length > 0 &&
                  cities
                    .filter((city) => city.neighborhoodId)
                    .map((city, i) => (
                      <option key={i} value={city.neighborhoodId}>
                        {city.nameState}
                      </option>
                    ))}
              </select>
            </div>

            <div className={styles.inputsGroup}>
              <span className={styles.labelText}>Ubicación:</span>
              <input
                type="text"
                name="location"
                value={datos.location}
                onChange={handleChange}
                className={` ${styles.inputTypeForm}`}
                required
              />
            </div>
            <div className={styles.inputsGroup}>
              <span className={styles.labelText}>Tipo de Inmueble:</span>
              <label htmlFor="subject"></label>
              <select
                type="text"
                name="projectType"
                value={datos.projectType}
                onChange={handleChange}
                className={`${styles.inputTypeForm} ${styles.labelSelect} `}
                required>
                <option disabled defaultValue={0} hidden selected></option>
                <option value="C">Casa</option>
                <option value="A">Apartamento</option>
                <option value="EC">Establecimiento comercial</option>
              </select>
            </div>

            <div className={styles.inputsGroup}>
              <span className={styles.labelText}>
                Porcentaje Minimo de Cuota: <Tooltip contentId={0} />
              </span>
              <input
                type="text"
                name="minPercentage"
                value={datos.minPercentage}
                className={` ${styles.inputTypeForm}`}
                onChange={handleMinQuoteChange}
                required
              />
            </div>

            <div className={styles.inputsGroup}>
              <span className={styles.labelText}>
                Fecha de Entrega: <Tooltip contentId={1} />
              </span>
              <input
                type="date"
                value={endDate}
                required
                onChange={handleEndDateChange}
                className={`${styles.inputTypeForm} ${styles.inputDate}`}
              />
            </div>

            {/* <div className={styles.inputsGroup}>
                  <span className={styles.labelText}>Etapas</span>
                  <input
                    type="text"
                    name="phone"
                    //required
                    ref={inputProjectStage}
                    />
                </div>*/}
            <div className={styles.inputsGroup}>
              <span className={styles.labelText}>
                Descripción del Proyecto:
              </span>
              <textarea
                name="message"
                placeholder=""
                className={styles.descriptionTypeForm}
                // required
                ref={inputProjectDescription}></textarea>
            </div>

            <div className={`${styles.inputsGroup} flex a-st`}>
              <span className={styles.labelText}>Imágen del Proyecto:</span>
              <div
                className={`${styles['main-image']} ${
                  isDark
                    ? 'bg-[url(/images/photo-icon.png)]'
                    : 'bg-[url(/images/photo-icon.png)]'
                } `}>
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
                    className={` ${styles.inputTypeForm}`}
                    accept="image/*"
                    name="mainImage"
                  />

                  <div
                    className={`${styles.imageSelected}`}
                    ref={mainImage}></div>
                </label>
              </div>
            </div>

            <div className={styles.upload}>
              <span className={styles.labelText}>
                Crear inventario en batch:
              </span>
              <div className={styles.uploadButtons}>
                <a
                  className={`${styles.buttonProyect} ${styles.buttonDownload}`}
                  href={
                    xlsxTemplate && xlsxTemplate.length > 0
                      ? xlsxTemplate[0].url
                      : '#'
                  }>
                  <img src="/images/download.svg" />
                  Descargar Excel Base
                </a>
                <label
                  className={`${styles.buttonProyect} ${styles.buttonUpload}`}>
                  Subir Excel de Inventario
                  <input
                    type="file"
                    hidden
                    ref={inputXlsx}
                    onChange={handleXlsxClick}
                    className={` ${styles.inputTypeForm}`}
                    accept=".xlsx, .xls, .csv"
                    name="excel"
                  />
                </label>
              </div>
            </div>

            <div className={styles.origen}>
              {
                // <p className={styles['text-origen']}>Asignar proyecto:</p>
              }
            </div>
          </form>
          <div className={`${styles.BottomContent} footer-popup footer-popup`}>
            <Button
              buttonType={'secondary'}
              iconImage={false}
              label={'Cancelar'}
              inheritClass={styles.buttonCreateType}
              clickFunction={() => {
                setShowAddProject(false);
                cleanForm();
              }}
            />
            <Button
              buttonType={'primary'}
              iconImage={false}
              label={'Guardar'}
              inheritClass={styles.buttonCreateType}
              clickFunction={dateFormatting}
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
                ¡Su proyecto ha sido creado con éxito!
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

export default AddProjectPop;
