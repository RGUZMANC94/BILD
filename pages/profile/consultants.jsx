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
import Portal from '../../HOC/portal';
import SuccessPopUp from '../../components/successPopUp';
import ErrorPopUp from '../../components/errorPopUp';

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
  const [successPopUp, setSuccessPopUp] = useState(0);


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

      setSuccessPopUp((preState) => 1);

      setTimeout(() => {
        setRefreshContacts((prevState) => !prevState);
        setTimeout(() => {
          setSuccessPopUp((preState) => 0);
        }, 1000);
      }, 2000);
    } catch (error) {
      setSuccessPopUp((preState) => 2);

      setTimeout(() => {
        setTimeout(() => {
          setSuccessPopUp((preState) => 0);
        }, 1000);
      }, 2000);
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
      <Portal>
        {successPopUp === 1 && (
          <SuccessPopUp
            message={'¡El asesor ha sido eliminado con éxito!'}></SuccessPopUp>
        )}
        {successPopUp === 2 && (
          <ErrorPopUp errorMessage={'Por favor, revisa los datos ingresados e inténtalo de nuevo.'}></ErrorPopUp>
        )}
      </Portal>   
    </>
  );
};

export default Consultants;
