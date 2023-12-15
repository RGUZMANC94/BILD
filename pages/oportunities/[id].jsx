import Link from 'next/link';
import CreateOportunity from '../../components/createOportunity';
import OportunitiesContact from '../../components/oportunitiesContact';
import styles from './styles.module.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const Oprtunities = () => {
  const dispatch = useDispatch();
  const { openPopUpOportunity } = useSelector(
    (state) => state.popUpOportunityState
  );
  return (
    <>
      <div className={styles['top-content']}>
        <div className="container flex j-s a-c">
          <Link href={'/buyer/1'} className={`bg-ct ${styles.icon}`}></Link>
          <div className={styles.title}>Oportunidades de John Lennon </div>
        </div>
      </div>
      <section className={styles.main}>
        <div className="container flex j-sb a-s wrap">
          <OportunitiesContact userId={1} />
        </div>
      </section>
      {openPopUpOportunity && <CreateOportunity created={true} />}
    </>
  );
};

export default Oprtunities;
