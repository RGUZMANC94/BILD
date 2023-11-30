import styles from './property-connected.module.css';

const PropertyConnected = ({ setIsCreated }) => {
  return (
    <div className={styles['contacto-wrap']}>
      <div className={styles.progressBar}>
        <div className={styles.innerProgressBar}>
          <div className={`${styles.iceCreamBar} bg-ct`}></div>
        </div>
      </div>
      <div className={styles['conecta-dos']}>
        <span className={styles.conectado}>CONECTADO CON:</span>
        <div className={styles['contacto-dos']}>
          <img src="/images/Ellipse 81.png" /> Gustavo Cerati
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
            required
          >
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
              required
            ></textarea>
          </div>
          <div className={styles.boton}>
            <button
              className={styles['contacto-existente']}
              onClick={() => {
                setIsCreated(true);
              }}
            >
              Crear oportunidad
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyConnected;
