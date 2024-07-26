import { useContext, useEffect, useState } from 'react';
import styles from './add-events.module.css';
import Button from '../../button';
import { useSelector } from 'react-redux';
import BildContext from '../../context';

const AddEvents = ({
  setShowPopEvents,
  setRefreshFlag,
  setAddEvents,
  updateEvents,
  id,
}) => {
  const { quicksand } = useContext(BildContext);
  // const { id } = useSelector((state) => state.userState);
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const { opportunitySelected } = useSelector(
    (state) => state.opportunityState
  );

  const [datos, setDatos] = useState({
    idSaleOp: '',
    activity: '',
    ask1: '',
    ask2: '',
    ask3: '',
    expirationDate: '2024-12-22 17:00:00',
  });

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  console.log('Datos: ', datos);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 100);
    setDatos({ ...datos, idSaleOp: opportunitySelected });
  }, []);

  const sendFormInfo = async () => {
    console.log(
      JSON.stringify({
        id,
        datos,
      })
    );

    try {
      const typeCreated = await fetch('/api/createEvent', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          datos,
        }),
      });

      console.log('Tipo creado: ', typeCreated);

      if (!typeCreated.ok) {
        throw new Error('Failed to create unit');
      }

      const responseData = await typeCreated.json();

      console.log('Proyecto creado:', responseData);

      document
        .querySelector(`.${styles.popSuccessCreated}`)
        .classList.add(styles.activePopUp);

      setTimeout(() => {
        document
          .querySelector(`.${styles.popSuccessCreated}`)
          .classList.remove(styles.activePopUp);
        setShowPopEvents ? setShowPopEvents(false) : null;
        setAddEvents ? setAddEvents(false) : null;
        setRefreshFlag ? setRefreshFlag((prevState) => !prevState) : null;
        updateEvents ? updateEvents() : null;
      }, 2000);
    } catch (error) {
      console.error('Error al crear el proyecto:', error);
    }
  };

  return (
    <section className={`${styles.main} ${show ? styles.active : ''}`}>
      <div
        className={`${styles.banner} bg-backg-popup`}
        onClick={() => {
          setShow(false);
          setTimeout(() => {
            setShowPopEvents ? setShowPopEvents(false) : null;
            setAddEvents ? setAddEvents(false) : null;
          }, 500);
        }}></div>
      <div className={`${styles.descripcion} bg-popup`}>
        <div className={`${styles.topContent} header-popup`}>
          <span className={styles['title-descripcion']}>Añadir Evento</span>
          <div
            className={`${styles.close} bg-ct`}
            onClick={() => {
              setShow(false);
              setTimeout(() => {
                setShowPopEvents ? setShowPopEvents(false) : null;
                setAddEvents ? setAddEvents(false) : null;
              }, 500);
            }}></div>
        </div>
        <div onSubmit={sendFormInfo} className={styles['info-content']}>
          <form className={styles.origen}>
            <h2 className={styles['text-origen']}>Tipo de evento:</h2>
            <div className={styles['elegir-origen']}>
              <select
                placeholder="Subject line"
                name="subject"
                className={`${styles.subject_input} border-input dark:bg-dark-4 bg-transparent dark:bg-[url(/images/arrow-select-white.svg)] bg-[url(/images/arrow_select.png)] bg-contain bg-no-repeat `}
                required>
                <option disabled hidden selected>
                  Seleccionar tipo de evento
                </option>
                <option>Llamada</option>
                <option>Whatsapp</option>
                <option>Correo</option>
                <option>Visita</option>
              </select>
              <div className={styles['name-field']}>
                <h2 className={styles['text-origen']}>Notas</h2>
                <textarea
                  name="activity"
                  value={datos.activity}
                  className={`${styles.message_input} border-input`}
                  onChange={handleChange}
                  required></textarea>
                <br />
              </div>
            </div>
            {/* <div className={styles["right-side-event"]}>
              <label htmlFor="" className={styles["label-right-side"]}>
                <span className={styles["text-origen"]}>Fecha:</span>
                <DatePicker></DatePicker>
              </label>
        </div> */}
          </form>
        </div>
        <div className={`${styles.BottomContent} footer-popup`}>
          <Button
            buttonType={'secondary'}
            iconImage={false}
            label={'CANCELAR'}
            inheritClass={styles.buttonCreateType}
            clickFunction={() => {
              setShow(false);
              setTimeout(() => {
                setShowPopEvents ? setShowPopEvents(false) : null;
                setAddEvents ? setAddEvents(false) : null;
              }, 500);
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
      <div className={`${styles.popSuccessCreated}`}>
        <div className={styles.bgPopUp}></div>
        <div className={styles.popup2}>
          <div className={styles.content}>
            <div className={styles['icon-box']}>
              <img src="/images/check-circle.png" />
              <span className={styles['pop-text']}>
                ¡Tú Evento ha sido creado con éxito!
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
    </section>
  );
};

export default AddEvents;
