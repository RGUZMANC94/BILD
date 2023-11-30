import Link from 'next/link';
import CreateOportunity from '../../components/createOportunity';
import OportunitiesHistory from '../../components/oportunitiesHistory';
import { openPopUp } from '../../redux/popUpOportunity';
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
          <Link href={'/contacts'} className={`bg-ct ${styles.icon}`}></Link>
          <div className={styles.title}>Oportunidades de John Lennon </div>
        </div>
      </div>
      <section className={styles.main}>
        <div className="container">
          <div className={styles.oportunidades}>
            <div className={styles.tipo}>
              <div className={`${styles['tipo-unit']} ${styles.active}`}>
                <div className={styles['img-tipo']}>
                  <img src="/images/tipo-1.png" />
                  <div className={styles.zoom}></div>
                </div>
                <div className={styles['tipo-info']}>
                  <span className={styles['tipo-title']}>
                    Fontana Campestre
                  </span>
                  <span className={styles['tipo-sub']}>TIPO 1 - 302</span>
                  <div className={styles.detalles}>Seguimiento: 23/05/23</div>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.innerProgressBar}>
                    <div className={`${styles.iceCreamBar} bg-ct`}></div>
                  </div>
                </div>
                <div className={styles.back}></div>
              </div>
              <div className={styles['tipo-unit']}>
                <div className={styles['img-tipo']}>
                  <img src="/images/tipo-1.png" />
                  <div className={styles.zoom}></div>
                </div>
                <div className={styles['tipo-info']}>
                  <span className={styles['tipo-title']}>
                    Fontana Campestre
                  </span>
                  <span className={styles['tipo-sub']}>TIPO 1 - 302</span>
                  <div className={styles.detalles}>Seguimiento: 23/05/23</div>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.innerProgressBar}>
                    <div className={`${styles.iceCreamBar} bg-ct`}></div>
                  </div>
                </div>
                <div className={styles.back}></div>
              </div>
              <div className={styles['tipo-unit']}>
                <div className={styles['img-tipo']}>
                  <img src="/images/tipo-1.png" />
                  <div className={styles.zoom}></div>
                </div>
                <div className={styles['tipo-info']}>
                  <span className={styles['tipo-title']}>
                    Fontana Campestre
                  </span>
                  <span className={styles['tipo-sub']}>TIPO 1 - 302</span>
                  <div className={styles.detalles}>Seguimiento: 23/05/23</div>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.innerProgressBar}>
                    <div className={`${styles.iceCreamBar} bg-ct`}></div>
                  </div>
                </div>
                <div className={styles.back}></div>
              </div>
            </div>
            <div className={styles['wrap-right']}>
              <OportunitiesHistory></OportunitiesHistory>
            </div>
          </div>
        </div>
      </section>
      {openPopUpOportunity && <CreateOportunity created={true} />}
    </>
  );
};

export default Oprtunities;
