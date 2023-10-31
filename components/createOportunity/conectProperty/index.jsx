import styles from "./conect-property.module.css";

const ConectProperty = ({ setShowPopUpCreateContact, setShowPopUpAddContact }) => {
  return (
    <div className={styles["contacto"]}>
      <div className={styles["conecta"]}>
        <span className={styles["conecta-contacto"]}>
          CONECTA EL INMUEBLE A UN CONTACTO:
        </span>
        <button
          className={styles["crear-contacto"]}
          onClick={() => setShowPopUpCreateContact(true)}
        >
          Crear un contacto
        </button>
        <button
          className={styles["contacto-existente"]}
          onClick={() => setShowPopUpAddContact(true)}
        >
          Contacto Existente
        </button>
      </div>
      <div className={styles["recientes"]}>
        <span className={styles["conecta-contacto"]}>CONTACTOS RECIENTES:</span>
        <div className={styles["contact"]}>
          <img src="/images/Ellipse 81.png" /> Gustavo Cerati
        </div>
        <div className={styles["contact"]}>
          <img src="/images/Ellipse 82.png" /> Whitney Houston
        </div>
        <div className={styles["contact"]}>
          <img src="/images/Ellipse 84.png" /> Amy Winehouse
        </div>
      </div>
    </div>
  );
};

export default ConectProperty;
