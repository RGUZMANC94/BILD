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
  const [pdfURL, setPdfURL] = useState(null);

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
    if (refreshFlag) {
      getAllOpportunities();
      setRefreshFlag(false);
    }

    console.log('reset');
  }, [refreshFlag]);

  return (
    <>
      <div className={`${styles['top-content-buttonsBar']} font-black bg-sub-header`}>
        <div className="container flex j-s a-c">
          <div className={styles['top-buttons-container']}>
            <div className={styles['top-content-container']}>
              <button
                className={`${styles['top-content-buttons']} font-black`}
                onClick={() => setShowSection('all')}>
                Todas
              </button>
              <div
                className={`${styles['top-content-bar']} ${
                  showSection === 'all' && styles.active
                }`}></div>
            </div>
            {/*
            <div className={styles['top-content-container']}>
              <button
                className={`${styles['top-content-buttons']} font-black`}
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
                className={`${styles['top-content-buttons']} font-black`}
                onClick={() => setShowSection('closed')}>
                Cerradas
              </button>
              <div
                className={`${styles['top-content-bar']} ${
                  showSection === 'closed' && styles.active
                }`}></div>
            </div>
          </div>

          <div className={styles.filter_container}>
            <label htmlFor="sorting"></label>
            <select
              placeholder="Subject line"
              name="sorting"
              value={sorting}
              className={`${styles.filter_input} border-input bg-transparent bg-[url(/images/arrow_select.png)] dark:bg-[url(/images/oportunities-card-down-arrow.svg)]`}
              onChange={(e) => setSorting(e.target.value)}>
              <option value="HOT">Mas caliente</option>
              <option value="COLD">Mas fría</option>
              <option value="DESC" selected>
                Mas reciente
              </option>
              <option value="ASC">Menos reciente</option>
            </select>
            <span className={`${styles.label_filter} font-black`}>Ordenar por:</span>
          </div>
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
              setPdfURL={setPdfURL}
              isClosed={false}
            />
          )}
          {/* showSection === 'pending' && (
            <OportunitiesPending oppList={allOpportunities} />
          )*/}
          {showSection === 'closed' && (
            <OportunitiesAll
              oppList={allOpportunities}
              setOppIsSelected={setOppIsSelected}
              refreshFlag={refreshFlag}
              setRefreshFlag={setRefreshFlag}
              id={id}
              setShowEditContact={setShowEditContact}
              setIdContactSelected={setIdContactSelected}
              setPdfURL={setPdfURL}
              isClosed={true}
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
        setRefreshContacts={setRefreshFlag}
        contactId={idContactSelected}
      />
      {pdfURL && (
        <div className={styles['iframe-popup']}>
          <div className={styles['iframe-popup-content']}>
            <button
              onClick={() => setPdfURL(null)}
              className={styles['iframe-close']}
            />
            <iframe src={pdfURL} width="100%" height="100%" frameBorder="0" />
          </div>
        </div>
      )}
    </>
  );
};

export default OportunitiesAllFilter;
