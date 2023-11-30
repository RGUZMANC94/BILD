import { useState } from 'react';
import { openPopUp } from '../../redux/popUpOportunity';
import styles from './oportunities-history.module.css';
import { event } from 'jquery';
import Button from '../button';

const OportunitiesHistory = () => {
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

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  return (
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
                  className={styles.checkboxLabelSquare}
                ></label>
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

          <div
            className={`${styles['box-dotted']} ${
              showAllEvents ? styles.active : ''
            } relative`}
          >
            <div
              className={styles['blue-point-plus']}
              onClick={() => setShowAllEvents(true)}
            >
              {allEvents.length - 2}+
            </div>
            <div className={styles.innerDottedContainer}>
              {allEvents.reverse().map((eventItem, i) => (
                <div
                  className={
                    eventItem.status === 'pending'
                      ? styles.greybox
                      : styles.box
                  }
                  key={eventItem.id}
                >
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
                        {eventItem.date}
                      </span>
                    </label>
                    <ul>
                      <li className={styles['pendiente-list']}>
                        <b>{eventItem.title}</b>
                      </li>
                      <li>{eventItem.detail}</li>
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
        </div>
        <div className={styles['pendientes-bottom']}>
          <Button
            clickFunction={openPopUp}
            buttonType={'primary'}
            classNameInherit={'align-center'}
            iconImage={'/images/plus_icon_white.svg'}
            label={'Ver oportunidad'}
          ></Button>
          <div className={styles['card-progress-bar-container']}>
            <div className={styles['card-progress-bar-frost-icon']}></div>
            <div className={styles['card-progress-bar-cold']}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OportunitiesHistory;
