import { useEffect, useState } from 'react';
import styles from './add-events.module.css';
import Button from '../../button';
// import DatePicker from "react-datepicker";

const AddEvents = ({ setShowPopEvents }) => {
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    setShow(true);
  }, []);

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
        <div className={styles['left-side-event']}>
          <span className={styles['title-descripcion']}>Descripción</span>
          <div className={styles.questions}>
            ¿De donde sale el evento? ¿Qué busca el cliente? Descripción de este
            seguimiento
          </div>
          <div className={styles.origen}>
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
                  name="message"
                  placeholder=""
                  className={styles.message_input}
                  required></textarea>
                <label className={styles.labelNode}>
                  <input type="checkbox" name="cb-terminosservicio" required />{' '}
                  Agendar seguimiento futuro
                </label>
                <br />
              </div>
            </div>
            {/* <div className={styles["right-side-event"]}>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddEvents;
