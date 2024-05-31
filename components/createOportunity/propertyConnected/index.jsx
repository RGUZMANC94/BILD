import styles from './property-connected.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeOpportunitySelected } from '../../../redux/opportunitySelectedSlice';
import { useState, useEffect } from 'react';
import Portal from '../../../HOC/portal';
import { useRouter } from 'next/router';
import { closePopUp } from '../../../redux/popUpOportunity';

const PropertyConnected = ({ setIsCreated }) => {
  const router = useRouter();
  const { id } = useSelector((state) => state.userState);
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

      document
        .querySelector(`.${styles.popSuccessCreated}`)
        .classList.add(styles.activePopUp);

      setTimeout(() => {
        document
          .querySelector(`.${styles.popSuccessCreated}`)
          .classList.remove(styles.activePopUp);
        dispatch(changeOpportunitySelected(responseData.saleOpportunity));
        // setIsCreated(true);
        router.push({
          pathname: '/opportunities',
          hash: responseData.saleOpportunity,
        });
        dispatch(closePopUp());
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
            {`${contactSelected.name} ${contactSelected.lastname}`}
          </div>
        </div>
        <div className={styles.clear}></div>
        <div className={styles.origen}>
          <span className={styles['text-origen']}>Origen del contacto:</span>
          <div className={styles['elegir-origen']}>
            <select
              placeholder="Subject line"
              className={styles.subject_input}
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
                className={styles.message_input}></textarea>
            </div>
            <div className={styles.boton}>
              <button className={styles['contacto-existente']}>
                Crear oportunidad
              </button>
            </div>
          </div>
        </div>
      </form>
      <Portal>
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
      </Portal>
    </>
  );
};

export default PropertyConnected;
