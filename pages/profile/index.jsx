import React from 'react';
import styles from '../../styles/Profile.module.css';
import SideInfoProfile from '../../components/sideInfoProfile';
import RightSideProfile from '../../components/rightSideInfoProfile';
// import { useSelector } from 'react-redux';
import ProfileOptions from '../../components/profileAdmin';
import { parseCookies } from '../../utils/parseCookies';

export const getServerSideProps = async ({
  req: {
    headers: { cookie },
  },
}) => {
  if (cookie) {
    const { user } = parseCookies(cookie);
    return { props: { user: JSON.parse(user) } };
  }

  return {
    redirect: {
      permanent: false,
      destination: '/login',
    },
    props: {},
  };
};

const Profile = ({ user }) => {
  const { rol } = user;
  // const { user_rol } = useSelector((state) => state.userState);
  return (
    <div className={styles.perfil}>
      <div className="container">
        {rol === 'ADMIN' && <ProfileOptions />}

        {rol !== 'ADMIN' && (
          <>
            <SideInfoProfile typeViewer={'adviser'} />
            <div className={styles.pendientes}>
              <RightSideProfile typeViewer={'adviser'} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
