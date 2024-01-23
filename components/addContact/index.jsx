import { useEffect, useState } from 'react';
import styles from './add-contact.module.css';
import { useDispatch } from 'react-redux';
import { changeContactSelected } from '../../redux/contactSelectedSlice';

const AddContact = ({
  setShowPopUpAddContact,
  setIsConnected,
  recentContacts,
}) => {
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    setIsShow(true);
  }, []);
  const [sortedContacts, setSortedContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setSortedContacts(
      recentContacts.sort((a, b) => a.name.localeCompare(b.name))
    );
  }, [recentContacts]);

  const filteredContacts = sortedContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastname.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className={styles['agregar-contacto']}>
            {filteredContacts.length > 0 ? (
              filteredContacts.map((recent, i) => (
                <div
                  className={styles.contact}
                  key={i}
                  onClick={() => {
                    setIsConnected(true);
                    setIsShow(false);
                    dispatch(changeContactSelected(recent));
                    setTimeout(() => {
                      setShowPopUpAddContact(false);
                    }, 500);
                  }}>
                  <img
                    src={
                      recent.image[0] !== '' && recent.image[0]
                        ? `${recent.image[0].url}`
                        : '/images/Ellipse 81.png'
                    }
                    alt={`${recent.name} ${recent.lastname}`}
                  />
                  {`${recent.name} ${recent.lastname}`}
                </div>
              ))
            ) : (
              <p>No se encontraron contactos.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
