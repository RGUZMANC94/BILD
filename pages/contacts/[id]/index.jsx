import Link from 'next/link';
import styles from './styles.module.css';
import SideInfoProfile from '../../../components/sideInfoProfile';
import RightSideProfile from '../../../components/rightSideInfoProfile';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { parseCookies } from '../../../utils/parseCookies';
import EditContactPop from '../../../components/editContactPop';

export const getServerSideProps = async ({
  req: {
    headers: { cookie },
  },
}) => {
  const { user_tk } = parseCookies(cookie);
  const { user } = JSON.parse(user_tk);
  try {
    const response = await fetch(
      `http://44.206.53.75/Sales-1.0/REST_Index.php/backend/GetRecentContacts?username=${user.userid}&page=1&rows=100`
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
  const router = useRouter();
  const [recentContacts, setRecentsContacts] = useState(
    contacts.filter((res) => res.idCli === router.query.id)
  );
  const [showEditContact, setShowEditContact] = useState(false);
  const [refreshContacts, setRefreshContacts] = useState(false);

  console.log(recentContacts);

  return (
    <>
      <div className={styles.perfil}>
        <Link
          href="/contacts"
          className={`${styles.closeContactSide} bg-ct`}></Link>
        <SideInfoProfile 
          contactInfo={recentContacts[0]} 
          typeViewer={'buyer'} 
          setShowEditContact={setShowEditContact}
        />
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
      <EditContactPop
        showEditContact={showEditContact}
        setShowEditContact={setShowEditContact}
        setRefreshContacts={setRefreshContacts}
      />
    </>
    
  );
};
export default BuyerProfile;
