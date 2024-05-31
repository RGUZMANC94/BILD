import styles from '../../styles/Profile.module.css';
import SideInfoProfile from '../../components/sideInfoProfile';
import RightSideProfile from '../../components/rightSideInfoProfile';
// import { useSelector } from 'react-redux';
// import { useRouter } from 'next/router';
// import { getSessionToken } from '../../utils/getSessionToken';
import { parseCookies } from '../../utils/parseCookies';

export const getServerSideProps = async ({
  req: {
    headers: { cookie },
  },
}) => {
  const { user } = parseCookies(cookie);
  console.log(user);
  return { props: { user: JSON.parse(user) } };
};

const Admin = ({ user }) => {
  // const { rol, id, name, email_address, last_name } = useSelector(
  //   (state) => state.userState
  // );
  console.log(user);
  const { rol, name, email, last_name } = user;
  // const router = useRouter();

  const userInfo = {
    name,
    lastname: last_name,
    email,
  };

  return (
    <div className={styles.perfil}>
      {rol === 'ADMIN' && (
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
