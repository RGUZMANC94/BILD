import Link from 'next/link';
import CreateOportunity from '../../components/createOportunity';
import OportunitiesContact from '../../components/oportunitiesContact';
import styles from './styles.module.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getSessionToken } from '../../utils/getSessionToken';
import opportunities from '../api/opportunities';
import { closePopUp } from '../../redux/popUpOportunity';


const Oportunities = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.userState);
  const [allOpportunities, setAllOpportunities] = useState([]);
  const [closeFlag, setCloseFlag] = useState(true);


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
      }),
    });

    console.log('dentro de opotunidades id:', router.query.id);

    const opportunitiesResponse = await response.json();
    console.log('dentro de opotunidades id:', opportunitiesResponse);
    setAllOpportunities(opportunitiesResponse);
  };

  useEffect(() => {
    if (!getSessionToken()) {
      router.push('/login');
      return;
    }
    getAllOpportunities();
  }, []);

  return (
    <>
      <div className={styles['top-content']}>
        <div className="container flex j-s a-c">
          <Link
            href={`/buyer/${router.query.id}`}
            className={`bg-ct ${styles.icon}`}></Link>
          <div className={styles.title}>Oportunidades de John Lennon </div>
        </div>
      </div>
      <section className={styles.main}>
        <div className="container flex j-sb a-s wrap">
          <OportunitiesContact oppList={allOpportunities} />
        </div>
      </section>
      {openPopUpOportunity && <CreateOportunity created={true} />}
    </>
  );
};

export default Oportunities;
