import { useEffect, useState } from 'react';
import styles from './created.module.css';
import EventsOportunity from '../eventsOportunity';
import GenerateQuote from '../generateQuote';
import { useSelector } from 'react-redux';
import { closePopUp } from '../../../redux/popUpOportunity';

const OportunityCreated = ({
  showPopEvents,
  setShowPopEvents,
  generateQuote,
  setGenerateQuote,
  setIsCreated,
  setShowPopUp,
  setIsConnected,
  unit,
}) => {
  const [showCreatedPop, setShowCreatedPop] = useState(false);
  const { projectsList } = useSelector((state) => state.projectState);
  const { opportunitySelected } = useSelector(
    (state) => state.opportunityState
  );

  useEffect(() => {
    setShowCreatedPop(true);
    setTimeout(() => {
      setShowCreatedPop(false);
    }, 4000);
  }, []);

  const deleteOpportunity = async () => {
    try {
      const oppCreated = await fetch('/api/deleteOpportunity', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          opportunitySelected,
        }),
      });
      console.log('respuesta de eleiminacion', oppCreated);
      const responseData = await oppCreated.json();

      if (!oppCreated.ok) {
        throw new Error('Failed to delete opportunity');
      }

      document
        .querySelector(`.${styles.popSuccessTypeCreated}`)
        .classList.add(styles.activePopUp);

      setTimeout(() => {
        document
          .querySelector(`.${styles.popSuccessTypeCreated}`)
          .classList.remove(styles.activePopUp);
        setShowPopUp(false);
        setIsCreated(false);
        setIsConnected(false);
      }, 2000);
    } catch (error) {
      console.error('Error al eliminar la oportunidad:', error);
    }
  };

  return (
    <div className={styles['wrap-crear']}>
      <div className={styles.crear}>
        <div className={styles['left-side']}>
          <div className={styles['crear-tipo']}>
            <div className={styles['creacion-title']}>
              <span className={styles['tipo-title']}>
                {
                  projectsList.find(
                    (objeto) => objeto.projectId === unit.projectId
                  ).projectName
                }
              </span>
            </div>
            <div className={styles['tipo-unit']}>
              <div className={styles['img-tipo']}>
                <a href="#">
                  <img src="/images/crear-tipo.png" />
                </a>
                <div className={styles['img-tipo-glass']}></div>
              </div>
              <div className={styles['tipo-info']}>
                <div className={styles.tipos}>
                  <span>{`TIPO ${unit.type} - ${unit.idProperty}`}</span>
                </div>
                <span className={styles.valor}>{`$${unit.propertyPrice}`}</span>
                <div className={styles.detalles}>
                  <img src="/images/cards/bed.svg" />
                  <span>{`${unit.bedrooms}`}</span>
                  <img src="/images/cards/bath.svg" />
                  <span>{`${unit.baths}`}</span>
                </div>
              </div>
              <div className={styles.add}></div>
            </div>
          </div>
          {!generateQuote && (
            <div className={styles.contacto}>
              <div className={styles.conecta}>
                <button
                  className={styles['contacto-existente']}
                  onClick={() => {
                    deleteOpportunity();
                  }}>
                  Eliminar Oportunidad
                </button>
                <button
                  className={styles['crear-cotizacion']}
                  onClick={() => {
                    setGenerateQuote(true);
                  }}>
                  Crear cotización
                </button>
              </div>
            </div>
          )}
        </div>
        <div className={styles['right-side']}>
          {generateQuote ? (
            <GenerateQuote setGenerateQuote={setGenerateQuote} />
          ) : (
            <EventsOportunity
              showPopEvents={showPopEvents}
              setShowPopEvents={setShowPopEvents}
            />
          )}
        </div>
      </div>
      <div
        className={`${styles.message} ${
          showCreatedPop ? styles.showMiniPop : ''
        }`}>
        <img src="/images/check.png" />
        <span>Tu oportunidad se creo satisfactoriamente</span>
      </div>
    </div>
  );
};

export default OportunityCreated;
