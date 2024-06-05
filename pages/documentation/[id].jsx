import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Button from '../../components/button';
import styles from './styles.module.css';
// import { useSelector } from 'react-redux';
import { parseCookies } from '../../utils/parseCookies';
export const getServerSideProps = async ({
  req: {
    headers: { cookie },
  },
  query: { id },
}) => {
  const { user_tk } = parseCookies(cookie);
  const { user } = JSON.parse(user_tk);
  try {
    const response = await fetch(
      `http://44.206.53.75/Sales-1.0/REST_Index.php/backend/GetContact?idclient=${id}&username=${
        user.userid
      }`
    );
    if (!response.ok) {
      throw new Error('Bad response from server');
    }
    const contact = await response.json();
    contact[0].idCli = id;
    return {
      props: {
        contact,
        user,
      },
    };
  } catch (error) {
    return {
      props: {
        error,
      },
    };
  }
};
const Documentation = ({ contact, user }) => {
  const { userid: id } = user;
  const contactListSelected = contact[0];
  console.log(contact);
  console.log(contact[0]);
  console.log(contactListSelected);
  // const { contactListSelected } = useSelector(
  //   (state) => state.contactOpportunityState
  // );

  const [docSelected, setDocSelected] = useState('');
  const featuredProject = useRef(null);
  const [xlsxFileName, setXlsxFileName] = useState(null);
  const inputXlsx = useRef(null);
  const [contactLocal, setContactLocal] = useState(null);
  const [certLaboral, setCertLaboral] = useState([]);
  const [certBancario, setCertBancario] = useState([]);
  const [certIngresos, setCertIngresos] = useState([]);
  const [dni, setDni] = useState([]);
  const [contactRefresh, setContactRefresh] = useState(false);
  const [pdfURL, setPdfURL] = useState(null);
  const dragZone = useRef(null);
  const xlsxInput = useRef(null);

  const getRecentsContacts = async () => {
    const response = await fetch('/api/recentsContacts', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, idclient: contactListSelected.idCli }),
    });

    const recentsContactsres = await response.json();
    console.log('Contacto traido:', recentsContactsres);
    setContactLocal(recentsContactsres[0]);
  };

  useEffect(() => {
    if (contactRefresh) {
      setContactRefresh(false);
    }
    getRecentsContacts();
  }, [contactRefresh]);

  useEffect(() => {
    if (contactLocal && contactLocal.files && contactLocal.files.length > 0) {
      setCertLaboral(contactLocal.files.filter((doc) => doc.type === 'LDOC'));
      setCertBancario(contactLocal.files.filter((doc) => doc.type === 'PAYS'));
      setCertIngresos(contactLocal.files.filter((doc) => doc.type === 'PAYR'));
      setDni(contactLocal.files.filter((doc) => doc.type === 'ID'));
    }
  }, [contactLocal]);

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

  const dragHandler = (e) => {
    e.preventDefault();
    dragZone.current.classList.add(styles.activeZone);
  };

  const changeDoc = (docType) => {
    if (docSelected === docType) {
      setDocSelected('');
    } else {
      setDocSelected(docType);
    }
  };

  const changeXlsx = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      const allowedExtensions = ['pdf'];

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
    setXlsxData(null);
    featuredProject.current.classList.remove(styles.showXlsx);
    setTimeout(() => {
      setXlsxFileName('');
      inputXlsx.current.value = '';
    }, 300);
  };

  const [xlsxData, setXlsxData] = useState(null);

  const handleXlsxData = (e) => {
    setXlsxData(e.target.files[0]);
  };

  function handleXlsxClick(e) {
    changeXlsx(e);
    handleXlsxData(e);
  }

  const sendXlsx = async () => {
    if (xlsxData) {
      const formData = new FormData();
      formData.append('type', 'CLI');
      formData.append('subType', docSelected);
      formData.append('idObject', contactListSelected.idCli);
      formData.append('file', xlsxData);

      console.log('formData: ', formData);

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
          console.log('Archivo subido correctamente');
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
          document
            .querySelector(`.${styles.popSuccessCreated}`)
            .classList.remove(styles.activePopUp);
          deleteXlsx();
          setContactRefresh(true);
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

  const deleteDoc = async (idDoc, subType) => {
    try {
      const fileDeleted = await fetch('/api/deleteMultimedia', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          idfile: idDoc,
          type: 'CLI',
          subtype: subType,
          idobject: contactListSelected.idCli,
        }),
      });

      console.log('File deleted: ', fileDeleted);

      if (!fileDeleted.ok) {
        throw new Error('Failed to delete Quote');
      }

      const responseData = await fileDeleted.json();

      console.log('Quote deleted:', responseData);

      document
        .querySelector(`.${styles.popSuccessCreated}`)
        .classList.add(styles.activePopUp);

      setTimeout(() => {
        document
          .querySelector(`.${styles.popSuccessCreated}`)
          .classList.remove(styles.activePopUp);
        setContactRefresh(true);
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
      console.error('Error al Borrar cuota:', error);
    }
  };

  return (
    <>
      <div className={styles['top-content']}>
        <div className="container flex j-s a-c">
          <Link
            href={`/contacts/${contactListSelected.idCli}`}
            className={`bg-ct ${styles.icon}`}></Link>
          <div
            className={
              styles.title
            }>{`Documentación de ${contactListSelected.firstNames} ${contactListSelected.lastNames}`}</div>
        </div>
      </div>
      <div className={styles['doc-perfil']}>
        <div className={styles['editar-perfil']}>
          <div className={styles['perfil-img']}>
            <img
              src={
                contactListSelected.image[0] !== '' &&
                contactListSelected.image[0]
                  ? `${contactListSelected.image[0].url}`
                  : '/images/tipo-1.png'
              }
            />
          </div>
          <span
            className={
              styles['name-perfil']
            }>{`${contactListSelected.firstNames} ${contactListSelected.lastNames}`}</span>
          <div className={styles['id-perfil']}>
            <img src="/images/id.png" />
            {`${contactListSelected.firstNames}`} Bogotá D.C
          </div>
          <div className={styles['perfil-icons']}>
            <div className={styles['perfil-icon']}>
              <a href={`tel:+54${contactListSelected.phoneNumber}`}>
                <img src="/images/phone-profile.png" />
              </a>
            </div>
            <div className={styles['perfil-icon']}>
              <a href={`mailto:${contactListSelected.email}`}>
                <img src="/images/mail-profile.png" />
              </a>
            </div>
            <div className={styles['perfil-icon']}>
              <a
                target="_blank"
                href={`https://wa.me/${contactListSelected.phoneNumber}`}>
                <img src="/images/whats-profile.png" />
              </a>
            </div>
          </div>
        </div>

        <div className={styles['documentacion-requerida']}>
          <div className={styles['doc-top']}>
            <span
              className={
                styles['doc-title-movil']
              }>{`${contactListSelected.name} ${contactListSelected.lastname}`}</span>
            <span className={styles['doc-title']}>DOCUMENTACIÓN REQUERIDA</span>
          </div>
          <div className={styles['doc-wrap']}>
            <div className={styles.archivo}>
              <div
                ref={dragZone}
                className={styles['blue-border']}
                onDrop={dropHandler}
                onDragOver={dragHandler}
                onDragEnter={dragHandler}>
                <img src="/images/upload-icon.png" />
                <span>
                  Haga click para subir o arrastra acá el archivo a compartir
                </span>
                <input type="file" hidden ref={xlsxInput} />
              </div>

              <div className={`${styles.uploadButtons} flex j-e a-c`}>
                <label className={styles.subir}>
                  SUBIR ARCHIVO PDF
                  <input
                    type="file"
                    hidden
                    ref={inputXlsx}
                    onChange={handleXlsxClick}
                    accept=".pdf"
                    name="excel"
                  />
                </label>

                <label
                  className={
                    xlsxData && docSelected !== ''
                      ? styles.subir
                      : styles.disabledButton
                  }>
                  SUBIR PROYECTOS
                  <input type="button" hidden onClick={sendXlsx} name="excel" />
                </label>
              </div>
              <div
                className={`${styles.projectDocument}`}
                ref={featuredProject}>
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
            <div className={styles['doc-list']}>
              <div className={styles.certificado}>
                <div className={styles['certificado-top']}>
                  <div
                    className={`${styles['check-mark']} ${
                      styles[`${docSelected === 'ID' ? 'active' : ''}`]
                    }`}></div>
                  <span
                    onClick={() => changeDoc('ID')}
                    className={styles['title-cert']}>
                    Fotocopia Cédula
                  </span>
                </div>

                {dni.length > 0 &&
                  dni.map((doc, i) => (
                    <div className={styles['cert-pdf']} key={i}>
                      <span className={styles['title-pdf']}>
                        {`${doc.url.substring(doc.url.lastIndexOf('/') + 1)}`}
                      </span>
                      <div className={styles['icons-pdf']}>
                        <div
                          onClick={() => setPdfURL(doc.url)}
                          className={styles['clip-icon']}
                        />
                        <div
                          onClick={() => deleteDoc(doc.id, 'ID')}
                          className={styles['delete-icon']}
                        />
                      </div>
                    </div>
                  ))}
              </div>

              <div className={styles.certificado}>
                <div className={styles['certificado-top']}>
                  <div
                    className={`${styles['check-mark']} ${
                      styles[`${docSelected === 'LDOC' ? 'active' : ''}`]
                    }`}></div>
                  <span
                    onClick={() => changeDoc('LDOC')}
                    className={styles['title-cert']}>
                    Certificado Laboral
                  </span>
                </div>

                {certLaboral.length > 0 &&
                  certLaboral.map((doc, i) => (
                    <div className={styles['cert-pdf']} key={i}>
                      <span className={styles['title-pdf']}>
                        {`${doc.url.substring(doc.url.lastIndexOf('/') + 1)}`}
                      </span>
                      <div className={styles['icons-pdf']}>
                        <div
                          onClick={() => setPdfURL(doc.url)}
                          className={styles['clip-icon']}
                        />
                        <div
                          onClick={() => deleteDoc(doc.id, 'LDOC')}
                          className={styles['delete-icon']}
                        />
                      </div>
                    </div>
                  ))}
              </div>

              <div className={styles.certificado}>
                <div className={styles['certificado-top']}>
                  <div
                    className={`${styles['check-mark']} ${
                      styles[`${docSelected === 'PAYS' ? 'active' : ''}`]
                    }`}></div>
                  <span
                    onClick={() => changeDoc('PAYS')}
                    className={styles['title-cert']}>
                    Extractos Bancarios
                  </span>
                </div>

                {certBancario.length > 0 &&
                  certBancario.map((doc, i) => (
                    <div className={styles['cert-pdf']} key={i}>
                      <span className={styles['title-pdf']}>
                        {`${doc.url.substring(0, doc.url.lastIndexOf('/'))}`}
                      </span>
                      <div className={styles['icons-pdf']}>
                        <div
                          onClick={() => setPdfURL(doc.url)}
                          className={styles['clip-icon']}
                        />
                        <div
                          onClick={() => deleteDoc(doc.id, 'PAYS')}
                          className={styles['delete-icon']}
                        />
                      </div>
                    </div>
                  ))}
              </div>

              <div className={styles.certificado}>
                <div className={styles['certificado-top']}>
                  <div
                    className={`${styles['check-mark']} ${
                      styles[`${docSelected === 'PAYR' ? 'active' : ''}`]
                    }`}></div>
                  <span
                    onClick={() => changeDoc('PAYR')}
                    className={styles['title-cert']}>
                    Certificado de ingresos y retenciones
                  </span>
                </div>

                {certIngresos.length > 0 &&
                  certIngresos.map((doc, i) => (
                    <div className={styles['cert-pdf']} key={i}>
                      <p className={styles['title-pdf']}>
                        {`${doc.url.substring(doc.url.lastIndexOf('/') + 1)}`}
                      </p>
                      <div className={styles['icons-pdf']}>
                        <div
                          onClick={() => setPdfURL(doc.url)}
                          className={styles['clip-icon']}
                        />
                        <div
                          onClick={() => deleteDoc(doc.id, 'PAYR')}
                          className={styles['delete-icon']}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/*

          <div className={styles.buttons}>
            <Button
              buttonType={'secondary'}
              label={'Cancelar'}
              classNameInherit={'align-center'}
              className={styles['filter-buttons-bottom']}
            />
            <Button
              buttonType={'primary'}
              label={'Guardar'}
              classNameInherit={'align-center'}
              className={styles['filter-buttons-bottom']}
            />
          </div>
                      */}
        </div>
      </div>

      {pdfURL && (
        <div className={styles['iframe-popup']}>
          <div className={styles['iframe-popup-content']}>
            <button
              onClick={() => setPdfURL(null)}
              className={styles['iframe-close']}
            />
            <iframe src={pdfURL} width="100%" height="100%" frameBorder="0" />
          </div>
        </div>
      )}
      <div className={`${styles.popSuccessCreated}`}>
        <div className={styles.bgPopUp}></div>
        <div className={styles.popup2}>
          <div className={styles.content}>
            <div className={styles['icon-box']}>
              <img src="/images/check-circle.png" />
              <span className={styles['pop-text']}>
                ¡Tú documento ha sido subido con éxito!
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

export default Documentation;
