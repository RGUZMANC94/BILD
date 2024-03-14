import Link from 'next/link';
import styles from './styles.module.css';
import SideInfoProfile from '../../components/sideInfoProfile';
import RightSideProfile from '../../components/rightSideInfoProfile';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { parseCookies } from '../../utils/parseCookies';

export const getServerSideProps = async ({
  req: {
    headers: { cookie },
  },
}) => {
  const { userid } = parseCookies(cookie);
  try {
    const response = await fetch(
      `http://44.206.53.75/Sales-1.0/REST_Index.php/backend/GetRecentContacts?username=${userid}&page=1&rows=100`
    );
    if (!response.ok) {
      throw new Error('Bad response from server');
    }
    const contacts = await response.json();
    return {
      props: {
        contacts,
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

const BuyerProfile = ({ contacts }) => {
  // console.log(contacts);
  const router = useRouter();
  const [recentContacts, setRecentsContacts] = useState(
    contacts.filter((res) => res.idCli === router.query.id)
  );
  // const { id } = useSelector((state) => state.userState);

  // const getRecentsContacts = async () => {
  //   const response = await fetch('/api/recentsContacts', {
  //     method: 'post',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ id }),
  //   });

  //   console.log(response);
  //   const recentsContactsres = await response.json();
  //   console.log(recentsContactsres);

  //   setRecentsContacts(
  //     recentsContactsres.filter((res) => res.idCli === router.query.id)
  //   );
  // };

  // useEffect(() => {
  // if (!getSessionToken()) {
  //   router.push('/login');
  //   getRecentsContacts();
  //   return;
  // }
  // getRecentsContacts();
  // }, []);

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
