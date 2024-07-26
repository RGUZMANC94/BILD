import Link from 'next/link';
import styles from '../../styles/Contacts.module.css';
import recentsContacts from '../api/recentsContacts';
// import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeContactListSelected } from '../../redux/contactSelectedSlice';
import Image from 'next/image';
import { parseCookies } from '../../utils/parseCookies';
import AddContactPop from '../../components/addContactPop';

import { useContext } from 'react';
import BildContext from '../../components/context';

export const getServerSideProps = async ({
  req: {
    headers: { cookie },
  },
}) => {
  const { user_tk } = parseCookies(cookie);
  return { props: { user: JSON.parse(user_tk) } };
};

const Contacts = () => {
  const { initialState } = useContext(BildContext);
  const { user } = initialState;
  const { userid: id } = user;
  // const router = useRouter();
  const dispatch = useDispatch();
  const [recentContacts, setRecentsContacts] = useState([]);
  const [sortedontacts, setSortedContacts] = useState([]);
  // const { id } = useSelector((state) => state.userState);
  const [showAddContact, setShowAddContact] = useState(false);
  const [refreshContacts, setRefreshContacts] = useState(false);

  const getRecentsContacts = async () => {
    const response = await fetch('/api/recentsContacts', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, idclient: '' }),
    });

    const recentsContactsres = await response.json();
    const sortedRecents = recentsContactsres.slice();
    sortedRecents.sort((a, b) => a.name.localeCompare(b.name));
    setRecentsContacts(recentsContactsres);
    setSortedContacts(sortedRecents);
  };

  useEffect(() => {
    getRecentsContacts();
  }, []);

  useEffect(() => {
    if (refreshContacts) {
      setRefreshContacts(false);
    }
    getRecentsContacts();
  }, [refreshContacts]);

  console.log('recentsContacts:', showAddContact);

  return (
    <>
      <section className={styles['main-contain-contact']}>
        <div className={`${styles['contact-top']} bg-sub-header`}>
          <div className="container flex j-sb a-c">
            <div className={styles.nombre}>Nombre</div>
            <div className={styles.mail}>Correo Electrónico</div>
            <div className={styles.numero}>Número de contacto</div>
          </div>
        </div>
        <div className="container">
          <button
            className={`${styles['crear-contacto']} font-black`}
            onClick={() => setShowAddContact(true)}>
            <span className={styles['hidden-text']}>Nuevo contacto</span>
          </button>

          <div className={styles.listas}>
            <div className={`${styles.reciente} font-black`}>
              Creados Recientemente (
              {recentContacts.length >= 3 ? '3' : recentContacts.length})
            </div>
            {recentContacts.slice(0, 3).map((recent, i) => (
              <div
                className={`${styles['list-name']}  hover:bg-light-3  hover:dark:bg-dark-2`}
                key={i}>
                <Link
                  onClick={() => {
                    dispatch(changeContactListSelected(recent));
                  }}
                  href={`/contacts/${recent.idCli}`}>
                  <div className={styles['list-contact']}>
                    <div className={styles.contact}>
                      <div className={styles['contact-img-container']}>
                        <Image
                          alt=""
                          width={40}
                          height={40}
                          src={
                            recent.image[0] !== '' && recent.image[0]
                              ? `${recent.image[0].url}`
                              : '/images/tipo-1.png'
                          }
                        />
                        {/* <img
                      src={
                        recent.image[0] !== '' && recent.image[0]
                          ? `${recent.image[0].url}`
                          : '/images/tipo-1.png'
                      }
                    /> */}
                      </div>
                      <span className={`${styles.badge} ${styles.red}`}>1</span>
                      {`${recent.name} ${recent.lastname}`}
                    </div>
                    <div className={styles['reciente-col']}>{recent.email}</div>
                    <div className={styles.number}>
                      {recent.phoneNumber && (
                        <>
                          <a
                            href={`https://wa.me/${recent.phoneNumber}?subject=BILD`}
                            target="_blank"
                            className={styles['whastapp-icon']}>
                            {`+57 ${recent.phoneNumber}`}
                            <Image
                              width={40}
                              height={40}
                              alt=""
                              src="/images/whastapp-blue.png"
                            />
                            {/* <img src="/images/whastapp-blue.png" /> */}
                          </a>
                        </>
                      )}
                    </div>
                    <div className={styles['iconos-movil']}>
                      <div className={styles['phone-movil']}>
                        <Image
                          width={40}
                          height={40}
                          alt=""
                          src="/images/blue-phone-movil.png"
                        />
                        {/* <img src="/images/blue-phone-movil.png" /> */}
                      </div>
                      <div className={styles['wa-movil']}>
                        <Image
                          width={40}
                          height={40}
                          alt=""
                          src="/images/whatsapp-contacts.png"
                        />
                        {/* <img src="/images/whatsapp-contacts.png" /> */}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className={styles.listas}>
            <div className={`${styles.reciente} font-black`}>
              Contactos ({recentContacts.length})
            </div>
            {sortedontacts.map((contact, i) => (
              <div
                className={`${styles['list-name']} hover:bg-light-3 dark:bg-dark-4 hover:dark:bg-dark-2`}
                key={i}>
                <Link
                  onClick={() => {
                    dispatch(changeContactListSelected(contact));
                  }}
                  href={`/contacts/${contact.idCli}`}>
                  <div className={styles['list-contact']}>
                    <div className={styles.contact}>
                      <div className={styles['contact-img-container']}>
                        <Image
                          alt=""
                          width={40}
                          height={40}
                          src={
                            contact.image[0] !== '' && contact.image[0]
                              ? `${contact.image[0].url}`
                              : '/images/tipo-1.png'
                          }
                        />
                        {/* <img
                        src={
                          contact.image[0] !== '' && contact.image[0]
                            ? `${contact.image[0].url}`
                            : '/images/tipo-1.png'
                        }
                      /> */}
                      </div>
                      <span className={`${styles.badge} ${styles.red}`}>1</span>
                      {`${contact.name} ${contact.lastname}`}
                    </div>
                    <div className={styles['reciente-col']}>
                      {contact.email}
                    </div>
                    <div className={styles.number}>
                      {contact.phoneNumber && (
                        <>
                          <a
                            href={`https://wa.me/${contact.phoneNumber}?subject=BILD`}
                            target="_blank"
                            className={styles['whastapp-icon']}>
                            {`+57 ${contact.phoneNumber}`}
                            <Image
                              width={40}
                              height={40}
                              alt=""
                              src="/images/whastapp-blue.png"
                            />
                            {/* <img src="/images/whastapp-blue.png" /> */}
                          </a>
                        </>
                      )}
                    </div>
                    <div className={styles['iconos-movil']}>
                      <div className={styles['phone-movil']}>
                        <Image
                          width={40}
                          height={40}
                          alt=""
                          src="/images/blue-phone-movil.png"
                        />
                        {/* <img src="/images/blue-phone-movil.png" /> */}
                      </div>
                      <div className={styles['wa-movil']}>
                        <Image
                          width={40}
                          height={40}
                          alt=""
                          src="/images/whatsapp-contacts.png"
                        />
                        {/* <img src="/images/whatsapp-contacts.png" /> */}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AddContactPop
        showAddContact={showAddContact}
        setShowAddContact={setShowAddContact}
        setRefreshContacts={setRefreshContacts}
      />
    </>
  );
};

export default Contacts;
