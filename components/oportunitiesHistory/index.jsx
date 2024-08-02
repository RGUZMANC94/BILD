import { useState, useEffect, useCallback, useContext } from 'react';
import { openPopUp } from '../../redux/popUpOportunity';
import styles from './oportunities-history.module.css';
import Button from '../button';
import { useDispatch, useSelector } from 'react-redux';
import SquareInput from '../squareInput';
import { useRouter } from 'next/router';
import Portal from '../../HOC/portal';
import GenerateQuote from '../createOportunity/generateQuote';
import BackgroundPopUp from '../backgroundPopUp';
import AddEvents from '../createOportunity/addEvents';
import BildContext from '../context/index';
import SuccessPopUp from '../successPopUp';
import ErrorPopUp from '../errorPopUp';

const OportunitiesHistory = ({
  opportunitySelected,
  oppSelectedObject,
  setRefreshFlag,
  refreshFlag,
  setSelectedItemOpp,
  setOppIsSelected,
  id,
  setShowEditContact,
  setPdfURL,
  prePriceInfo,
  setHardRefreshFlag,
}) => {
  console.log('ID oportinidad enviada', opportunitySelected);
  const dispatch = useDispatch();
  const { initialState } = useContext(BildContext);
  const { user } = initialState;
  const { rol: user_rol } = user;
  const { quicksand } = useContext(BildContext);
  // const { id } = useSelector((state) => state.userState);
  const { unitSelected } = useSelector((state) => state.unitState);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [generateQuote, setGenerateQuote] = useState(false);
  const [addEvents, setAddEvents] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isOpportunityDeleted, setIsOpportunityDeleted] = useState(0);
  const [animateCloseGenerateQuote, setAnimateCloseGenerateQuote] =
    useState(false);
  console.log(quicksand);
  const [allEvents, setAllEvents] = useState([
    {
      id: '1',
      status: 'pending',
      date: '24/01/23',
      title: 'Pendiente 4',
      detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      hour: '11:07 am',
    },
    {
      id: '2',
      status: 'approved',
      date: '25/01/23',
      title: 'Aprobado 2',
      detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      hour: '11:07 am',
    },
    {
      id: '3',
      status: 'rejected',
      date: '26/01/23',
      title: 'Rechazado 3',
      detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      hour: '11:07 am',
    },
    {
      id: '4',
      status: 'inprogress',
      date: '27/01/23',
      title: 'En progreso 1',
      detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      hour: '11:07 am',
    },
  ]);

  const [firstEvent, setFirstEvent] = useState({});
  const [eventsSelected, setEventsSelected] = useState([]);
  const [lastEvent, setLastEvent] = useState({});
  const [idPortafolio, setIdPortafolio] = useState('');
  const [refreshEvents, setRefreshEvents] = useState(false);
  const [successPopUp, setSuccessPopUp] = useState(0);

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  const getEventsSelected = useCallback(async () => {
    const response = await fetch('/api/events', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        idsaleop: opportunitySelected,
        idclient: '',
      }),
    });
    console.log('Eventos:', response);

    const events = await response.json();
    console.log('Eventos format:', events);

    const filteredEvents =
      events && events.length > 0
        ? events.filter((event) => Object.keys(event).length >= 3).reverse()
        : [];
    console.log('Eventos filtrados:', filteredEvents);

    updateEventsBox(filteredEvents);
  }, [opportunitySelected, refreshEvents]);

  const updateEventsBox = (filteredEvents) => {
    if (filteredEvents.length > 0 && filteredEvents.length < 3) {
      setFirstEvent(filteredEvents[0]);
      setLastEvent(filteredEvents[1] ?? {});
      setEventsSelected([]);
      return;
    }
    if (filteredEvents.length > 2) {
      const [firstEvent, ...remainingEvents] = filteredEvents;
      setFirstEvent(firstEvent);
      const lastEvent = remainingEvents[remainingEvents.length - 1];
      setEventsSelected(filteredEvents.slice(1, -1));
      setLastEvent(lastEvent);
      return;
    }
    setFirstEvent({});
    setLastEvent({});
    setEventsSelected([]);
  };

  useEffect(() => {
    if (opportunitySelected !== -1 && opportunitySelected) {
      getEventsSelected();
    }
  }, [opportunitySelected, refreshEvents, refreshFlag]);

  const handleEventClick = (e) => {
    console.log('Evento :', e);
    changeOpportunity(e);
  };

  console.log('ID oportinidad enviada', opportunitySelected);
  console.log('Oportinidad Objeto', oppSelectedObject);
  console.log('Primer evento', firstEvent);
  console.log('eventos ya en:', eventsSelected);
  console.log('Ultimo evento', lastEvent);

  const changeOpportunity = async (idopp) => {
    const datos = {
      cycleSale: '1',
      stageSale: '3',
      idAdviser: '',
      iddpf: idopp,
    };
    console.log('datos:', datos);

    try {
      const oppUpdated = await fetch('/api/editOpportunity', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          idopt: opportunitySelected,
          datos,
        }),
      });

      console.log('Tipo creado: ', oppUpdated);

      if (!oppUpdated.ok) {
        throw new Error('Failed to update opportunity');
      }

      const responseData = await oppUpdated.json();

      console.log('Opportunity updated:', responseData);

      setSuccessPopUp((preState) => 1);

      setTimeout(() => {
        // getEventsSelected();
        // setRefreshEvents((prevState) => !prevState);

        setRefreshFlag(true);
        setTimeout(() => {
          setSuccessPopUp((preState) => 0);
        }, 1000);
      }, 4000);
    } catch (error) {
      setSuccessPopUp((preState) => 2);

      setTimeout(() => {
        setTimeout(() => {
          setSuccessPopUp((preState) => 0);
        }, 1000);
      }, 2000);
      console.error('Error al crear el proyecto:', error);
    }
  };

  const deleteOpportunity = async () => {
    // setShowDeletedPop(true);
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
      console.log('respuesta de eliminacion', oppCreated);
      const responseData = await oppCreated.json();

      if (!oppCreated.ok) {
        throw new Error('Failed to delete opportunity');
      }
      setIsOpportunityDeleted((prevState) => 1);
      setTimeout(() => {
        setRefreshFlag((prevState) => !prevState);
        setHardRefreshFlag((prevState) => !prevState);
        setIsOpportunityDeleted((prevState) => 0);
      }, 5000);
    } catch (error) {
      setErrorMessage((prevState) => error);
      setIsOpportunityDeleted((prevState) => 2);
      setTimeout(() => {
        setIsOpportunityDeleted((prevState) => 0);
      }, 2500);
      console.error('Error al eliminar la oportunidad:', error);
    }
    // setShowDeletedPop(false);
  };

  const openPopUpQuote = () => {
    setGenerateQuote((prevState) => true);
  };

  const closePopUpQuote = useCallback(() => {
    setGenerateQuote((prevState) => false);
  }, []);
  const animateClosePopUpQuote = useCallback(() => {
    setAnimateCloseGenerateQuote((prevState) => true);
    setTimeout(() => {
      setAnimateCloseGenerateQuote((prevState) => false);
    }, 350);
  }, []);

  return (
    <>
      <>
        <div className={styles.right}>
          <div className={styles.line}>
            <img src="/images/Ellipse 81.png" />
            <div
              className={`${styles['ver-line']} border-r-[1px] border-solid border-light-3`}></div>
          </div>

          <div className={styles.pendientes}>
            {oppSelectedObject && Object.keys(oppSelectedObject).length > 0 && (
              <div className={styles['pendiente-top']}>
                <span className={`${styles['tipo-sub']} font-black`}>
                  {oppSelectedObject.nameCustomer}
                </span>
                <ul className={styles.ulNode}>
                  <li>{oppSelectedObject.nameProject}</li>
                  <li>{`Tipo ${oppSelectedObject.propertyType.propertyType} : ${oppSelectedObject.idProperty}`}</li>
                </ul>
                {user_rol === 'ADMIN' && (
                  <button
                    type="button"
                    className={`${styles.editar}`}
                    onClick={() => setShowEditContact(true)}
                  />
                )}
              </div>
            )}

            <div className={`flex j-sb a-c ${styles.containerButtonsEvents}`}>
              <Button
                buttonType={'secondary'}
                iconImage={false}
                label={'Crear cotización'}
                inheritClass={styles.buttonEventHistory}
                clickFunction={openPopUpQuote}></Button>
              <Button
                buttonType={'primary'}
                iconImage={false}
                label={'Agregar evento'}
                inheritClass={styles.buttonEventHistory}
                clickFunction={() => {
                  setAddEvents((prevState) => true);
                }}></Button>
            </div>

            {Object.keys(firstEvent).length > 0 && (
              <div className={`bg-card ${styles.greybox}`}>
                <div className={styles.info}>
                  <div>
                    {
                      // cambio scope
                      /* <SquareInput onChangeFunct={handleEventClick} />*/
                    }

                    <span className={styles['pendiente-date']}>
                      {firstEvent.expirationDateTime.split(' ')[0]}
                    </span>
                  </div>
                  <ul>
                    {firstEvent.title && (
                      <li className={styles['pendiente-list']}>
                        <b>{firstEvent.title}</b>
                      </li>
                    )}
                    <li>{firstEvent.activity}</li>
                  </ul>
                </div>
                <div className={styles.time}>
                  <span className={styles.hour}>
                    {firstEvent.expirationDateTime.split(' ')[1]}
                  </span>
                  <div className={styles.buttonsSec}>
                    {firstEvent.PricePdf && firstEvent.PricePdf.length > 0 && (
                      <Button
                        buttonType={'primary'}
                        iconImage={false}
                        label={'PDF'}
                        inheritClass={styles.buttonQuote}
                        clickFunction={() => {
                          setPdfURL(firstEvent.PricePdf[0].url);
                          console.log('PDF:', firstEvent.PricePdf[0].url);
                        }}
                      />
                    )}
                    {firstEvent.additionalInformation !== '' &&
                      firstEvent.additionalInformation !== '0' &&
                      (firstEvent.cycleSaleOp === '1' &&
                      firstEvent.stageCycleSaleOp === '2' ? (
                        <div>
                          <Button
                            buttonType={'primary'}
                            iconImage={false}
                            label={'Aceptar'}
                            inheritClass={styles.buttonQuote}
                            clickFunction={() =>
                              handleEventClick(firstEvent.additionalInformation)
                            }
                          />
                        </div>
                      ) : (
                        <div>
                          <Button
                            iconImage={false}
                            label={'Aceptada'}
                            inheritClass={styles.buttonQuoteAcepted}
                          />
                        </div>
                      ))}
                  </div>
                </div>
                <div
                  className={`${styles['blue-point']} bg-light-3 dark:bg-light-1`}></div>
              </div>
            )}

            {eventsSelected.length > 0 && (
              <div
                className={`dotted-lines ${styles['box-dotted']} ${
                  showAllEvents ? styles.active : ''
                } relative`}>
                <div
                  className={`point-dotted ${styles['blue-point-plus']}`}
                  onClick={() => setShowAllEvents(true)}>
                  {eventsSelected.length}+
                </div>
                <div className={styles.innerDottedContainer}>
                  {eventsSelected.reverse().map(
                    (eventItem, i) =>
                      Object.keys(eventItem).length > 3 && (
                        <div
                          className={`bg-card ${styles.greybox}`}
                          key={eventItem.id}>
                          <div className={styles.info}>
                            <div>
                              {
                                // cambio scope
                                /* {eventItem.status === 'PE' && (
                                <>
                                  <SquareInput onChangeFunct={handleEventClick} />
                                </>
                              )} />*/
                              }

                              <span className={styles['pendiente-date']}>
                                {eventItem.expirationDateTime.split(' ')[0]}
                              </span>
                            </div>
                            <ul>
                              {eventItem.title && (
                                <li className={styles['pendiente-list']}>
                                  <b>{eventItem.title}</b>
                                </li>
                              )}
                              <li>{eventItem.activity}</li>
                            </ul>
                          </div>

                          <div className={styles.time}>
                            <span className={styles.hour}>
                              {eventItem.expirationDateTime.split(' ')[1]}
                            </span>

                            <div className={styles.buttonsSec}>
                              {eventItem.PricePdf &&
                                eventItem.PricePdf.length > 0 && (
                                  <Button
                                    buttonType={'primary'}
                                    iconImage={false}
                                    label={'PDF'}
                                    inheritClass={styles.buttonQuote}
                                    clickFunction={() => {
                                      setPdfURL(eventItem.PricePdf[0].url);
                                      console.log(
                                        'PDF:',
                                        eventItem.PricePdf[0].url
                                      );
                                    }}
                                  />
                                )}

                              {eventItem.additionalInformation !== '' &&
                                eventItem.additionalInformation !== '0' &&
                                (eventItem.cycleSaleOp === '1' &&
                                eventItem.stageCycleSaleOp === '2' ? (
                                  <div>
                                    <Button
                                      buttonType={'primary'}
                                      iconImage={false}
                                      label={'Aceptar'}
                                      inheritClass={styles.buttonQuote}
                                      clickFunction={() =>
                                        handleEventClick(
                                          eventItem.additionalInformation
                                        )
                                      }
                                    />
                                  </div>
                                ) : (
                                  <div>
                                    <Button
                                      iconImage={false}
                                      label={'Aceptada'}
                                      inheritClass={styles.buttonQuoteAcepted}
                                    />
                                  </div>
                                ))}
                            </div>
                          </div>

                          <div
                            className={`${styles['blue-point']} bg-light-3 dark:bg-light-1`}></div>
                        </div>
                      )
                  )}
                </div>
              </div>
            )}

            {Object.keys(lastEvent).length > 0 && (
              <div className={`bg-card ${styles.greybox}`}>
                <div className={styles.info}>
                  <div>
                    {
                      // cambio scope
                      /* <SquareInput onChangeFunct={handleEventClick} />*/
                    }

                    <span className={styles['pendiente-date']}>
                      {lastEvent.expirationDateTime.split(' ')[0]}
                    </span>
                  </div>
                  <ul>
                    <li className={styles['pendiente-list']}>
                      {lastEvent.title && (
                        <li className={styles['pendiente-list']}>
                          <b>{lastEvent.title}</b>
                        </li>
                      )}
                    </li>
                    <li>{lastEvent.activity}</li>
                  </ul>
                </div>
                <div className={styles.time}>
                  <span className={styles.hour}>
                    {lastEvent.expirationDateTime.split(' ')[1]}
                  </span>
                  {lastEvent.additionalInformation !== '' &&
                    lastEvent.additionalInformation !== '0' &&
                    (lastEvent.cycleSaleOp === '1' &&
                    lastEvent.stageCycleSaleOp === '2' ? (
                      <div>
                        <Button
                          buttonType={'primary'}
                          iconImage={false}
                          label={'Aceptar'}
                          inheritClass={styles.buttonQuote}
                          clickFunction={() =>
                            handleEventClick(lastEvent.additionalInformation)
                          }
                        />
                      </div>
                    ) : (
                      <div>
                        <Button
                          iconImage={false}
                          label={'Aceptada'}
                          inheritClass={styles.buttonQuoteAcepted}
                        />
                      </div>
                    ))}
                </div>
                <div
                  className={`${styles['blue-point']} bg-light-3 dark:bg-light-1`}></div>
              </div>
            )}
          </div>
          <div className={styles['pendientes-bottom']}>
            <div onClick={deleteOpportunity}>
              <Button
                buttonType={'primary'}
                inheritClass={styles.deleteButton}
                label={'Eliminar oportunidad'}></Button>
            </div>
          </div>
        </div>
        <Portal>
          {successPopUp === 1 && (
            <SuccessPopUp
              message={'¡Tú contacto ha sido creado con éxito!'}></SuccessPopUp>
          )}
          {successPopUp === 2 && (
            <ErrorPopUp errorMessage={errorMessage}></ErrorPopUp>
          )}
        </Portal>
      </>
      {generateQuote && (
        <Portal>
          <BackgroundPopUp
            closePopUp={closePopUpQuote}
            closeAnimate={animateCloseGenerateQuote}>
            <GenerateQuote
              closePopUpPortal={animateClosePopUpQuote}
              setRefreshFlag={setRefreshFlag}
              id={id}
              prePriceInfo={prePriceInfo}
            />
          </BackgroundPopUp>
        </Portal>
      )}
      {isOpportunityDeleted !== 0 && (
        <Portal>
          {isOpportunityDeleted === 1 && (
            <SuccessPopUp
              message={'¡La oportunidad ha sido eliminada con éxtio!'}
            />
          )}
          {isOpportunityDeleted === 2 && (
            <ErrorPopUp errorMessage={errorMessage} />
          )}
        </Portal>
      )}
      {addEvents && (
        <Portal>
          <AddEvents
            setAddEvents={setAddEvents}
            updateEvents={getEventsSelected}
            id={id}
          />
        </Portal>
      )}
    </>
  );
};

export default OportunitiesHistory;
