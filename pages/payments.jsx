import Link from 'next/link';
import styles from '../styles/Payments.module.css';

const Payments = () => {
  return (
    <>
      <div className={styles['top-content']}>
        <div className="container flex j-s a-c">
          <Link href={'/contacts'} className={`bg-ct ${styles.icon}`}></Link>
          <div className={styles.title}>Pagos John Lennon </div>
        </div>
      </div>

      <div className={styles['pagos-section']}>
        <div className="container flex j-c a-s">
          <Link href="/payments/1" className={`wrap ${styles['pagos-box']}`}>
            <div className={styles['left-box']}>
              <span className={styles['box-title']}>Fontana Campestre</span>
              <span className={styles['box-subtitle']}>
                TIPO 2 - Apartamento 102
              </span>
            </div>
            <div className={styles['right-box']}>
              <div className={`bg-ct ${styles.icon}`}></div>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.innerProgressBar}>
                <div className={`${styles.iceCreamBar} bg-ct`}></div>
              </div>
            </div>
          </Link>
          <Link href="/payments/2" className={`wrap ${styles['pagos-box']}`}>
            <div className={styles['left-box']}>
              <span className={styles['box-title']}>FOntana Campestre</span>
              <span className={styles['box-subtitle']}>
                TIPO 2 - Apartamento 102
              </span>
            </div>
            <div className={styles['right-box']}>
              <div className={`bg-ct ${styles.icon}`}></div>
            </div>
            <div className={styles['line-filter']}></div>
            <div className={styles.progressBar}>
              <div className={styles.innerProgressBar}>
                <div className={`${styles.iceCreamBar} bg-ct`}></div>
              </div>
            </div>
          </Link>
          <Link href="/payments/3" className={`wrap ${styles['pagos-box']}`}>
            <div className={styles['left-box']}>
              <span className={styles['box-title']}>Fontana Campestre</span>
              <span className={styles['box-subtitle']}>
                TIPO 2 - Apartamento 102
              </span>
            </div>
            <div className={styles['right-box']}>
              <div className={`bg-ct ${styles.icon}`}></div>
            </div>
            <div className={styles['line-filter']}></div>
            <div className={styles.progressBar}>
              <div className={styles.innerProgressBar}>
                <div className={`${styles.iceCreamBar} bg-ct`}></div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Payments;
