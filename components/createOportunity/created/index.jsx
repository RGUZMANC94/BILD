import { useEffect, useState } from 'react';
import styles from './created.module.css';
import EventsOportunity from '../eventsOportunity';
import GenerateQuote from '../generateQuote';
import { useDispatch, useSelector } from 'react-redux';
import { closePopUp } from '../../../redux/popUpOportunity';
import { openZoomImg } from '../../../redux/zoomImg';
import Portal from '../../../HOC/portal';
import SuccessPopUp from '../../successPopUp';
import ErrorPopUp from '../../errorPopUp';

const OportunityCreated = ({
  showPopEvents,
  setShowPopEvents,
  generateQuote,
  setGenerateQuote,
  setIsCreated,
  setShowPopUp,
  setIsConnected,
  unit,
  refreshFlag,
  setRefreshFlag,
}) => {
  const { id } = useSelector((state) => state.userState);
  const [showCreatedPop, setShowCreatedPop] = useState(false);
  const [showDeletedPop, setShowDeletedPop] = useState(false);
  const { projectsList } = useSelector((state) => state.projectState);
  const { opportunitySelected } = useSelector(
    (state) => state.opportunityState
  );
  const dispatch = useDispatch();
  const [successPopUp, setSuccessPopUp] = useState(0);

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
          id,
        }),
      });
      console.log('respuesta de eleiminacion', oppCreated);
      const responseData = await oppCreated.json();

      if (!oppCreated.ok) {
        setSuccessPopUp((preState) => 1);

        setTimeout(() => {
          setTimeout(() => {
            setSuccessPopUp((preState) => 0);
          }, 1000);
        }, 2000);
        throw new Error('Failed to delete opportunity');
      }

      setSuccessPopUp((preState) => 2);

      setTimeout(() => {
        setTimeout(() => {
          setSuccessPopUp((preState) => 0);
        }, 1000);
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
        <div className={`${styles.crear} bg-blur`}>
          <div className={styles['left-side']}>
            <div className={styles['crear-tipo']}>
              <div className={styles['creacion-title']}>
                <span className={`${styles['tipo-title']} font-black`}>
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
                <div className={`${styles['tipo-info']}`}>
                  <div className={`${styles.tipos} font-black`}>
                    <span>{`TIPO ${unit.type} - ${unit.idProperty}`}</span>
                  </div>
                  <span className={styles.valor}>{`$ ${parseInt(
                    unit.propertyPrice
                  ).toLocaleString('es-ES')}`}</span>
                  <div className={styles.detalles}>
                    <div className={`${styles['details-group']} font-bold`}>
                      <img src="/images/cards/bed.svg" />
                      <span>{`${unit.bedrooms}`}</span>
                    </div>
                    -
                    <div className={`${styles['details-group']} font-bold`}>
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
                    className={`${styles['contacto-existente']}`}
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
                refreshFlag={refreshFlag}
                setRefreshFlag={setRefreshFlag}
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
      <Portal>
        {successPopUp === 1 && (
          <SuccessPopUp
            message={'¡Tú contacto ha sido creado con éxito!'}></SuccessPopUp>
        )}
        {successPopUp === 2 && (
          <ErrorPopUp errorMessage={'Algo no está bien. Por favor, revisa los datos ingresados e inténtalo de nuevo.' }></ErrorPopUp>
        )}
      </Portal>
    </>
  );
};

export default OportunityCreated;
