import Link from 'next/link';
import styles from '../../styles/Contacts.module.css';
import recentsContacts from '../api/recentsContacts';
// import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeContactListSelected } from '../../redux/contactSelectedSlice';
import Image from 'next/image';
import { parseCookies } from '../../utils/parseCookies';
import AddConsultantPop from '../../components/addConsultantPop';

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

const Consultants = () => {
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
    const response = await fetch('/api/consultants', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, firstNames: '' }),
    });

    const recentsContactsres = await response.json();
    const sortedRecents = recentsContactsres.slice();
    sortedRecents.sort((a, b) => a.firstNames.localeCompare(b.name));
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
        <div className={styles['contact-top']}>
          <div className="container flex j-sb a-c">
            <div className={styles.nombre}>Nombre</div>
            <div className={styles.mail}>Correo Electrónico</div>
            <div className={styles.numero}>Acciones</div>
          </div>
        </div>
        <div className="container">
          <button
            className={styles['crear-contacto']}
            onClick={() => setShowAddContact(true)}>
            Agregar asesor
          </button>

         
          <div className={styles.listas}>
            <div className={styles.reciente}>
              Asesores ({recentContacts.length})
            </div>
            {sortedontacts.map((contact, i) => (
              <div className={styles['list-name']} key={i}>
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
                      {`${contact.firstNames} ${contact.lastNames}`}
                    </div>
                    <div className={styles['reciente-col']}>
                      {contact.email}
                    </div>
                    <div className={styles.number}>
                      {true && (
                        <>
                          <a
                            href={`https://wa.me/${contact.phoneNumber}?subject=BILD`}
                            target="_blank"
                            className={styles['whastapp-icon']}>
                            <Image
                              width={20}
                              height={20}
                              alt=""
                              src="/images/edit-icon.png"
                            />
                            {/* <img src="/images/whastapp-blue.png" /> */}
                          </a>
                          <a
                            href={`https://wa.me/${contact.phoneNumber}?subject=BILD`}
                            target="_blank"
                            className={styles['whastapp-icon']}>
                            <Image
                              width={25}
                              height={25}
                              alt=""
                              src="/images/delete.svg"
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

      <AddConsultantPop
        showAddContact={showAddContact}
        setShowAddContact={setShowAddContact}
        setRefreshContacts={setRefreshContacts}
      />
    </>
  );
};

export default Consultants;
