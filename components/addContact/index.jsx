import { useContext, useEffect, useState } from 'react';
import styles from './add-contact.module.css';
import { useDispatch } from 'react-redux';
import { changeContactSelected } from '../../redux/contactSelectedSlice';
import BildContext from '../context';

const AddContact = ({
  setShowPopUpAddContact,
  setIsConnected,
  recentContacts,
}) => {
  const { isDark } = useContext(BildContext);
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsShow(true);
    }, 100);
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
      <div className={`${styles['popup-window']} bg-popup`}>
        <div className={`${styles['top-content']} header-popup`}>
          <div className={styles['top-name']}>
            <h1 className={`${styles['top-content-title']} font-black`}>
              Seleccionar Contacto
            </h1>
          </div>
          <div
            className={`${styles['close-icon']} ${
              isDark
                ? 'bg-[url(/images/close-white.svg)]'
                : 'bg-[url(/images/light/back.png)]'
            }`}
            onClick={() => {
              setIsShow(false);
              setTimeout(() => {
                setShowPopUpAddContact(false);
              }, 500);
            }}></div>
        </div>

        <div className={styles['agregar-wrapper']}>
          <div className={`${styles['search-wrapper']} border-input`}>
            <input
              className={`${styles['search-input']} `}
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
                  className={`${styles.contact} hover:bg-light-3 dark:hover:bg-dark-2`}
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
