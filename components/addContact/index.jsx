import { useEffect, useState } from 'react';
import styles from './add-contact.module.css';
const AddContact = ({ setShowPopUpAddContact, setIsConnected }) => {
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    setIsShow(true);
  }, []);

  return (
    <div
      className={`${isShow ? styles.active : ''}  ${styles['popup-agregar']}`}>
      <div
        className={styles['popup-background-agregar']}
        onClick={() => {
          setIsShow(false);
          setTimeout(() => {
            setShowPopUpAddContact(false);
          }, 500);
        }}></div>
      <div className={styles['popup-window']}>
        <div className={styles['top-name']}>Agregar Contacto</div>
        <div
          className={styles['cerrar-agregar']}
          onClick={() => {
            setIsShow(false);
            setTimeout(() => {
              setShowPopUpAddContact(false);
            }, 500);
          }}>
          <a className={styles.close} href="#">
            &times;
          </a>
        </div>
        <div className={styles['agregar-wrapper']}>
          <div className={styles['search-wrapper']}>
            <input
              className={styles['search-input']}
              type="text"
              placeholder="Buscar Nombre"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              stroke="#fff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className={styles['feather feather-search']}
              viewBox="0 0 24 24">
              <defs></defs>
              <circle cx="11" cy="11" r="8"></circle>
              <path d="M21 21l-4.35-4.35"></path>
            </svg>
          </div>
          <div className={styles['agregar-contacto']}>
            <div
              className={styles.contact}
              onClick={() => {
                setIsConnected(true);
                setIsShow(false);
                setTimeout(() => {
                  setShowPopUpAddContact(false);
                }, 500);
              }}>
              <img src="/images/Ellipse 81.png" /> Gustavo Cerati
            </div>
            <div className={styles.contact}>
              <img src="/images/Ellipse 82.png" /> Whitney Houston
            </div>
            <div className={styles.contact}>
              <img src="/images/Ellipse 84.png" /> Amy Winehouse
            </div>
            <div className={styles.contact}>
              <img src="/images/Ellipse 81.png" /> Gustavo Cerati
            </div>
            <div className={styles.contact}>
              <img src="/images/Ellipse 82.png" /> Whitney Houston
            </div>
            <div className={styles.contact}>
              <img src="/images/Ellipse 84.png" /> Amy Winehouse
            </div>
            <div className={styles.contact}>
              <img src="/images/Ellipse 81.png" /> Gustavo Cerati
            </div>
            <div className={styles.contact}>
              <img src="/images/Ellipse 82.png" /> Whitney Houston
            </div>
            <div className={styles.contact}>
              <img src="/images/Ellipse 84.png" /> Amy Winehouse
            </div>
            <div className={styles.contact}>
              <img src="/images/Ellipse 81.png" /> Gustavo Cerati
            </div>
            <div className={styles.contact}>
              <img src="/images/Ellipse 82.png" /> Whitney Houston
            </div>
            <div className={styles.contact}>
              <img src="/images/Ellipse 84.png" /> Amy Winehouse
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
