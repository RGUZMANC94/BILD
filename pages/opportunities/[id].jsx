import Link from 'next/link';
import CreateOportunity from '../../components/createOportunity';
import OportunitiesContact from '../../components/oportunitiesContact';
import styles from './styles.module.css';
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

export const getServerSideProps = async ({
  req: {
    headers: { cookie },
  },
  query: { id },
}) => {
  const { user } = parseCookies(cookie);
  try {
    const response = await fetch(
      `http://44.206.53.75/Sales-1.0/REST_Index.php/backend/GetSaleOp?idcli=${id}&idproject=&username=${
        JSON.parse(user).userid
      }&page=1&rows=100&sorting=DESC`
    );
    if (!response.ok) {
      throw new Error('Bad response from server');
    }
    const oportunities = await response.json();
    return {
      props: {
        oportunities,
        user: JSON.parse(user),
      },
    };
  } catch (error) {
    return {
      props: {
        error: 'Error in request',
      },
    };
  }
};

const Oportunities = ({ oportunities, user }) => {
  const { userid: id } = user;
  const router = useRouter();
  const dispatch = useDispatch();
  // const { id } = useSelector((state) => state.userState);
  const { isOnZoomImg, imgToZoom } = useSelector((state) => state.zoomImgState);
  const [allOpportunities, setAllOpportunities] = useState(oportunities);
  const [closeFlag, setCloseFlag] = useState(true);
  const [oppIsSelected, setOppIsSelected] = useState(false);
  const [sorting, setSorting] = useState('DESC');
  const [refreshFlag, setRefreshFlag] = useState(false);
  const { openPopUpOportunity } = useSelector(
    (state) => state.popUpOportunityState
  );
  // const { contactListSelected } = useSelector(
  //   (state) => state.contactOpportunityState
  // );

  if (closeFlag) {
    dispatch(closePopUp());
    setCloseFlag(false);
  }

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

    console.log('dentro de opotunidades id:', router.query.id);

    const opportunitiesResponse = await response.json();
    console.log('dentro de opotunidades id:', opportunitiesResponse);
    setAllOpportunities(opportunitiesResponse);
  };

  // useEffect(() => {
  //   getAllOpportunities();
  // }, []);

  useEffect(() => {
    // if (refreshFlag) {
    //   setRefreshFlag((prevState) => !prevState);
    // }
    if (refreshFlag) {
      getAllOpportunities();
    }
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
      <div className={styles['top-content']}>
        <div className="container flex j-s a-c">
          <Link
            href={`/buyer/${router.query.id}`}
            className={`bg-ct ${styles.icon}`}></Link>
          <div className={styles.title}>
            {`Oportunidades de ${contactInfo[0].firstNames} ${contactInfo[0].lastNames}`}{' '}
          </div>
        </div>
      </div>
      <section className={styles.main}>
        <div className="container flex j-sb a-s wrap">
          <OportunitiesContact
            oppList={allOpportunities}
            setOppIsSelected={setOppIsSelected}
            setRefreshFlag={setRefreshFlag}
            id={id}
          />
        </div>
      </section>
      {openPopUpOportunity && <CreateOportunity created={true} />}
      {isOnZoomImg && <ZoomImg imgToZoom={imgToZoom} />}
    </>
  );
};

export default Oportunities;
