import styles from './events.module.css';
import AddEvents from '../addEvents';
import { useDispatch, useSelector } from 'react-redux';
import SquareInput from '../../squareInput';
import { useState, useEffect } from 'react';

const EventsOportunity = ({ setShowPopEvents, showPopEvents }) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.userState);
  const { opportunitySelected } = useSelector(
    (state) => state.opportunityState
  );
  const [firstEvent, setFirstEvent] = useState({});
  const [eventsSelected, setEventsSelected] = useState([]);
  const [lastEvent, setLastEvent] = useState({});
  const [showAllEvents, setShowAllEvents] = useState(false);

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
      ? events.filter((event) => Object.keys(event).length >= 3).reverse()
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
      const lastEvent = remainingEvents[remainingEvents.length - 1];
      setEventsSelected(filteredEvents.slice(1, -1));
      setLastEvent(lastEvent);
    } else {
      setFirstEvent({});
      setLastEvent({});
      setEventsSelected([]);
    }
  };

  useEffect(() => {
    getEventsSelected();
  }, []);

  const handleEventClick = () => {
    console.log('Evento seleccionado');
  };

  return (
    <>
      <button
        className={styles.evento}
        onClick={() => {
          setShowPopEvents(true);
        }}>
        Agregar evento
      </button>
      <div className={styles.right}>
        <div className={styles.line}>
          <img src="/images/Ellipse 81.png" />
          <div className={styles['ver-line']}></div>
        </div>

        <div className={styles.pendientes}>
          {/* oppSelectedObject &&
          
          (Object.keys(oppSelectedObject).length > 0 && 
            
            <div className={styles['pendiente-top']}>
              <span className={styles['tipo-sub']}>{oppSelectedObject.nameCustomer}</span>
              <ul className={styles.ulNode}>
                <li>{oppSelectedObject.nameProject}</li>
                <li>{`Tipo ${oppSelectedObject.propertyType.propertyType} : ${oppSelectedObject.idProperty}`}</li>
              </ul>
            </div>) */}

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
                {eventsSelected.length}+
              </div>
              <div className={styles.innerDottedContainer}>
                {eventsSelected.reverse().map(
                  (eventItem, i) =>
                    Object.keys(eventItem).length > 3 && (
                      <div
                        className={
                          /*
                        eventItem.status === 'PE'
                          ? styles.greybox
                          : styles.box*/ styles.greybox
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
                        {
                          /* eventItem.status === 'PE'*/ true && (
                            <div className={styles.time}>
                              <span className={styles.hour}>
                                {eventItem.expirationDateTime.split(' ')[1]}
                              </span>
                            </div>
                          )
                        }

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
      </div>
    </>
  );
};

export default EventsOportunity;
