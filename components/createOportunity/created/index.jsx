import { useEffect, useState } from 'react';
import styles from './created.module.css';
import EventsOportunity from '../eventsOportunity';
import GenerateQuote from '../generateQuote';
import { useDispatch, useSelector } from 'react-redux';
import { closePopUp } from '../../../redux/popUpOportunity';
import { openZoomImg } from '../../../redux/zoomImg';

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
  const [showDeletedPop, setShowDeletedPop] = useState(false);
  const { projectsList } = useSelector((state) => state.projectState);
  const { opportunitySelected } = useSelector(
    (state) => state.opportunityState
  );
  const dispatch = useDispatch();

  /* useEffect(() => {
    document
        .querySelector(`.${styles.popSuccessCreated}`)
        .classList.add(styles.activePopUp);

        setTimeout(() => {
          document
            .querySelector(`.${styles.popSuccessCreated}`)
            .classList.remove(styles.activePopUp);
        }, 2000);
  }, []);*/

  const deleteOpportunity = async () => {
    setShowDeletedPop(true);
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
        document
          .querySelector(`.${styles.popError}`)
          .classList.add(styles.activePopUp);

        setTimeout(() => {
          document
            .querySelector(`.${styles.popError}`)
            .classList.remove(styles.activePopUp);
        }, 2000);
        throw new Error('Failed to delete opportunity');
      }

      document
        .querySelector(`.${styles.popSuccessCreated}`)
        .classList.add(styles.activePopUp);

      setTimeout(() => {
        document
          .querySelector(`.${styles.popSuccessCreated}`)
          .classList.remove(styles.activePopUp);
        setShowPopEvents(false);
        setShowPopUp(false); // primero
        setIsConnected(false);
        setIsCreated(false); // ultimo
        dispatch(closePopUp(false));
      }, 2000);
    } catch (error) {
      console.error('Error al eliminar la oportunidad:', error);
    }
    setShowDeletedPop(false);
  };

  const activeZoomImg = (e, imgToZoom) => {
    e.stopPropagation();
    dispatch(openZoomImg(imgToZoom));
  };

  return (
    <>
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
                  <div
                    className={styles['img-tipo-glass']}
                    onClick={(e) => {
                      activeZoomImg(e, '/images/crear-tipo.png');
                    }}></div>
                </div>
                <div className={styles['tipo-info']}>
                  <div className={styles.tipos}>
                    <span>{`TIPO ${unit.type} - ${unit.idProperty}`}</span>
                  </div>
                  <span className={styles.valor}>{`$ ${parseInt(
                    unit.propertyPrice
                  ).toLocaleString('es-ES')}`}</span>
                  <div className={styles.detalles}>
                    <div className={styles['details-group']}>
                      <img src="/images/cards/bed.svg" />
                      <span>{`${unit.bedrooms}`}</span>
                    </div>
                    -
                    <div className={styles['details-group']}>
                      <img src="/images/cards/bath.svg" />
                      <span>{`${unit.baths}`}</span>
                    </div>
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
      <div className={`${styles.popSuccessCreated}`}>
        <div className={styles.bgPopUp}></div>
        <div className={styles.popup2}>
          <div className={styles.content}>
            <div className={styles['icon-box']}>
              <img src="/images/check-circle.png" />
              <span className={styles['pop-text']}>
                {showDeletedPop
                  ? '¡Tú oportunidad ha sido eliminada con éxito!'
                  : '¡Tú oportunidad ha sido creada con éxito!'}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.popError} `}>
        <div className={styles.bgPopUp}></div>
        <div className={styles.popup3}>
          <div className={styles.content}>
            <div className={styles['icon-box']}>
              <img src="/images/error-circle.png" />
              <span className={styles['pop-text']}>
                <span className={styles['pop-text-bold']}>¡Oops!</span>{' '}
                {showDeletedPop
                  ? 'Algo no está bien. Tú oportunidad no ha podido ser iliminaad con éxito'
                  : 'Algo no está bien. Por favor, revisa los datos ingresados e inténtalo de nuevo.'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OportunityCreated;
