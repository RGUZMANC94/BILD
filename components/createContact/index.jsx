import { useEffect, useState } from 'react';
import styles from './create-contact.module.css';

const CreateContact = ({ setShowPopUpCreateContact, setIsConnected }) => {
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    setIsShow(true);
  }, []);
  return (
    <div className={`${isShow ? styles.active : ''} ${styles['popup-tipos']}`}>
      <div
        className={styles['popup-background']}
        onClick={() => {
          setIsShow(false);
          setTimeout(() => {
            setShowPopUpCreateContact(false);
          }, 500);
        }}></div>
      <div className={styles['popup-window']}>
        <div className={styles['top-name']}>Creacion de Contacto</div>
        <div
          className={styles.cerrar}
          onClick={() => {
            setIsShow(false);
            setTimeout(() => {
              setShowPopUpCreateContact(false);
            }, 500);
          }}>
          <span className={styles.close} href="#">
            &times;
          </span>
        </div>
        <form className={styles.msform}>
          <fieldset>
            <input type="text" name="fname" placeholder="Nombre" />
            <input type="text" name="lname" placeholder="Apellidos" />
            <input
              type="text"
              name="document"
              placeholder="Número de Documentos"
            />
            <input type="text" name="email" placeholder="Email" />
            <input type="text" name="phone" placeholder="Celular" />
            <div className={styles.foto}>
              <img src="/images/camera_white_icon.svg" />
              Tomar Foto
            </div>
            <button
              className={styles['action-button']}
              target="_top"
              onClick={(e) => {
                e.preventDefault();
                setIsConnected(true);
                setIsShow(false);
                setTimeout(() => {
                  setShowPopUpCreateContact(false);
                }, 500);
              }}>
              Guardar
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default CreateContact;
