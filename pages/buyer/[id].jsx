import Link from 'next/link';
import styles from './styles.module.css';
import SideInfoProfile from '../../components/sideInfoProfile';
import RightSideProfile from '../../components/rightSideInfoProfile';

const BuyerProfile = () => {
  return (
    <div className={styles.perfil}>
      <Link
          href="/contacts"
          className={`${styles.closeContactSide} bg-ct`}></Link>
      <SideInfoProfile typeViewer={'buyer'} />
      <div className={styles.pendientes}>
        <Link
          href="/contacts"
          className={`${styles.closeContact} bg-ct`}></Link>
        <RightSideProfile typeViewer={'buyer'} />
      </div>
    </div>
  );
};

export default BuyerProfile;
