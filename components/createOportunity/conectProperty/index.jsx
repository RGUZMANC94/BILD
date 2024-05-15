import { useEffect, useState } from 'react';
import styles from './conect-property.module.css';
import { useDispatch } from 'react-redux';
import { changeContactSelected } from '../../../redux/contactSelectedSlice';

const ConectProperty = ({
  setShowPopUpCreateContact,
  setShowPopUpAddContact,
  setIsConnected,
  recentContacts,
}) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.contacto}>
      <div className={styles.conecta}>
        <span className={styles['conecta-contacto']}>
          Conecta el inmueble a un contacto:
        </span>
        <button
          className={styles['crear-contacto']}
          onClick={() => setShowPopUpCreateContact(true)}>
          Crear un contacto
        </button>
        <button
          className={styles['contacto-existente']}
          onClick={() => setShowPopUpAddContact(true)}>
          Elegir contacto
        </button>
      </div>
      <div className={styles.recientes}>
        <span className={styles['conecta-contacto']}>Contactos recientes:</span>
        {recentContacts &&
          recentContacts.length > 0 &&
          recentContacts.slice(0, 3).map((recent, i) => (
            <div
              className={styles.contact}
              key={recent.idCli}
              data-email={recent.email}
              data-phone-number={recent.phoneNumber}
              onClick={() => {
                setIsConnected(true);
                dispatch(changeContactSelected(recent));
                setTimeout(() => {
                  setShowPopUpAddContact(false);
                }, 500);
              }}>
              <img
                src={
                  recent.image[0] !== '' && recent.image[0]
                    ? `${recent.image[0].url}`
                    : '/images/tipo-1.png'
                }
              />{' '}
              {`${recent.name} ${recent.lastname}`}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ConectProperty;
