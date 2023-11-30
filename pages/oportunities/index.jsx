import OportunitiesAll from '../../components/oportunitiesAll';
import OportunitiesPending from '../../components/oportunitiesPending';
import OportunitiesClosed from '../../components/oportunitiesClosed';
import styles from '../../styles/Oportunities-All.module.css';
import { useState } from 'react';

const OportunitiesAllFilter = () => {
  const [showBar, setShowBar] = useState(false);

  const [showSection, setShowSection] = useState('all');

  const toggleShowBar = () => {
    setShowBar(!showBar);
  };

  return (
    <>
      <div className={styles['top-content-buttonsBar']}>
        <div className="container flex j-s a-c">
          <div className={styles['top-content-container']}>
            <button
              className={styles['top-content-buttons']}
              onClick={() => setShowSection('all')}
            >
              TODAS
            </button>
            <div
              className={`${styles['top-content-bar']} ${styles.active}`}
            ></div>
          </div>
          <div className={styles['top-content-container']}>
            <button
              className={styles['top-content-buttons']}
              onClick={() => setShowSection('pending')}
            >
              PENDIENTES
            </button>
            <div className={styles['top-content-bar']}></div>
          </div>
          <div className={styles['top-content-container']}>
            <button
              className={styles['top-content-buttons']}
              onClick={() => setShowSection('closed')}
            >
              CERRADAS
            </button>
            <div className={styles['top-content-bar']}></div>
          </div>

          <div className={styles.filter_container}>
            <label htmlFor="subject"></label>
            <select
              placeholder="Subject line"
              name="subject"
              className={styles.filter_input}
            >
              <option disabled defaultValue={0} hidden selected></option>
              <option>MAS CALIENTE</option>
              <option>MAS FRÍA</option>
              <option>MAS RECIENTE</option>
              <option>MENOS RECIENTE</option>
            </select>
            <span className={styles.label_filter}>Ordenar por:</span>
          </div>
        </div>
      </div>
      <section className={styles.main}>
        <div className="container flex j-sb a-s wrap">
          {showSection === 'all' && <OportunitiesAll />}
          {showSection === 'pending' && <OportunitiesPending />}
          {showSection === 'closed' && <OportunitiesClosed />}
        </div>
      </section>
    </>
  );
};

export default OportunitiesAllFilter;
