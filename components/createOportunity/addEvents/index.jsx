import { useEffect, useState } from 'react';
import styles from './add-events.module.css';
import Button from '../../button';
import DatePicker from "react-datepicker";
import SquareInput from '../../squareInput';
import { useDispatch, useSelector } from 'react-redux';

const AddEvents = ({ setShowPopEvents }) => {
  const { id } = useSelector((state) => state.userState);
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const { opportunitySelected } = useSelector(
    (state) => state.opportunityState
  );

  const [datos, setDatos] = useState({
    
      idSaleOp: "",
      activity: "Prueba evento 1",
      ask1: "",
      ask2: "",
      ask3: "",
      expirationDate: "2024-12-22 17:00:00" 
  });

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  console.log('Datos: ', datos);


  useEffect(() => {
    setShow(true);
    setDatos({ ...datos, idSaleOp: opportunitySelected });
  }, []);

  const sendFormInfo = async (e) => {
    e.preventDefault();

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
        setShowPopEvents(false);
      }, 2000);
    } catch (error) {
      console.error('Error al crear el proyecto:', error);
    }
  };


  return (
    <section className={`${styles.main} ${show ? styles.active : ''}`}>
      <div className={styles.banner}></div>
      <div className={styles.descripcion}>
        <div
          className={`${styles.close} bg-ct`}
          onClick={() => {
            setShow(false);
            setTimeout(() => {
              setShowPopEvents(false);
            }, 500);
          }}></div>
        <div onSubmit={sendFormInfo} className={styles['left-side-event']}>
          <span className={styles['title-descripcion']}>Descripción</span>
          <div className={styles.questions}>
            ¿De donde sale el evento? ¿Qué busca el cliente? Descripción de este
            seguimiento
          </div>
          <form className={styles.origen}>
            <span className={styles['text-origen']}>ORIGEN:</span>
            <div className={styles['elegir-origen']}>
              <span className={styles.label}></span>
              <label className={styles.labelNode} for="subject"></label>
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
              <div className={styles['name-field']}>
                <span className={styles.label}>NOtas</span>
                <textarea
                  name="activity"
                  value={datos.activity}
                  className={styles.message_input}
                  onChange={handleChange}
                  required></textarea>
                <label className={styles.labelNode}>
                  <input type="checkbox" name="cb-terminosservicio"/>{' '}
                  Agendar seguimiento futuro
                </label>
                <br />
              </div>
            </div>
            {/*<div className={styles["right-side-event"]}>
              <label htmlFor="" className={styles["label-right-side"]}>
                <span className={styles["text-origen"]}>Fecha:</span>
                <DatePicker></DatePicker>
              </label>
        </div> */}
            <div className={styles.boton}>
              <Button
                buttonType="primary"
                label="guardar"
                className="buttonsFilter"
              />
            </div>
          </form>
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
                <span className={styles['pop-text-bold']}>¡Oops!</span>Algo no
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
