import React, { useRef, useState, useEffect } from 'react';
import Button from '../button';
import styles from './Edit-contact-pop.module.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useContext } from 'react';
import BildContext from '../context';

const EditConsultantsPop = ({
  showEditContact,
  setShowEditContact,
  setRefreshContacts,
  consultantInfo,
  projectList,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedPage, setSelectedItem] = useState('contact');
  const [errorMessage, setErrorMessage] = useState(null);
  const mainImage = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [infoContact, setInfoContact] = useState(null);
  const { initialState } = useContext(BildContext);
  const { user } = initialState;
  const { userid: id } = user;

  const [datos, setDatos] = useState({
    firstNames: '',
    lastNames: '',
    gender: 'M',
    documentNumber: '',
    idType: 'CC',
    birthDay: '1985-02-01',
    email: '',
    username: '',
    password: '',
    projects: [],
  });

  const toggleProjectId = (id) => {
    setDatos((prevDatos) => {
      const projectExists = prevDatos.projects.some(
        (project) => project.idProject === id
      );
      const projects = projectExists
        ? prevDatos.projects.filter((project) => project.idProject !== id)
        : [...prevDatos.projects, { idProject: id }];
      return { ...prevDatos, projects };
    });
  };

  useEffect(() => {
    if (consultantInfo) {
      setDatos((prevDatos) => ({
        ...prevDatos,
        firstNames: consultantInfo.firstNames,
        lastNames: consultantInfo.lastNames,
        documentNumber: consultantInfo.documentNumber,
        email: consultantInfo.email,
        username: consultantInfo.username,
        projects: [...consultantInfo.projects],
      }));
    }
  }, [consultantInfo]);

  const [imagen, setImagen] = useState(null);

  const sendFormInfo = async () => {
    console.log(
      JSON.stringify({
        id,
        datos,
      })
    );

    try {
      const contactCreated = await fetch('/api/editConsultant', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          salesConsultantId: consultantInfo.salesConsultantId,
          datos,
        }),
      });

      console.log('Tipo creado: ', contactCreated);

      if (contactCreated.ok) {
        const formData = new FormData();
        formData.append('type', 'ASR');
        formData.append('subType', 'PHOTO');
        formData.append('idObject', consultantInfo.salesConsultantId);
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

          if (!response.ok) {
            console.error('Error de solicitud. Estado:', response.status);
          } else {
            console.log('Respuesta exitosa:', response);
          }
        } catch (error) {
          console.error('Error al realizar la solicitud:', error);
        }
      }

      if (!contactCreated.ok) {
        const errorMessage = await contactCreated.text();
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

      const responseData = await contactCreated.json();

      console.log('Proyecto creado:', responseData);

      document
        .querySelector(`.${styles.popSuccessCreated}`)
        .classList.add(styles.activePopUp);

      setTimeout(() => {
        setShowEditContact(false);
        setRefreshContacts(true);
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
      console.error('Error al crear el proyecto:', error);
    }
  };

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

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  function handleBloth(e) {
    handleFileChange(e);
    readURL(e);
  }

  const sendFormImage = async (e) => {
    e.preventDefault();

    console.log('imagen: ', imagen);

    const formData = new FormData();
    formData.append('type', 'CLI');
    formData.append('subType', 'PHOTO');
    formData.append('idObject', '95162');
    formData.append('file', imagen);

    console.log('formData:', formData);

    try {
      const contactCreated = await fetch('/api/multimediaUpload', {
        method: 'post',
        body: formData,
      });

      console.log('Tipo creado: ', contactCreated);

      if (!contactCreated.ok) {
        throw new Error('Failed to create Contact');
      }

      const responseData = await contactCreated.json();

      console.log('Proyecto creado:', responseData);

      document
        .querySelector(`.${styles.popSuccessCreated}`)
        .classList.add(styles.activePopUp);

      setTimeout(() => {
        document
          .querySelector(`.${styles.popSuccessCreated}`)
          .classList.remove(styles.activePopUp);
        router.push('/contacts');
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
      console.error('Error al crear el proyecto:', error.messge);
    }
  };

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  console.log('Datos: ', datos);

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setImagen(imageFile);
  };

  const changebusinessName = (name) => {
    setDatos((prevDatos) => ({
      ...prevDatos,
      contactProfile: {
        ...prevDatos.contactProfile,
        housingInversion: name,
      },
    }));
  };

  const changeTypeClient = (type) => {
    setDatos((prevDatos) => ({
      ...prevDatos,
      contactProfile: {
        ...prevDatos.contactProfile,
        civilStatus: type,
      },
    }));
  };

  const changeAmountChildren = (amount) => {
    setDatos((prevDatos) => ({
      ...prevDatos,
      contactProfile: {
        ...prevDatos.contactProfile,
        amountChildren: amount,
      },
    }));
  };

  return (
    <>
      <div
        className={`${styles.typePopUp} ${
          showEditContact ? styles.activePopUp : ''
        } flex j-e a-s`}>
        <div
          className={`${styles.bgTypePopUp}`}
          onClick={() => {
            setShowEditContact(false);
          }}></div>

      <div className={`${styles.wrapperTypePopUp} bg-popup`}>

          <div className={`${styles.topContent}`}>
            <div className={`${styles.topContentInfo}`}>
              <h1 className={`${styles.topContentTitle}`}>
                Edicion de perfil de Asesor
              </h1>
            </div>
            <div
              className={`${styles.closeIcon} bg-ct`}
              onClick={() => {
                setShowEditContact(false);
              }}
            />
          </div>

          <form className={styles.formType}>
            <div className={styles.sectionTitle}>
              <h2 className={styles.sectionTitleText}>Datos Personales</h2>
            </div>

            <div className={styles.inputsGroup}>
              <span className={styles.labelText}>Nombre:</span>
              <input
                type="text"
                name="firstNames"
                placeholder="Nombre"
                value={datos.firstNames}
                onChange={handleChange}
                className={styles.inputTypeForm}
                required
              />
            </div>
            <div className={styles.inputsGroup}>
              <span className={styles.labelText}>Apellidos:</span>
              <input
                type="text"
                name="lastNames"
                placeholder="Apellidos"
                value={datos.lastNames}
                onChange={handleChange}
                className={styles.inputTypeForm}
                required
              />
            </div>
            <div className={styles.inputsGroup}>
              <span className={styles.labelText}>Número de Documento:</span>
              <input
                type="text"
                name="documentNumber"
                placeholder="Número de Documento"
                value={datos.documentNumber}
                onChange={handleChange}
                className={styles.inputTypeForm}
                required
              />
            </div>

            <div className={styles.inputsGroup}>
              <span className={styles.labelText}>Correo:</span>
              <input
                type="text"
                name="email"
                placeholder="Número de Documento"
                value={datos.email}
                onChange={handleChange}
                className={styles.inputTypeForm}
                required
              />
            </div>

            <div className={styles.inputsGroup}>
              <span className={styles.labelText}>Nombre de Usuario:</span>
              <input
                type="text"
                name="username"
                placeholder="Número de Documento"
                value={datos.username}
                onChange={handleChange}
                className={styles.inputTypeForm}
                required
              />
            </div>

            <div className={`${styles.inputsGroup} flex a-st`}>
              <span className={styles.labelText}>Subir foto:</span>
              <div className={styles['main-image']}>
                <div
                  className={`bg-ct ${styles.deleteIcon}`}
                  onClick={deleteImage}></div>
                <label
                  htmlFor="mainImgProjectEdit"
                  className={styles.labelInputImage}>
                  <input
                    id="mainImgProjectEdit"
                    type="file"
                    hidden
                    onChange={handleBloth}
                    className={styles.inputTypeForm}
                    accept="image/*"
                    name="mainImage"
                  />

                  <div
                    className={`${styles.imageSelected}`}
                    ref={mainImage}></div>
                </label>
              </div>
            </div>

            <div className={styles.sectionTitle}>
              <h2 className={styles.sectionTitleText}>Proyectos Asignados</h2>
            </div>
            <div className={styles.inputsGroup}>
              <span className={styles.labelText}>
                Seleccione los Proyectos:
              </span>
              <div className={styles.datos}>
                {projectList.map((project, i) => (
                  <>
                    <button
                      type="button"
                      onClick={() => toggleProjectId(project.projectId)}
                      className={`${styles.campo} ${
                        datos.projects.some(
                          (proj) => proj.idProject === project.projectId
                        ) && styles.active
                      }`}>
                      {`${project.projectName}`}
                    </button>
                  </>
                ))}
              </div>
            </div>
          </form>
          <div className={`${styles.BottomContent} footer-popup`}>
            <Button
              buttonType={'secondary'}
              iconImage={false}
              label={'Cancelar'}
              inheritClass={styles.buttonCreateType}
              clickFunction={() => {
                setShowEditContact(false);
                // getContact();
              }}
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
                ¡Tú contacto ha sido creado con éxito!
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

export default EditConsultantsPop;
