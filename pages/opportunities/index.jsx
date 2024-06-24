import OportunitiesAll from '../../components/oportunitiesAll';
// import OportunitiesPending from '../../components/oportunitiesPending';
import OportunitiesClosed from '../../components/oportunitiesClosed';
import styles from '../../styles/Oportunities-All.module.css';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CreateOportunity from '../../components/createOportunity';
// import { getSessionToken } from '../../utils/getSessionToken';
// import opportunities from '../api/opportunities';
import { useDispatch } from 'react-redux';
import { changeUnitSelected } from '../../redux/unitSelectedSlice';
import ZoomImg from '../../components/zoomImg';
import { parseCookies } from '../../utils/parseCookies';
import EditContactPop from '../../components/editContactPop';

export const getServerSideProps = async ({
  req: {
    headers: { cookie },
  },
}) => {
  const { user_tk } = parseCookies(cookie);
  const { user } = JSON.parse(user_tk);
  return { props: { user } };
};
const OportunitiesAllFilter = ({ user }) => {
  // const router = useRouter();
  const { userid: id } = user;
  const { isOnZoomImg, imgToZoom } = useSelector((state) => state.zoomImgState);
  const [showBar, setShowBar] = useState(false);
  const [showSection, setShowSection] = useState('all');
  const [allOpportunities, setAllOpportunities] = useState([]);
  const [recentContacts, setRecentsContacts] = useState([]);
  const [oppIsSelected, setOppIsSelected] = useState(false);
  const [sorting, setSorting] = useState('DESC');
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [showEditContact, setShowEditContact] = useState(false);
  const [refreshContacts, setRefreshContacts] = useState(false);
  const [idContactSelected, setIdContactSelected] = useState('');


  const toggleShowBar = () => {
    setShowBar(!showBar);
  };

  const { openPopUpOportunity } = useSelector(
    (state) => state.popUpOportunityState
  );

  const getAllOpportunities = async () => {
    const response = await fetch('/api/opportunities', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        idProject: '',
        idClient: '',
        sorting,
      }),
    });

    const opportunitiesResponse = await response.json();
    console.log('dentro de opotunidades:', opportunitiesResponse);
    setAllOpportunities((prevState) => [...opportunitiesResponse]);
  };

  const getRecentsContacts = async () => {
    const response = await fetch('/api/recentsContacts', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, idclient: '' }),
    });

    const recentsContacts = await response.json();
    console.log('Contactos en oportunidades:', recentsContacts);
    setRecentsContacts(recentsContacts);
  };

  // const getUnitSelected = async (idProperty, projectId) => {
  //   const response = await fetch('/api/units', {
  //     method: 'post',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       id,
  //       projectId,
  //     }),
  //   });

  //   const units = await response.json();
  //   console.log('Unidades:', units);

  //   const unitSelected = units.find((unit) => unit.idProperty === idProperty);

  //   console.log('Unidad seleccionada:', unitSelected);

  //   dispatch(changeUnitSelected(unitSelected));
  // };

  useEffect(() => {
    // if (!getSessionToken()) {
    //   router.push('/login');
    //   getRecentsContacts();
    //   return;
    // }
    getAllOpportunities();
    getRecentsContacts();
  }, [sorting]);

  useEffect(() => {
    // if (refreshFlag) {
    //   setRefreshFlag(false);
    // }
    getAllOpportunities();
    console.log('reset');
  }, [refreshFlag]);

  return (
    <>
      <div className={styles['top-content-buttonsBar']}>
        <div className="container flex j-s a-c">
          <div className={styles['top-buttons-container']}>
            <div className={styles['top-content-container']}>
              <button
                className={styles['top-content-buttons']}
                onClick={() => setShowSection('all')}>
                TODAS
              </button>
              <div
                className={`${styles['top-content-bar']} ${
                  showSection === 'all' && styles.active
                }`}></div>
            </div>
            {/*
            <div className={styles['top-content-container']}>
              <button
                className={styles['top-content-buttons']}
                onClick={() => setShowSection('pending')}>
                PENDIENTES
              </button>
              <div
                className={`${styles['top-content-bar']} ${
                  showSection === 'pending' && styles.active
                }`}></div>
            </div>
              */}
            <div className={styles['top-content-container']}>
              <button
                className={styles['top-content-buttons']}
                onClick={() => setShowSection('closed')}>
                CERRADAS
              </button>
              <div
                className={`${styles['top-content-bar']} ${
                  showSection === 'closed' && styles.active
                }`}></div>
            </div>
          </div>
          {showSection === 'all' && (
            <div className={styles.filter_container}>
              <label htmlFor="sorting"></label>
              <select
                placeholder="Subject line"
                name="sorting"
                value={sorting}
                className={styles.filter_input}
                onChange={(e) => setSorting(e.target.value)}>
                <option value="HOT">MAS CALIENTE</option>
                <option value="COLD">MAS FRÍA</option>
                <option value="DESC" selected>
                  MAS RECIENTE
                </option>
                <option value="ASC">MENOS RECIENTE</option>
              </select>
              <span className={styles.label_filter}>Ordenar por:</span>
            </div>
          )}
        </div>
      </div>
      <section className={styles.main}>
        <div className="container flex j-sb a-s wrap">
          {showSection === 'all' && (
            <OportunitiesAll
              oppList={allOpportunities}
              setOppIsSelected={setOppIsSelected}
              refreshFlag={refreshFlag}
              setRefreshFlag={setRefreshFlag}
              id={id}
              setShowEditContact={setShowEditContact}
              setIdContactSelected={setIdContactSelected}
            />
          )}
          {/* showSection === 'pending' && (
            <OportunitiesPending oppList={allOpportunities} />
          )*/}
          {showSection === 'closed' && (
            <OportunitiesClosed
              oppList={allOpportunities}
              setOppIsSelected={setOppIsSelected}
              setSorting={setSorting}
              setRefreshFlag={setRefreshFlag}
              setShowEditContact={setShowEditContact}
              setIdContactSelected={setIdContactSelected}
            />
          )}
        </div>
      </section>

      {openPopUpOportunity && (
        <CreateOportunity created={true} recentContacts={recentContacts} />
      )}
      {isOnZoomImg && <ZoomImg imgToZoom={imgToZoom} />}
          <EditContactPop
          showEditContact={showEditContact}
          setShowEditContact={setShowEditContact}
          setRefreshContacts={setRefreshContacts}
          contactId={idContactSelected}
          />
    </>
  );
};

export default OportunitiesAllFilter;
