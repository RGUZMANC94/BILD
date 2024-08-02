import styles from './property-connected.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeOpportunitySelected } from '../../../redux/opportunitySelectedSlice';
import { useState, useEffect } from 'react';
import Portal from '../../../HOC/portal';
import { useRouter } from 'next/router';
import { closePopUp } from '../../../redux/popUpOportunity';
import { useContext } from 'react';
import BildContext from '../../context';
import { parseCookies } from '../../../utils/parseCookies';
import EditContactPop from '../../../components/editContactPop';
import SuccessPopUp from '../../successPopUp';
import ErrorPopUp from '../../errorPopUp';

export const getServerSideProps = async ({
  req: {
    headers: { cookie },
  },
}) => {
  const { user_tk } = parseCookies(cookie);
  return {
    props: {
      user: JSON.parse(user_tk),
    },
  };
};

const PropertyConnected = ({ setIsCreated }) => {
  const router = useRouter();
  const { initialState } = useContext(BildContext);
  const { user } = initialState;
  console.log('user: ', user);
  const { userid: id } = user;
  console.log('user id: ', id);
  const { contactSelected } = useSelector(
    (state) => state.contactOpportunityState
  );
  const { unitSelected } = useSelector((state) => state.unitState);
  const dispatch = useDispatch();
  const [enableTextarea, setEnableTextarea] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [datos, setDatos] = useState({
    idProperty: unitSelected.idProperty,
    idProject: unitSelected.projectId,
    idClient: contactSelected.idCli,
    comments: '',
    origin: '845001',
    cycleSale: '',
    stageSale: '',
    idAdviser: '',
  });
  const [originTemp, setOriginTemp] = useState('');
  const [showEditContact, setShowEditContact] = useState(false);
  const [refreshContacts, setRefreshContacts] = useState(false);
  const [infoContact, setInfoContact] = useState(null);
  const [successPopUp, setSuccessPopUp] = useState(0);

  const getContact = async () => {
    const response = await fetch('/api/getContactInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        idclient: contactSelected.idCli,
      }),
    });
    const responseContact = await response.json();

    setInfoContact(responseContact[0]);
    console.log('respuesta contacto: ', responseContact[0]);
  };

  useEffect(() => {
    if (refreshContacts) {
      getContact();
      setRefreshContacts(false);
    }
  }, [refreshContacts]);

  console.log('originTemp: ', originTemp);

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleTemp = (e) => {
    setOriginTemp(e.target.value);
  };

  const sendFormInfo = async (e) => {
    e.preventDefault();

    try {
      const oppCreated = await fetch('/api/createOpportunity', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          datos,
        }),
      });

      if (!oppCreated.ok) {
        const errorMessage = await oppCreated.text();
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

      const responseData = await oppCreated.json();

      setSuccessPopUp((preState) => 1);
      
      setTimeout(() => {
        setTimeout(() => {
          setSuccessPopUp((preState) => 0);
        }, 1000);
        dispatch(changeOpportunitySelected(responseData.saleOpportunity));
        router.push({
          pathname: '/opportunities',
          hash: responseData.saleOpportunity,
        });
        dispatch(closePopUp());
      }, 2000);
    } catch (error) {
      setSuccessPopUp((preState) => 2);

      setTimeout(() => {
        setTimeout(() => {
          setSuccessPopUp((preState) => 0);
        }, 1000);
      }, 5000);
      console.error('Error al crear el oportunidad:', error.message);
    }
  };

  return (
    <>
      <form className={styles['contacto-wrap']} onSubmit={sendFormInfo}>
        <div className={styles.progressBar}>
          <div className={styles.innerProgressBar}>
            <div className={`${styles.iceCreamBar} bg-ct`}></div>
          </div>
        </div>
        <div className={styles['conecta-dos']}>
          <span className={styles.conectado}>Conectado con:</span>
          <div className={styles['contacto-dos']}>
            <img
              src={
                contactSelected.image[0] !== '' && contactSelected.image[0]
                  ? `${contactSelected.image[0].url}`
                  : '/images/Ellipse 81.png'
              }
              alt={`${contactSelected.name} ${contactSelected.lastname}`}
            />
            {infoContact
              ? `${infoContact.firstNames} ${infoContact.lastNames}`
              : `${contactSelected.name} ${contactSelected.lastname}`}
          </div>
          <button
            type="button"
            className={`${styles.editar}`}
            onClick={() => setShowEditContact(true)}
          />
        </div>
        <div className={styles.clear}></div>
        <div className={styles.origen}>
          <span className={styles['text-origen']}>Origen del contacto:</span>
          <div className={styles['elegir-origen']}>
            <select
              placeholder="Subject line"
              className={`${styles.subject_input} border-solid border dark:border-light-1 bg-transparent dark:bg-[url(/images/arrow-select-white.svg)] bg-[url(/images/arrow_select.png)]`}
              name="originTemp"
              value={originTemp}
              onChange={handleTemp}
              required>
              <option value={'None'} disabled hidden selected>
                Seleccione origen
              </option>
              <option value={'Sucesion'}>Sucesión de propiedad</option>
              <option value={'Recomendacion'}>Recomendación</option>
              <option value={'otro'}>Otro</option>
            </select>
            <div className="name-field">
              <span className={`${styles.label}`}>Descripción:</span>
              <textarea
                onChange={handleChange}
                name="comments"
                value={datos.comments}
                placeholder=""
                className={`${styles.message_input} border-solid border dark:border-light-1 border-dark-3`}></textarea>
            </div>
            <div className={styles.boton}>
              <button type="submit" className={styles['contacto-existente']}>
                Crear oportunidad
              </button>
            </div>
          </div>
        </div>
      </form>
      <Portal>
        <EditContactPop
          showEditContact={showEditContact}
          setShowEditContact={setShowEditContact}
          setRefreshContacts={setRefreshContacts}
          contactId={contactSelected.idCli}
        />
      </Portal>
      
      <Portal>
              {successPopUp === 1 && (
                <SuccessPopUp
                  message={'¡Su proyecto ha sido creado con éxito!'}></SuccessPopUp>
              )}
              {successPopUp === 2 && (
                <ErrorPopUp errorMessage={errorMessage}></ErrorPopUp>
              )}
      </Portal>   
    </>
  );
};

export default PropertyConnected;
