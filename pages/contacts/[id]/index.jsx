import Link from 'next/link';
import styles from './styles.module.css';
import SideInfoProfile from '../../../components/sideInfoProfile';
import RightSideProfile from '../../../components/rightSideInfoProfile';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
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
        user,
      },
    };
  } catch (error) {
    return {
      props: {
        error: 'Error in request',
        user,
      },
    };
  }
};

const BuyerProfile = ({ contacts, user }) => {
  const router = useRouter();
  const { userid: id } = user;
  const [recentContacts, setRecentsContacts] = useState(
    contacts.filter((res) => res.idCli === router.query.id)
  );
  const [showEditContact, setShowEditContact] = useState(false);
  const [refreshContacts, setRefreshContacts] = useState(false);
  const [contactInfo, setContactInfo] = useState(recentContacts[0]);

  const getContact = async () => {
    const response = await fetch('/api/getContactInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        idclient: router.query.id,
      }),
    });
    const responseContact = await response.json();

    setContactInfo(responseContact[0]);
    console.log('respuesta contacto: ', responseContact[0]);
  };

  useEffect(() => {
    if (refreshContacts) {
      setRefreshContacts(false);
    }
    getContact();
  }, [refreshContacts]);

  console.log('contactInfo de eprfil: ', contactInfo);

  return (
    <>
       <div className={`${styles['top-content']} bg-sub-header`}>
        <div className="container flex j-s a-c">
          <Link
            href={'/contacts'}
            className={`bg-ct ${styles.icon} bg-[url(/images/light/back.png)] dark:bg-[url(/images/back.svg)]`}></Link>
          <div className={`${styles.title} title-card `}> {`Perfil de ${contactInfo.firstNames} ${contactInfo.lastNames}`} </div>
          <button
                    className={'editProjectDetailState'}
                    onClick={() => {
                      setShowEditContact(true);
                    }}
          />
        </div>
      </div>
      <div className={styles.perfil}>
        {/*
        <Link
          href="/contacts"
          className={`${styles.closeContactSide} bg-ct`}>
        </Link>
        */}
        <SideInfoProfile
          contactInfo={contactInfo}
          typeViewer={'buyer'}
          setShowEditContact={setShowEditContact}
        />
        <div className={styles.pendientes}>
          {/*
          <Link
            href="/contacts"
            className={`${styles.closeContact} bg-ct bg-[url(/images/close.svg)] dark:bg-[url(/images/close-white.svg)]`}></Link>
          */}
          <RightSideProfile contactInfo={contactInfo} typeViewer={'buyer'} />
        </div>
      </div>
      <EditContactPop
        showEditContact={showEditContact}
        setShowEditContact={setShowEditContact}
        setRefreshContacts={setRefreshContacts}
        contactId={router.query.id}
      />
    </>
  );
};
export default BuyerProfile;
