import React, { useRef, useState, useEffect } from 'react';
import Button from '../button';
import styles from './Edit-contact-pop.module.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';

const EditContactPop = ({
  showEditContact,
  setShowEditContact,
  setRefreshContacts,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useSelector((state) => state.userState);
  const { projectsList } = useSelector((state) => state.projectState);
  const [selectedPage, setSelectedItem] = useState('contact');
  const [errorMessage, setErrorMessage] = useState(null);
  const mainImage = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [infoContact, setInfoContact] = useState(null);
  const { contactListSelected } = useSelector(
    (state) => state.contactOpportunityState
  );

  const [datos, setDatos] = useState({
    firstNames: '',
    lastNames: '',
    email: '',
    documentNumber: '',
    phoneNumber: '',
    gender: 'M',
    idType: 'CE',
    birthDay: '1990-01-01',
    documentExpeditionDate: '1990-01-02',
    countryExpedition: 'COL',
    stateExpedition: '5',
    cityExpedition: '1',
    nacionality: 'Colombiana',
    typeClient: 'J',
    businessName: 'Cliente',
    origin: '845002',
    pointOfAttention: '3',
    StatusClient: '1',
    idAdviser: 'FDBILD',
    dateRegister: '2023-12-03',
    idProject: '85006',
    isActive: 'A',
    country: 'COL',
    department: '5',
    city: '1',
    thirdDependency: 'N',
  });

  const [profileData, setProfileData] = useState({
    clientId: '',
    civilStatus: '',
    amountChildren: '',
    housingInversion: '',
    timeDecision: '',
    decision: '',
    adjustTimeDelivery: '',
    zoneInterest: '',
    budget: '0.0',
    amountBeds: '',
    rangeAgeChildren: '',
    profesion: '',
    pets: '',
    hobby: '',
    habeas: '',
  });
  const cleanForm = () => {
    setDatos({
      firstNames: '',
      lastNames: '',
      email: '',
      documentNumber: '',
      phoneNumber: '',
      gender: 'M',
      idType: 'CE',
      birthDay: '1990-01-01',
      documentExpeditionDate: '1990-01-02',
      countryExpedition: 'COL',
      stateExpedition: '5',
      cityExpedition: '1',
      nacionality: 'Colombiana',
      typeClient: 'J',
      businessName: 'Cliente',
      origin: '845002',
      pointOfAttention: '3',
      StatusClient: '1',
      idAdviser: 'FDBILD',
      dateRegister: '2023-12-03',
      idProject: '85006',
      isActive: 'A',
      country: 'COL',
      department: '5',
      city: '1',
      thirdDependency: 'N',
    });
    setProfileData({
      clientId: '',
      civilStatus: '',
      amountChildren: '',
      housingInversion: '',
      timeDecision: '',
      decision: '',
      adjustTimeDelivery: '',
      zoneInterest: '',
      budget: '0.0',
      amountBeds: '',
      rangeAgeChildren: '',
      profesion: '',
      pets: '',
      hobby: '',
      habeas: '',
    });
  };

  const getContact = async () => {
    const response = await fetch('/api/getContactInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        idclient: contactListSelected.idCli,
      }),
    });
    const responseContact = await response.json();

    setInfoContact(responseContact[0]);
    console.log('respuesta contacto: ', responseContact[0]);
  };

  useEffect(() => {
    getContact();
  }, []);

  const [imagen, setImagen] = useState(null);
  useEffect(() => {
    if (infoContact) {
      setDatos({ ...datos, ...infoContact });
      if (infoContact.contactProfile) {
        if (infoContact.contactProfile.length > 0) {
          setProfileData({ ...profileData, ...infoContact.contactProfile[0] });
        }
      }
      console.log('Datos: ', datos);
    }
  }, [infoContact]);

  const sendFormInfo = async () => {
    console.log(
      JSON.stringify({
        id,
        datos,
      })
    );

    try {
      const contactCreated = await fetch('/api/editContact', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          idclient: contactListSelected.idCli,
          datos,
        }),
      });

      console.log('Tipo creado: ', contactCreated);

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

      if (contactCreated.ok) {
        const formData = new FormData();
        formData.append('type', 'CLI');
        formData.append('subType', 'PHOTO');
        formData.append('idObject', contactListSelected.idCli);
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

      if (contactCreated.ok) {
        setProfileData((prevProfileData) => ({
          ...prevProfileData,
          clientId: responseData.clientId,
        }));
      }

      document
        .querySelector(`.${styles.popSuccessCreated}`)
        .classList.add(styles.activePopUp);

      setTimeout(() => {
        setShowEditContact(false);
        setRefreshContacts(true);
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
      console.error('Error al crear el proyecto:', error);
    }
  };

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

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  function handleBloth(e) {
    handleFileChange(e);
    readURL(e);
  }

  useEffect(() => {
    if (profileData.clientId) {
      sendProfileData();
    }
  }, [profileData.clientId]);

  const sendProfileData = async () => {
    try {
      const response = await fetch('/api/createProfile', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          profileData,
        }),
      });

      if (!response.ok) {
        console.error('Error de solicitud. Estado:', response.status);
      } else {
        console.log('Respuesta exitosa:', response);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

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
    setProfileData({ ...profileData, housingInversion: name });
  };

  const changeTypeClient = (type) => {
    setProfileData({ ...profileData, civilStatus: type });
  };

  const changeAmountChildren = (amount) => {
    setProfileData({ ...profileData, amountChildren: amount });
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
            cleanForm();
          }}></div>

        <div className={`${styles.wrapperTypePopUp}`}>
          <div className={`${styles.topContent}`}>
            <div className={`${styles.topContentInfo}`}>
              <h1 className={`${styles.topContentTitle}`}>
                Creacion de Contacto
              </h1>
            </div>
            <div
              className={`${styles.closeIcon} bg-ct`}
              onClick={() => {
                setShowEditContact(false);
                cleanForm();
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
              <span className={styles.labelText}>Email:</span>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={datos.email}
                onChange={handleChange}
                className={styles.inputTypeForm}
                required
              />
            </div>
            <div className={styles.inputsGroup}>
              <span className={styles.labelText}>Celular:</span>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Celular"
                value={datos.phoneNumber}
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
                  htmlFor="mainImgProject"
                  className={styles.labelInputImage}>
                  <input
                    id="mainImgProject"
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
              <h2 className={styles.sectionTitleText}>Datos Adicionales</h2>
            </div>
            <div className={styles.inputsGroup}>
              <span className={styles.labelText}>Situacion Familiar:</span>
              <div className={styles.datos}>
                <button
                  type="button"
                  onClick={() => changeTypeClient('C')}
                  className={`${styles.campo} ${
                    profileData.civilStatus === 'C' && styles.active
                  }`}>
                  Casado
                </button>
                <button
                  type="button"
                  onClick={() => changeTypeClient('S')}
                  className={`${styles.campo} ${
                    profileData.civilStatus === 'S' && styles.active
                  }`}>
                  Soltero
                </button>
                <button
                  type="button"
                  onClick={() => changeTypeClient('UN')}
                  className={`${styles.campo} ${
                    profileData.civilStatus === 'UN' && styles.active
                  }`}>
                  Unión Libre
                </button>
                <button
                  type="button"
                  onClick={() => changeTypeClient('DI')}
                  className={`${styles.campo} ${
                    profileData.civilStatus === 'DI' && styles.active
                  }`}>
                  Divorciado
                </button>
              </div>
            </div>
            <div className={styles.inputsGroup}>
              <span className={styles.labelText}>Numero de Hijos:</span>
              <div className={styles.datos}>
                <button
                  type="button"
                  onClick={() => changeAmountChildren('0')}
                  className={`${styles.campo} ${
                    profileData.amountChildren === '0' && styles.active
                  }`}>
                  Sin Hijos
                </button>
                <button
                  type="button"
                  onClick={() => changeAmountChildren('1')}
                  className={`${styles.campo} ${
                    profileData.amountChildren === '1' && styles.active
                  }`}>
                  Con Hijos
                </button>
              </div>
            </div>
            <div className={styles.inputsGroup}>
              <span className={styles.labelText}>Tipo de Comprador:</span>
              <div className={styles.datos}>
                <button
                  type="button"
                  onClick={() => changebusinessName('I')}
                  className={`${styles.campo} ${
                    profileData.housingInversion === 'I' && styles.active
                  }`}>
                  Inversionista
                </button>
                <button
                  type="button"
                  onClick={() => changebusinessName('V')}
                  className={`${styles.campo} ${
                    profileData.housingInversion === 'V' && styles.active
                  }`}>
                  Familiar
                </button>
              </div>
            </div>
          </form>
          <div className={`${styles.BottomContent}`}>
            <Button
              buttonType={'secondary'}
              iconImage={false}
              label={'Cancelar'}
              inheritClass={styles.buttonCreateType}
              clickFunction={() => {
                setShowEditContact(false);
                cleanForm();
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

export default EditContactPop;
