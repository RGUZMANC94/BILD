import styles from './conect-property.module.css';

const ConectProperty = ({
  setShowPopUpCreateContact,
  setShowPopUpAddContact,
  recentContacts,
}) => {
  return (
    <div className={styles.contacto}>
      <div className={styles.conecta}>
        <span className={styles['conecta-contacto']}>
          CONECTA EL INMUEBLE A UN CONTACTO:
        </span>
        <button
          className={styles['crear-contacto']}
          onClick={() => setShowPopUpCreateContact(true)}>
          Crear un contacto
        </button>
        <button
          className={styles['contacto-existente']}
          onClick={() => setShowPopUpAddContact(true)}>
          Contacto Existente
        </button>
      </div>
      <div className={styles.recientes}>
        <span className={styles['conecta-contacto']}>CONTACTOS RECIENTES:</span>
        {recentContacts && (
          <div
            className={styles.contact}
            key={recentContacts.ContactId}
            data-email={recentContacts.email}
            data-phone-number={recentContacts.phoneNumber}>
            <img src="/images/Ellipse 81.png" /> {recentContacts.contactName}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConectProperty;
