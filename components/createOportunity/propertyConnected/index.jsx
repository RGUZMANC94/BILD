import styles from './property-connected.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../button';
import { useRouter } from 'next/router';
import { changeOpportunitySelected } from '../../../redux/opportunitySelectedSlice';

const PropertyConnected = ({ setIsCreated }) => {
  const { id } = useSelector((state) => state.userState);
  const { contactSelected } = useSelector(
    (state) => state.contactOpportunityState
  );
  const { unitSelected } = useSelector((state) => state.unitState);
  const dispatch = useDispatch();

  const sendFormInfo = async (e) => {
    e.preventDefault();
    const datos = {
      idProperty: unitSelected.idProperty,
      idProject: unitSelected.projectId,
      idClient: contactSelected.idCli,
      cycleSale: '',
      stageSale: '',
      idAdviser: '',
    };

    console.log(
      JSON.stringify({
        id,
        datos,
      })
    );

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
      console.log('respuesta de creacion', oppCreated);
      console.log('hola paso creacio');
      const responseData = await oppCreated.json();

      if (!oppCreated.ok) {
        document
          .querySelector(`.${styles.popError}`)
          .classList.add(styles.activePopUp);

        setTimeout(() => {
          document
            .querySelector(`.${styles.popError}`)
            .classList.remove(styles.activePopUp);
        }, 2000);
        throw new Error('Failed to create opportunity');
      }

      document
        .querySelector(`.${styles.popSuccessCreated}`)
        .classList.add(styles.activePopUp);

      setTimeout(() => {
        document
          .querySelector(`.${styles.popSuccessCreated}`)
          .classList.remove(styles.activePopUp);
        dispatch(changeOpportunitySelected(responseData.saleOpportunity));
        setIsCreated(true);
      }, 2000);
    } catch (error) {
      console.error('Error al crear la oportunidad:', error);
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
          <span className={styles.conectado}>CONECTADO CON:</span>
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
          <span className={styles['text-origen']}>ORIGEN:</span>
          <div className={styles['elegir-origen']}>
            <select
              placeholder="Subject line"
              name="subject"
              className={styles.subject_input}
              required>
              <option disabled hidden selected>
                OTRO
              </option>
              <option>Opción 1</option>
              <option>Opción 2</option>
              <option>Opción 3</option>
            </select>
            <div className="name-field">
              <span className={styles.label}>Descripción del Proyecto</span>
              <textarea
                name="message"
                placeholder=""
                className={styles.message_input}
                required></textarea>
            </div>
            <div className={styles.boton}>
              <button className={styles['contacto-existente']}>
                Crear oportunidad
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className={`${styles.popSuccessCreated}`}>
        <div className={styles.bgPopUp}></div>
        <div className={styles.popup2}>
          <div className={styles.content}>
            <div className={styles['icon-box']}>
              <img src="/images/check-circle.png" />
              <span className={styles['pop-text']}>
                ¡Tú oportunidad ha sido creada con éxito!
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
                <span className={styles['pop-text-bold']}>¡Oops!</span>Algo no
                está bien. Parece que esta unidad ya tiene una oportunidad
                asignada.
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyConnected;
