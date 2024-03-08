import Link from 'next/link';
import styles from './styles.module.css';
import SideInfoProfile from '../../components/sideInfoProfile';
import RightSideProfile from '../../components/rightSideInfoProfile';
import { useRouter } from 'next/router';
import { getSessionToken } from '../../utils/getSessionToken';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const BuyerProfile = () => {
  const router = useRouter();
  const [recentContacts, setRecentsContacts] = useState({});
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

    setRecentsContacts(
      recentsContactsres.filter((res) => res.idCli === router.query.id)
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
    <div className={styles.perfil}>
      <Link
        href="/contacts"
        className={`${styles.closeContactSide} bg-ct`}></Link>
      <SideInfoProfile contactInfo={recentContacts[0]} typeViewer={'buyer'} />
      <div className={styles.pendientes}>
        <Link
          href="/contacts"
          className={`${styles.closeContact} bg-ct`}></Link>
        <RightSideProfile
          contactInfo={recentContacts[0]}
          typeViewer={'buyer'}
        />
      </div>
    </div>
  );
};

export default BuyerProfile;
