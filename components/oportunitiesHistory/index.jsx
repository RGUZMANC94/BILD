import { useState, useEffect } from 'react';
import { openPopUp } from '../../redux/popUpOportunity';
import styles from './oportunities-history.module.css';
import Button from '../button';
import { useDispatch, useSelector } from 'react-redux';
import SquareInput from '../squareInput';

const OportunitiesHistory = ({ opportunitySelected, oppSelectedObject }) => {
  console.log('ID oportinidad enviada', opportunitySelected);
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.userState);
  const { unitSelected } = useSelector((state) => state.unitState);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAllEvents, setShowAllEvents] = useState(false);
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

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  const getEventsSelected = async () => {
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

    const filteredEvents = events
      ? events.filter((event) => Object.keys(event).length >= 3)
      : [];

    if (filteredEvents.length === 1) {
      setFirstEvent(filteredEvents[0]);
      setLastEvent({});
      setEventsSelected([]);
    } else if (filteredEvents.length === 2) {
      setFirstEvent(filteredEvents[0]);
      setLastEvent(filteredEvents[1]);
      setEventsSelected([]);
    } else if (filteredEvents.length > 2) {
      const [firstEvent, ...remainingEvents] = filteredEvents;
      setFirstEvent(firstEvent);
      setEventsSelected(remainingEvents);
      const lastEvent = remainingEvents[remainingEvents.length - 1];
      setLastEvent(lastEvent);
    } else {
      setFirstEvent({});
      setLastEvent({});
      setEventsSelected([]);
    }
  };

  useEffect(() => {
    if (opportunitySelected !== -1 && opportunitySelected) {
      getEventsSelected();
    }
  }, [opportunitySelected]);

  const handleEventClick = () => {
    console.log('Evento seleccionado');
  };

  console.log('ID oportinidad enviada', opportunitySelected);
  console.log('Oportinidad Objeto', oppSelectedObject);
  console.log('Primer evento', firstEvent);
  console.log('eventos ya en:', eventsSelected);
  console.log('Ultimo evento', lastEvent);

  return (
    <>
      <>
        <div className={styles.right}>
          <div className={styles.line}>
            <img src="/images/Ellipse 81.png" />
            <div className={styles['ver-line']}></div>
          </div>

          <div className={styles.pendientes}>
            {oppSelectedObject && Object.keys(oppSelectedObject).length > 0 && (
              <div className={styles['pendiente-top']}>
                <span className={styles['tipo-sub']}>
                  {oppSelectedObject.nameCustomer}
                </span>
                <ul className={styles.ulNode}>
                  <li>{oppSelectedObject.nameProject}</li>
                  <li>{`Tipo ${oppSelectedObject.propertyType.propertyType} : ${oppSelectedObject.idProperty}`}</li>
                </ul>
              </div>
            )}

            {Object.keys(firstEvent).length > 0 && (
              <div className={styles.greybox}>
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
                    <li className={styles['pendiente-list']}>
                      <b>Titulo evento:</b>
                    </li>
                    <li>{firstEvent.activity}</li>
                  </ul>
                </div>
                <div className={styles.time}>
                  <span className={styles.hour}>
                    {firstEvent.expirationDateTime.split(' ')[1]}
                  </span>
                </div>
                <div className={styles['blue-point']}></div>
              </div>
            )}

            {eventsSelected.length > 0 && (
              <div
                className={`${styles['box-dotted']} ${
                  showAllEvents ? styles.active : ''
                } relative`}>
                <div
                  className={styles['blue-point-plus']}
                  onClick={() => setShowAllEvents(true)}>
                  {eventsSelected.length - 1}+
                </div>
                <div className={styles.innerDottedContainer}>
                  {eventsSelected.reverse().map(
                    (eventItem, i) =>
                      Object.keys(eventItem).length > 3 && (
                        <div
                          className={
                            eventItem.status === 'PE'
                              ? styles.greybox
                              : styles.box
                          }
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
                              <li className={styles['pendiente-list']}>
                                <b>{'Titulo del evento'}</b>
                              </li>
                              <li>{eventItem.activity}</li>
                            </ul>
                          </div>
                          {eventItem.status === 'PE' && (
                            <div className={styles.time}>
                              <span className={styles.hour}>
                                {eventItem.expirationDateTime.split(' ')[1]}
                              </span>
                            </div>
                          )}

                          <div className={styles['blue-point']}></div>
                        </div>
                      )
                  )}
                </div>
              </div>
            )}

            {Object.keys(lastEvent).length > 0 && (
              <div className={styles.greybox}>
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
                      <b>Titulo evento:</b>
                    </li>
                    <li>{lastEvent.activity}</li>
                  </ul>
                </div>
                <div className={styles.time}>
                  <span className={styles.hour}>
                    {lastEvent.expirationDateTime.split(' ')[1]}
                  </span>
                </div>
                <div className={styles['blue-point']}></div>
              </div>
            )}
          </div>
          <div className={styles['pendientes-bottom']}>
            <div onClick={() => dispatch(openPopUp(true))}>
              <Button
                buttonType={'primary'}
                classNameInherit={'align-center'}
                iconImage={'/images/plus_icon_white.svg'}
                label={'Ver oportunidad'}></Button>
            </div>
            <div className={styles['card-progress-bar-container']}>
              <div className={styles['card-progress-bar-frost-icon']}></div>
              <div className={styles['card-progress-bar-cold']}></div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default OportunitiesHistory;
