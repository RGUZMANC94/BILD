import React from 'react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../styles/Edit-Contact.module.css';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const EditContact = () => {
  const router = useRouter();
  const { id } = useSelector((state) => state.userState);
  const { projectsList } = useSelector((state) => state.projectState);
  const { contactListSelected } = useSelector(
    (state) => state.contactOpportunityState
  );
  const [selectedPage, setSelectedItem] = useState('contact');
  const [typeClient, setTypeClient] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [infoContact, setInfoContact] = useState(null);

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

  const [imagen, setImagen] = useState(null);

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

  const sendFormInfo = async (e) => {
    e.preventDefault();

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

      if (contactCreated.ok && imagen) {
        const formData = new FormData();
        formData.append('type', 'CLI');
        formData.append('subType', 'PHOTO');
        formData.append('idObject', contactListSelected.idCli);
        formData.append('file', imagen);

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

  useEffect(() => {
    if (profileData.clientId) {
      sendProfileData();
    }
  }, [profileData.clientId]);

  const sendProfileData = async () => {
    try {
      const response = await fetch('/api/editProfile', {
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
      <div className={styles['wrap-datos']}>
        <div
          className={`container flex j-sb a-s wrap relative ${styles.contactContainer}`}>
          <Link
            href={`/buyer/${contactListSelected.idCli}`}
            className={`${styles.close} bg-ct`}></Link>
          <div className={styles['top-content']}>
            <div className={styles['top-content-buttonsBar']}>
              <div className="container flex j-s a-c">
                <div className={styles['top-buttons-container']}>
                  <div className={styles['top-content-container']}>
                    <button
                      className={styles['top-content-buttons']}
                      onClick={() => setSelectedItem('contact')}>
                      Datos de Contacto
                    </button>
                    <div
                      className={`${styles['top-content-bar']} ${
                        selectedPage === 'contact' && styles.active
                      }`}></div>
                  </div>
                  <div className={styles['top-content-container']}>
                    <button
                      className={styles['top-content-buttons']}
                      onClick={() => setSelectedItem('additional')}>
                      Información Adicional
                    </button>
                    <div
                      className={`${styles['top-content-bar']} ${
                        selectedPage === 'additional' && styles.active
                      }`}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${styles['datos-left']} ${
              styles[
                `${
                  selectedPage === 'contact' ? 'page-active' : 'page-disabled'
                }`
              ]
            }`}>
            <div className={styles['top-name']}>
              <span>Edicion - Datos de Contacto</span>{' '}
            </div>
            <form onSubmit={sendFormInfo} className={styles.msform}>
              <fieldset>
                <label className={styles.label}>
                  <span>Nombre:</span>
                  <input
                    type="text"
                    name="firstNames"
                    placeholder="Nombre"
                    value={datos.firstNames}
                    onChange={handleChange}
                  />
                </label>
                <label className={styles.label}>
                  <span>Apellidos:</span>
                  <input
                    type="text"
                    name="lastNames"
                    placeholder="Apellidos"
                    value={datos.lastNames}
                    onChange={handleChange}
                  />
                </label>

                <label className={styles.label}>
                  <span>Número de Documento:</span>
                  <input
                    type="text"
                    name="documentNumber"
                    placeholder="Número de Documento"
                    value={datos.documentNumber}
                    onChange={handleChange}
                  />
                </label>

                <label className={styles.label}>
                  <span>Email:</span>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={datos.email}
                    onChange={handleChange}
                  />
                </label>

                <label className={styles.label}>
                  <span>Celular:</span>
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Celular"
                    value={datos.phoneNumber}
                    onChange={handleChange}
                  />
                </label>

                <div className={styles.foto}>
                  <label
                    htmlFor="imageInput"
                    className={styles.imageInputLabel}>
                    <div className={styles.outerImgWrapper}>
                      {imagen ? (
                        <img
                          className={styles.photoImage}
                          src={URL.createObjectURL(imagen)}
                          alt="Preview"
                        />
                      ) : (
                        <img
                          className={styles.imagePlaceHolder}
                          src="images/cam.svg"
                          alt="Camera"
                        />
                      )}
                    </div>
                  </label>
                  <input
                    type="file"
                    id="imageInput"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e)}
                    className={styles.inputFile}
                  />
                  Tomar Foto
                </div>

                <div className={styles.imageInputContainer}></div>

                <Link
                  href={`/detail-estate/${projectsList[0].projectId}?contactId=${77}`}
                  className={styles['crear-contacto']}>
                  <i className="fa-solid fa-plus"></i>Crear oportunidad
                </Link>
                <button className={styles['contacto-existente']}>
                  Guardar
                </button>
              </fieldset>
            </form>
          </div>
          <div
            className={`${styles['datos-right']} 
            ${
              styles[
                `${
                  selectedPage === 'additional'
                    ? 'page-active'
                    : 'page-disabled'
                }`
              ]
            }`}>
            <div className={`relative ${styles['top-name']}`}>
              <span>Información Adicional</span>{' '}
            </div>
            <div className={styles['informacion-datos']}>
              <span className={styles['sub-title']}>Situacion Familiar:</span>
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
                {/*
                  
                <button
                  type="button"
                  onClick={() => changeTypeClient('conHijos')}
                  className={`${styles.campo} ${
                    profileData.civilStatus === 'conHijos' && styles.active
                  }`}>
                  Con Hijos
                </button>
                <button
                  type="button"
                  onClick={() => changeTypeClient('sinHijos')}
                  className={`${styles.campo} ${
                    profileData.civilStatus === 'sinHijos' && styles.active
                  }`}>
                  Sin Hijos
                </button>
                  */}
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

            <div className={styles['informacion-perfil']}>
              <div className={styles['informacion-datos']}>
                <span className={styles['sub-title']}>Numero de Hijos:</span>
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
                <div className={styles['buttons-right']}>
                  <Link
                    href={`/detail-estate/${projectsList[0].projectId}?contactId=${77}`}
                    className={styles['crear-contacto']}>
                    <i className="fa-solid fa-plus"></i>Crear oportunidad
                  </Link>
                  <button className={styles['contacto-existente']}>
                    Guardar
                  </button>
                </div>
              </div>
            </div>

            <div className={styles['informacion-perfil']}>
              <div className={styles['informacion-datos']}>
                <span className={styles['sub-title']}>Tipo de Comprador:</span>
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
                {/* <button className={styles["crear-contacto"]}>
                <i className="fa-solid fa-plus"></i>Crear oportunidad
                </button>
              <button className={styles["contacto-existente"]}>Guardar</button> */}
                <div className={styles['buttons-right']}>
                  <Link
                    href={`/detail-estate/${projectsList[0].projectId}?contactId=${77}`}
                    className={styles['crear-contacto']}>
                    <i className="fa-solid fa-plus"></i>Crear oportunidad
                  </Link>
                  <button className={styles['contacto-existente']}>
                    Guardar
                  </button>
                </div>
              </div>
            </div>
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

export default EditContact;
