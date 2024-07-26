import Link from 'next/link';
import CreateOportunity from '../../components/createOportunity';
import OportunitiesContact from '../../components/oportunitiesContact';
import styles from '../../styles/Oportunities-All.module.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
// import { getSessionToken } from '../../utils/getSessionToken';
// import opportunities from '../api/opportunities';
import { closePopUp } from '../../redux/popUpOportunity';
import ZoomImg from '../../components/zoomImg';
import { parseCookies } from '../../utils/parseCookies';
import { useFetch } from '../../hooks/useFetch';
import Loader from '../../components/lodaer';
import EditContactPop from '../../components/editContactPop';
import OportunitiesAll from '../../components/oportunitiesAll';

export const getServerSideProps = async ({
  req: {
    headers: { cookie },
  },
}) => {
  const { user_tk } = parseCookies(cookie);
  const { user } = JSON.parse(user_tk);
  return { props: { user } };
};

const Oportunities = ({ user }) => {
  const { userid: id } = user;
  const router = useRouter();
  const dispatch = useDispatch();
  // const { id } = useSelector((state) => state.userState);
  const { isOnZoomImg, imgToZoom } = useSelector((state) => state.zoomImgState);
  const [allOpportunities, setAllOpportunities] = useState([]);
  const [closeFlag, setCloseFlag] = useState(true);
  const [oppIsSelected, setOppIsSelected] = useState(false);
  const [sorting, setSorting] = useState('DESC');
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [showEditContact, setShowEditContact] = useState(false);
  const [refreshContacts, setRefreshContacts] = useState(false);
  const [idContactSelected, setIdContactSelected] = useState('');
  const [pdfURL, setPdfURL] = useState(null);
  const [recentContacts, setRecentsContacts] = useState([]);
  // const { contactListSelected } = useSelector(
  //   (state) => state.contactOpportunityState
  // );

  if (closeFlag) {
    dispatch(closePopUp());
    setCloseFlag(false);
  }

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
        idClient: `${router.query.id}`,
        sorting: 'DESC',
      }),
    });

    const opportunitiesResponse = await response.json();
    setAllOpportunities((prevState) => [...opportunitiesResponse]);
  };

  console.log('allOpportunities:', allOpportunities);

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

  useEffect(() => {
    getAllOpportunities();
    getRecentsContacts();
  }, [sorting]);

  useEffect(() => {
    getAllOpportunities();
    console.log('reset');
  }, [refreshFlag]);

  const {
    data: contactInfo,
    isPending,
    error,
  } = useFetch({
    url: '/api/getContactInfo',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      idclient: router.query.id,
    }),
  });

  if (isPending || !contactInfo || contactInfo.length === 0 || error) {
    return <Loader />;
  }

  return (
    <>
      <div className={`${styles['top-content-buttonsBar']} bg-sub-header`}>
        <div className="container flex j-s a-c">
          <div className={styles['top-buttons-container']}>
            <div className={styles['top-content-container']}>
              <Link
                href={`/contacts/${router.query.id}`}
                className={`bg-[url(/images/light/back.png)] dark:bg-[url(/images/back-oportunity-icon.svg)] ${styles['top-content-backarrow']}`}></Link>
              <div
                className={`font-black ${styles['top-content-buttons']}`}>
                {`Oportunidades de ${contactInfo[0].firstNames} ${contactInfo[0].lastNames}`}{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className={styles.main}>
        <div className="container flex j-sb a-s wrap">
          <OportunitiesAll
            oppList={allOpportunities}
            setOppIsSelected={setOppIsSelected}
            refreshFlag={refreshFlag}
            setRefreshFlag={setRefreshFlag}
            id={id}
            setShowEditContact={setShowEditContact}
            setIdContactSelected={setIdContactSelected}
            setPdfURL={setPdfURL}
            isContact={true}
          />
        </div>
      </section>
      {openPopUpOportunity && <CreateOportunity created={true} />}
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

export default Oportunities;
