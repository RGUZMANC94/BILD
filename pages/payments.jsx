import Link from 'next/link';
import styles from '../styles/Payments.module.css';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const Payments = () => {
  const { id } = useSelector((state) => state.userState);
  const { contactListSelected } = useSelector(
    (state) => state.contactOpportunityState
  );

  const [allOpportunities, setAllOpportunities] = useState([]);

  const getClientOpportunities = async () => {
    const response = await fetch('/api/opportunities', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        idProject: '',
        idClient: contactListSelected.idCli,
        sorting: 'DESC',
      }),
    });

    const opportunitiesResponse = await response.json();
    console.log('dentro de opotunidades:', opportunitiesResponse);
    setAllOpportunities(opportunitiesResponse);
  };

  useEffect(() => {
    getClientOpportunities();
  }, []);

  console.log('Lista de oportunidades:', allOpportunities);

  return (
    <>
      <div className={styles['top-content']}>
        <div className="container flex j-s a-c">
          <Link
            href={`/buyer/${contactListSelected.idCli}`}
            className={`bg-ct ${styles.icon}`}></Link>
          <div
            className={
              styles.title
            }>{`Oportunidades de ${contactListSelected.name} ${contactListSelected.lastname}`}</div>
          <div className={styles['title-movil']}>Pagos</div>
        </div>
      </div>

      <div className={styles['pagos-section']}>
        <div className="container flex j-c a-s">
          <div className={styles['sub-title-movil']}>John Lennon </div>

          {allOpportunities && allOpportunities.length > 0 ? (
            allOpportunities.map(
              (oportunity, i) =>
                Object.keys(oportunity).length > 3 &&
                !(
                  oportunity.stageCycleSaleOp === 'Oportunidad' ||
                  oportunity.stageCycleSaleOp === 'Prospecto'
                ) &&
                oportunity.cycleSaleOp !== 'Cancelado' && (
                  <Link
                    href={`/payments/${oportunity.idSaleOp}`}
                    className={`wrap ${styles['pagos-box']}`}
                    key={i}>
                    <div className={styles['left-box']}>
                      <span
                        className={
                          styles['box-title']
                        }>{`${oportunity.nameProject}`}</span>
                      <span className={styles['box-subtitle']}>
                        {`TIPO ${oportunity.propertyType.propertyType} - ${oportunity.idProperty}`}
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
                )
            )
          ) : (
            <span></span>
          )}
        </div>
      </div>
    </>
  );
};

export default Payments;
