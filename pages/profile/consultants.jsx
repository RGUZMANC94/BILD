import Link from 'next/link';
import styles from '../../styles/Contacts.module.css';
import recentsContacts from '../api/recentsContacts';
// import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { changeContactListSelected } from '../../redux/contactSelectedSlice';
import Image from 'next/image';
import { parseCookies } from '../../utils/parseCookies';
import AddConsultantPop from '../../components/addConsultantPop';
import EditConsultantsPop from '../../components/editConsultantsPop';
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
  const [showEditContact, setShowEditContact] = useState(false);
  const [consultantSelected, setConsultantSelected] = useState(null);
  const [projectList, setProjectList] = useState([]);
  const { isDark } = useContext(BildContext);

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

  const deleteConsultant = async (idCons) => {
    try {
      const quoteDeleted = await fetch('/api/deleteConsultan', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          salesConsultantId: idCons,
        }),
      });

      console.log('Consultant deleted: ', quoteDeleted);

      if (!quoteDeleted.ok) {
        throw new Error('Failed to delete Consultant');
      }

      const responseData = await quoteDeleted.json();

      console.log('Quote deleted:', responseData);

      document
        .querySelector(`.${styles.popSuccessCreated}`)
        .classList.add(styles.activePopUp);

      setTimeout(() => {
        setRefreshContacts((prevState) => !prevState);
        document
          .querySelector(`.${styles.popSuccessCreated}`)
          .classList.remove(styles.activePopUp);
      }, 2000);
    } catch (error) {
      document
        .querySelector(`.${styles.popError}`)
        .classList.add(styles.activePopUp);

      setTimeout(() => {
        document
          .querySelector(`.${styles.popError}`)
          .classList.remove(styles.activePopUp);
      }, 2000);
      console.error('Error al Borrar asesor:', error);
    }
  };

  useEffect(() => {
    if (refreshContacts) {
      setRefreshContacts(false);
    }
    getRecentsContacts();
  }, [refreshContacts]);

  const getProjects = async () => {
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        page: 1,
        rows: 10000,
      }),
    });
    const responseProjects = await response.json();

    setProjectList(
      responseProjects.filter((proj) => Object.keys(proj).length >= 3)
    );
  };

  useEffect(() => {
    getRecentsContacts();
    getProjects();
  }, []);
  return (
    <>
      <section className={styles['main-contain-contact']}>
        <div className={`${styles['contact-top']} bg-sub-header`}>
          <div className="container flex j-sb a-c">
            <div className={styles.nombre}>Nombre</div>
            <div className={styles.mail}>Correo Electrónico</div>
            <div className={styles.numero}>Acciones</div>
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
              Asesores ({recentContacts.length})
            </div>
            {sortedontacts.map((contact, i) => (
              <div className={`${styles['list-name']}  hover:dark:bg-dark-2`} key={i}>
                <div className={styles['consultant-obj']}>
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
                          <button
                            onClick={() => {
                              setConsultantSelected(contact);
                              setShowEditContact(true);
                            }}
                            className={`${styles['edit-icon']} ${
                              !isDark && 'invert-filter'
                            } bg-[url(/images/edit-icon.png)] dark:bg-[url(/images/edit-icon.png)]`}>
                            {/* <img src="/images/whastapp-blue.png" /> */}
                          </button>
                          <button
                            onClick={() =>
                              deleteConsultant(contact.salesConsultantId)
                            }
                            className={`${styles['delete-icon']} ${
                              isDark && 'brightness-filter'
                            } `}>
                            {/* <img src="/images/whastapp-blue.png" /> */}
                          </button>
                        </>
                      )}
                    </div>
                    <div className={styles['iconos-movil']}>
                      <button
                        onClick={() => {
                          setConsultantSelected(contact);
                          setShowEditContact(true);
                        }}
                        className={`${styles['edit-icon']}`}>
                        {/* <img src="/images/whastapp-blue.png" /> */}
                      </button>
                      <button
                        onClick={() =>
                          deleteConsultant(contact.salesConsultantId)
                        }
                        className={styles['delete-icon']}>
                        {/* <img src="/images/whastapp-blue.png" /> */}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AddConsultantPop
        showAddContact={showAddContact}
        setShowAddContact={setShowAddContact}
        setRefreshContacts={setRefreshContacts}
        projectList={projectList}
      />

      <EditConsultantsPop
        showEditContact={showEditContact}
        setShowEditContact={setShowEditContact}
        setRefreshContacts={setRefreshContacts}
        consultantInfo={consultantSelected}
        projectList={projectList}
      />
      <div className={`${styles.popSuccessCreated}`}>
        <div className={styles.bgPopUp}></div>
        <div className={styles.popup2}>
          <div className={styles.content}>
            <div className={styles['icon-box']}>
              <img src="/images/check-circle.png" />
              <span className={styles['pop-text']}>
                ¡El asesor ha sido eliminado con éxito!
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.popError}`}>
        <div className={styles.bgPopUp}></div>
        <div className={styles.popup3}>
          <div className={styles.content}>
            <div className={styles['icon-box']}>
              <img src="/images/error-circle.png" />
              <span className={styles['pop-text']}>
                <span className={styles['pop-text-bold']}>¡Oops!</span> Algo no
                está bien. Por favor, revisa los datos ingresados e inténtalo de
                nuevo.
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Consultants;
