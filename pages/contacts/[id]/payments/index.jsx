import Link from 'next/link';
import styles from '../../../../styles/Payments.module.css';
// import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { parseCookies } from '../../../../utils/parseCookies';

export const getServerSideProps = async ({
  req: {
    headers: { cookie },
  },
  query: { id },
}) => {
  const { user } = parseCookies(cookie);

  try {
    const response = await fetch(
      `http://44.206.53.75/Sales-1.0/REST_Index.php/backend/GetContact?idclient=${id}&username=${
        JSON.parse(user).userid
      }`
    );
    if (!response.ok) {
      throw new Error('Bad response from server');
    }
    const contact = await response.json();
    contact[0].idCli = id;

    return {
      props: {
        contact,
        user: JSON.parse(user),
        idClient: id,
      },
    };
  } catch (error) {
    return {
      props: {
        error,
      },
    };
  }
};

const Payments = ({ contact, user, idClient }) => {
  const { userid: id } = user;
  const contactListSelected = contact[0];

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
        idClient,
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
            }>{`Oportunidades de ${contactListSelected.firstNames} ${contactListSelected.lastNames}`}</div>
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
                    href={`/contacts/${idClient}/payments/${oportunity.idSaleOp}`}
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
