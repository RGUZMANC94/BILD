import OportunitiesAll from '../../components/oportunitiesAll';
import OportunitiesPending from '../../components/oportunitiesPending';
import OportunitiesClosed from '../../components/oportunitiesClosed';
import styles from '../../styles/Oportunities-All.module.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CreateOportunity from '../../components/createOportunity';

const OportunitiesAllFilter = () => {
  const { id } = useSelector((state) => state.userState);
  const [showBar, setShowBar] = useState(false);

  const [showSection, setShowSection] = useState('all');

  const [recentContacts, setRecentsContacts] = useState({});

  const toggleShowBar = () => {
    setShowBar(!showBar);
  };

  const { openPopUpOportunity } = useSelector(
    (state) => state.popUpOportunityState
  );

  const getRecentsContacts = async () => {
    const response = await fetch('/api/recentsContacts', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    const recentsContacts = await response.json();
    console.log(recentsContacts);
    setRecentsContacts(recentsContacts);
  };

  return (
    <>
      <div className={styles['top-content-buttonsBar']}>
        <div className="container flex j-s a-c">
          <div className={styles['top-content-container']}>
            <button
              className={styles['top-content-buttons']}
              onClick={() => setShowSection('all')}>
              TODAS
            </button>
            <div
              className={`${styles['top-content-bar']} ${
                showSection === 'all' && styles.active
              }`}></div>
          </div>
          <div className={styles['top-content-container']}>
            <button
              className={styles['top-content-buttons']}
              onClick={() => setShowSection('pending')}>
              PENDIENTES
            </button>
            <div
              className={`${styles['top-content-bar']} ${
                showSection === 'pending' && styles.active
              }`}></div>
          </div>
          <div className={styles['top-content-container']}>
            <button
              className={styles['top-content-buttons']}
              onClick={() => setShowSection('closed')}>
              CERRADAS
            </button>
            <div
              className={`${styles['top-content-bar']} ${
                showSection === 'closed' && styles.active
              }`}></div>
          </div>

          <div className={styles.filter_container}>
            <label htmlFor="subject"></label>
            <select
              placeholder="Subject line"
              name="subject"
              className={styles.filter_input}>
              {/* <option disabled defaultValue={0} hidden selected>SELECCIONAR</option> */}
              <option>MAS CALIENTE</option>
              <option>MAS FRÍA</option>
              <option selected>MAS RECIENTE</option>
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

      {openPopUpOportunity && (
        <CreateOportunity created={false} recentContacts={recentContacts} />
      )}
    </>
  );
};

export default OportunitiesAllFilter;
