import styles from '../../styles/Profile.module.css';
import SideInfoProfile from '../../components/sideInfoProfile';
import RightSideProfile from '../../components/rightSideInfoProfile';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { getSessionToken } from '../../utils/getSessionToken';

const Admin = () => {
  const { user_rol, id, name, email_address, last_name } = useSelector(
    (state) => state.userState
  );
  const router = useRouter();

  const userInfo = {
    name,
    lastname: last_name,
    email: email_address,
  };

  return (
    <div className={styles.perfil}>
      {user_rol === 'ADMIN' && (
        <div className="container flex j-c a-s">
          <SideInfoProfile contactInfo={userInfo} typeViewer={'admin'} />
          <div className={styles.pendientes}>
            <RightSideProfile typeViewer={'admin'} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
