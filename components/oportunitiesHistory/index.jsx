import { useState , useEffect } from 'react';
import { openPopUp } from '../../redux/popUpOportunity';
import styles from './oportunities-history.module.css';
import Button from '../button';
import { useDispatch, useSelector } from 'react-redux';

const OportunitiesHistory = ({opportunitySelected,oppSelectedObject}) => {
  console.log('ID oportinidad enviada', opportunitySelected)
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
        idclient: ''
      }),
    });
    console.log('Eventos:', response);

    const events = await response.json();
    console.log('Eventos format:', events);

    setEventsSelected(events);

    if (events.length > 0) {
      const [firstEvent, ...remainingEvents] = events;
      setFirstEvent(firstEvent);
      setEventsSelected(remainingEvents);
    } else if (events.length === 1){
      setFirstEvent(events[0]);
      setEventsSelected([]);
    } else {
      setFirstEvent({});
      setEventsSelected([]);
    }
   };
 
   useEffect(() => {
    if (opportunitySelected !== -1 && opportunitySelected) {
      getEventsSelected();
    }
  }, [opportunitySelected]);

  console.log('ID oportinidad enviada', opportunitySelected)
  console.log('Oportinidad Objeto', oppSelectedObject)
  console.log('Primer evento', firstEvent)
  console.log('eventos ya en:', eventsSelected)

  return (
    <>
    
      <>
      <div className={styles.right}>
        <div className={styles.line}>
          <img src="/images/Ellipse 81.png" />
          <div className={styles['ver-line']}></div>
        </div>

        <div className={styles.pendientes}>
          <div className={styles['pendiente-top']}>
            <span className={styles['tipo-sub']}>John Lennon</span>
            <ul className={styles.ulNode}>
              <li>Fontana Campestre</li>
              <li>Tipo 2:302</li>
            </ul>
          </div>

        { Object.keys(firstEvent).length > 0 && 
          <div className={styles.greybox}>
            <div className={styles.info}>
              <label>
                <input
                  type="checkbox"
                  id="checkbox1"
                  className={styles.checkboxInput}
                />
                <label
                  htmlFor="checkbox1"
                  className={styles.checkboxLabelSquare}></label>
                <span className={styles['pendiente-date']}>05/01/22</span>
              </label>
              <ul>
                <li className={styles['pendiente-list']}>
                  <b>Pendiente 3:</b>
                </li>
                <li>Entregar la información de documentación</li>
              </ul>
            </div>
            <div className={styles.time}>
              <span className={styles.hour}>11:07 am</span>
            </div>
            <div className={styles['blue-point']}></div>
          </div>
        }



          {eventsSelected.length > 0 &&
          <div
            className={`${styles['box-dotted']} ${
              showAllEvents ? styles.active : ''
            } relative`}>
            <div
              className={styles['blue-point-plus']}
              onClick={() => setShowAllEvents(true)}>
              {eventsSelected.length - 2}+
            </div>
            <div className={styles.innerDottedContainer}>
              {eventsSelected.reverse().map((eventItem, i) => (
                <div
                  className={
                    eventItem.status === 'pending' ? styles.greybox : styles.box
                  }
                  key={eventItem.id}>
                  <div className={styles.info}>
                    <label>
                      {eventItem.status === 'pending' && (
                        <>
                          <input
                            type="checkbox"
                            id="checkbox1"
                            className={styles.checkboxInput}
                          />
                          <div className={styles.checkboxLabelSquare}></div>
                        </>
                      )}

                      <span className={styles['pendiente-date']}>
                        {eventItem.createDateTime}
                      </span>
                    </label>
                    <ul>
                      <li className={styles['pendiente-list']}>
                        <b>{`Titulo del evento`}</b>
                      </li>
                      <li>{eventItem.activity}</li>
                    </ul>
                  </div>
                  {eventItem.status === 'pending' && (
                    <div className={styles.time}>
                      <span className={styles.hour}>{eventItem.hour}</span>
                    </div>
                  )}

                  <div className={styles['blue-point']}></div>
                </div>
              ))}
            </div>
          </div>
          }
          
          {
            /*
            <div className={styles.box}>
              <span className={styles['pendiente-date']}>05/01/22</span>
              <ul>
                <li className={styles['pendiente-list']}>
                  Creación del Contacto
                </li>
                <li>Visita en la sala de ventas</li>
              </ul>
              <div className={styles['blue-point']}></div>
            </div>

            */
          }

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
