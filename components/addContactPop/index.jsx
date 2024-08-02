import React, { useRef, useState, useEffect } from 'react';
import Button from '../button';
import styles from './Add-contact-pop.module.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useContext } from 'react';
import BildContext from '../context';
import Portal from '../../HOC/portal';
import SuccessPopUp from '../../components/successPopUp';
import ErrorPopUp from '../../components/errorPopUp';

const AddContactPop = ({
  showAddContact,
  setShowAddContact,
  setRefreshContacts,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { projectsList } = useSelector((state) => state.projectState);
  const [selectedPage, setSelectedItem] = useState('contact');
  const [errorMessage, setErrorMessage] = useState(null);
  const mainImage = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const { initialState, isDark } = useContext(BildContext);
  const { user } = initialState;
  const { userid: id } = user;
  const [successPopUp, setSuccessPopUp] = useState(0);

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
    contactProfile: {
      housingInversion: '',
      timeDecision: '',
      decision: '',
      adjustTimeDelivery: '',
      zoneInterest: '',
      budget: '0.0',
      amountBeds: '',
      civilStatus: '',
      amountChildren: '',
      rangeAgeChildren: '',
      profesion: '',
      pets: '',
      hobby: '',
      habeas: '',
    },
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
      contactProfile: {
        housingInversion: '',
        timeDecision: '',
        decision: '',
        adjustTimeDelivery: '',
        zoneInterest: '',
        budget: '0.0',
        amountBeds: '',
        civilStatus: '',
        amountChildren: '',
        rangeAgeChildren: '',
        profesion: '',
        pets: '',
        hobby: '',
        habeas: '',
      },
    });
  };
  const [imagen, setImagen] = useState(null);

  const sendFormInfo = async () => {
    console.log(
      JSON.stringify({
        id,
        datos,
      })
    );

    try {
      const contactCreated = await fetch('/api/createContact', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
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
        formData.append('idObject', responseData.clientId);
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

      setSuccessPopUp((preState) => 1);

      setTimeout(() => {
        setShowAddContact(false);
        setRefreshContacts(true);
        setTimeout(() => {
          setSuccessPopUp((preState) => 0);
        }, 1000);

      }, 2000);
    } catch (error) {
      setSuccessPopUp((preState) => 2);

      setTimeout(() => {
        setTimeout(() => {
          setSuccessPopUp((preState) => 0);
        }, 1000);
        
      }, 2000);
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
          showAddContact ? styles.activePopUp : ''
        } flex j-e a-s`}>
        <div
          className={`bg-backg-popup ${styles.bgTypePopUp}`}
          onClick={() => {
            setShowAddContact(false);
            cleanForm();
          }}></div>

        <div className={`${styles.wrapperTypePopUp} bg-popup`}>
          <div className={`${styles.topContent} header-popup`}>
            <div className={`${styles.topContentInfo}`}>
              <h1 className={`${styles.topContentTitle}`}>
                Creacion de Contacto
              </h1>
            </div>
            <div
              className={`${styles.closeIcon} bg-ct 
              ${
                isDark
                  ? 'bg-[url(/images/close-white.svg)]'
                  : 'bg-[url(/images/close.svg)]'
              }
            `}
              onClick={() => {
                setShowAddContact(false);
                cleanForm();
              }}
            />
          </div>

          <form className={styles.formType}>
            <div className={`${styles.sectionTitle} divisorPopup`}>
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
                className={`border-input ${styles.inputTypeForm}`}
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
                className={`border-input ${styles.inputTypeForm}`}
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
                className={`border-input ${styles.inputTypeForm}`}
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
                className={`border-input ${styles.inputTypeForm}`}
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
                className={`border-input ${styles.inputTypeForm}`}
                required
              />
            </div>

            <div className={`${styles.inputsGroup} flex a-st`}>
              <span className={styles.labelText}>Subir foto:</span>
              <div
                className={`${styles['main-image']} ${
                  isDark
                    ? 'bg-url(/images/photo-icon.png)'
                    : 'bg-[url(/images/light/photos.png)]'
                }`}>
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
                    className={`border-input ${styles.inputTypeForm}`}
                    accept="image/*"
                    name="mainImage"
                  />

                  <div
                    className={`${styles.imageSelected}`}
                    ref={mainImage}></div>
                </label>
              </div>
            </div>

            <div className={`${styles.sectionTitle} divisorPopup`}>
              <h2 className={styles.sectionTitleText}>Datos Adicionales</h2>
            </div>
            <div className={styles.inputsGroup}>
              <span className={styles.labelText}>Situacion Familiar:</span>
              <div className={styles.datos}>
                <button
                  type="button"
                  onClick={() => changeTypeClient('C')}
                  className={`campo-select ${styles.campo} ${
                    datos.contactProfile.civilStatus === 'C' && styles.active
                  }`}>
                  Casado
                </button>
                <button
                  type="button"
                  onClick={() => changeTypeClient('S')}
                  className={`campo-select ${styles.campo} ${
                    datos.contactProfile.civilStatus === 'S' && styles.active
                  }`}>
                  Soltero
                </button>
                <button
                  type="button"
                  onClick={() => changeTypeClient('UN')}
                  className={`campo-select ${styles.campo} ${
                    datos.contactProfile.civilStatus === 'UN' && styles.active
                  }`}>
                  Unión Libre
                </button>
                <button
                  type="button"
                  onClick={() => changeTypeClient('DI')}
                  className={`campo-select ${styles.campo} ${
                    datos.contactProfile.civilStatus === 'DI' && styles.active
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
                  className={`campo-select ${styles.campo} ${
                    datos.contactProfile.amountChildren === '0' && styles.active
                  }`}>
                  Sin Hijos
                </button>
                <button
                  type="button"
                  onClick={() => changeAmountChildren('1')}
                  className={`campo-select ${styles.campo} ${
                    datos.contactProfile.amountChildren === '1' && styles.active
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
                  className={`campo-select ${styles.campo} ${
                    datos.contactProfile.housingInversion === 'I' &&
                    styles.active
                  }`}>
                  Inversionista
                </button>
                <button
                  type="button"
                  onClick={() => changebusinessName('V')}
                  className={`campo-select ${styles.campo} ${
                    datos.contactProfile.housingInversion === 'V' &&
                    styles.active
                  }`}>
                  Familiar
                </button>
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
                setShowAddContact(false);
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
      <Portal>
        {successPopUp === 1 && (
          <SuccessPopUp
            message={'¡Tú contacto ha sido creado con éxito!'}></SuccessPopUp>
        )}
        {successPopUp === 2 && (
          <ErrorPopUp errorMessage={errorMessage}></ErrorPopUp>
        )}
      </Portal>      
    </>
  );
};

export default AddContactPop;
