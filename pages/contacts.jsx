import Link from 'next/link';
import styles from '../styles/Contacts.module.css';
import recentsContacts from './api/recentsContacts';
import { useRouter } from 'next/router';
import { getSessionToken } from '../utils/getSessionToken';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { changeContactListSelected } from '../redux/contactSelectedSlice';

const Contacts = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [recentContacts, setRecentsContacts] = useState([]);
  const [sortedontacts, setSortedContacts] = useState([]);
  const { id } = useSelector((state) => state.userState);

  const getRecentsContacts = async () => {
    const response = await fetch('/api/recentsContacts', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    const recentsContactsres = await response.json();
    console.log('dentrod e contactos:', recentsContacts);
    setRecentsContacts(recentsContactsres);
    setSortedContacts(
      recentsContactsres.sort((a, b) => a.name.localeCompare(b.name))
    );
  };

  useEffect(() => {
    // if (!getSessionToken()) {
    //   router.push('/login');
    //   getRecentsContacts();
    //   return;
    // }
    getRecentsContacts();
  }, []);

  return (
    <section className={styles['main-contain-contact']}>
      <div className="container">
        <Link
          className={styles['crear-contacto']}
          href="/create-contact"></Link>
        <div className={styles['contact-top']}>
          <div className={styles.nombre}>Nombre</div>
          <div className={styles.mail}>Correo Electrónico</div>
          <div className={styles.numero}>Número de contacto</div>
        </div>
        <div className={styles.listas}>
          <div className={styles.reciente}>
            Creados Recientemente (
            {recentContacts.length >= 3 ? '3' : recentContacts.length})
          </div>
          {recentContacts.slice(0, 3).map((recent, i) => (
            <div className={styles['list-name']} key={i}>
              <Link
                onClick={() => {
                  dispatch(changeContactListSelected(recent));
                }}
                href={`/buyer/${recent.idCli}`}>
                <div className={styles['list-contact']}>
                  <div className={styles.contact}>
                    <div className={styles['contact-img-container']}>
                      <img
                        src={
                          recent.image[0] !== '' && recent.image[0]
                            ? `${recent.image[0].url}`
                            : '/images/tipo-1.png'
                        }
                      />
                    </div>
                    <span className={`${styles.badge} ${styles.red}`}>1</span>
                    {`${recent.name} ${recent.lastname}`}
                  </div>
                  <div className={styles['reciente-col']}>{recent.email}</div>
                  <div className={styles.number}>
                    {`+57 ${recent.phoneNumber}`}
                    <img src="/images/whastapp-blue.png" />
                  </div>
                  <div className={styles['iconos-movil']}>
                    <div className={styles['phone-movil']}>
                      <img src="/images/blue-phone-movil.png" />
                    </div>
                    <div className={styles['wa-movil']}>
                      <img src="/images/whatsapp-contacts.png" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className={styles.listas}>
          <div className={styles.reciente}>
            Contactos ({recentContacts.length})
          </div>
          {sortedontacts.map((contact, i) => (
            <div className={styles['list-name']} key={i}>
              <Link
                onClick={() => {
                  dispatch(changeContactListSelected(contact));
                }}
                href={`/buyer/${contact.idCli}`}>
                <div className={styles['list-contact']}>
                  <div className={styles.contact}>
                    <div className={styles['contact-img-container']}>
                      <img
                        src={
                          contact.image[0] !== '' && contact.image[0]
                            ? `${contact.image[0].url}`
                            : '/images/tipo-1.png'
                        }
                      />
                    </div>
                    <span className={`${styles.badge} ${styles.red}`}>1</span>
                    {`${contact.name} ${contact.lastname}`}
                  </div>
                  <div className={styles['reciente-col']}>{contact.email}</div>
                  <div className={styles.number}>
                    {`+57 ${contact.phoneNumber}`}
                    <img src="/images/whastapp-blue.png" />
                  </div>
                  <div className={styles['iconos-movil']}>
                    <div className={styles['phone-movil']}>
                      <img src="/images/blue-phone-movil.png" />
                    </div>
                    <div className={styles['wa-movil']}>
                      <img src="/images/whatsapp-contacts.png" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contacts;
