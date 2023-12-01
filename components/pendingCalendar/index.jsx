import React from 'react';
import styles from './pending-calendar.module.css';

const pendingCalendar = () => {
  return (
    <>
      <div className={styles['calendar-container']}>
        <div className={styles['calendar-day-container']}>
          <div className={styles['calendar-day-title']}>LUNES</div>

          <div className={styles['calendar-day-content']}>
            <div className={styles['calendar-card-container']}>
              <input
                className={styles['calendar-card-input']}
                type="checkbox"
                name="calendar-ckechbox"
              />{' '}
              <div className={styles['calendar-card-text-container']}>
                <div className={styles['calendar-card-text-hour']}>
                  10:00 AM
                </div>
                <div className={styles['calendar-card-text-message']}>
                  Llamar Andrea Echeverri he Llamar Andrea Echeverri Llamar
                  Andrea Echeverri Llamar Andrea Echeverri
                </div>
              </div>
            </div>

            <div className={styles['calendar-card-container']}>
              <input
                className={styles['calendar-card-input']}
                type="checkbox"
                name="calendar-ckechbox"
              />{' '}
              <div className={styles['calendar-card-text-container']}>
                <div className={styles['calendar-card-text-hour']}>
                  10:00 AM
                </div>
                <div className={styles['calendar-card-text-message']}>
                  Llamar Andrea Echeverri he Llamar Andrea Echeverri Llamar
                  Andrea Echeverri Llamar Andrea Echeverri
                </div>
              </div>
            </div>

            <div className={styles['calendar-card-container']}>
              <input
                className={styles['calendar-card-input']}
                type="checkbox"
                name="calendar-ckechbox"
              />{' '}
              <div className={styles['calendar-card-text-container']}>
                <div className={styles['calendar-card-text-hour']}>
                  10:00 AM
                </div>
                <div className={styles['calendar-card-text-message']}>
                  Llamar Andrea Echeverri he Llamar Andrea Echeverri Llamar
                  Andrea Echeverri Llamar Andrea Echeverri
                </div>
              </div>
            </div>

            <div className={styles['calendar-card-container']}>
              <input
                className={styles['calendar-card-input']}
                type="checkbox"
                name="calendar-ckechbox"
              />{' '}
              <div className={styles['calendar-card-text-container']}>
                <div className={styles['calendar-card-text-hour']}>
                  10:00 AM
                </div>
                <div className={styles['calendar-card-text-message']}>
                  Llamar Andrea Echeverri he Llamar Andrea Echeverri Llamar
                  Andrea Echeverri Llamar Andrea Echeverri
                </div>
              </div>
            </div>

            <div className={styles['calendar-card-container']}>
              <input
                className={styles['calendar-card-input']}
                type="checkbox"
                name="calendar-ckechbox"
              />{' '}
              <div className={styles['calendar-card-text-container']}>
                <div className={styles['calendar-card-text-hour']}>
                  10:00 AM
                </div>
                <div className={styles['calendar-card-text-message']}>
                  Llamar Andrea Echeverri he Llamar Andrea Echeverri Llamar
                  Andrea Echeverri Llamar Andrea Echeverri
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles['calendar-day-container']}>
          <div className={styles['calendar-day-title']}>Martes</div>

          <div className={styles['calendar-day-content']}>
            <div className={styles['calendar-card-container']}>
              <input
                className={styles['calendar-card-input']}
                type="checkbox"
                name="calendar-ckechbox"
              />{' '}
              <div className={styles['calendar-card-text-container']}>
                <div className={styles['calendar-card-text-hour']}>
                  10:00 AM
                </div>
                <div className={styles['calendar-card-text-message']}>
                  Llamar Andrea Echeverri he Llamar Andrea Echeverri Llamar
                  Andrea Echeverri Llamar Andrea Echeverri
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles['calendar-day-container']}>
          <div className={styles['calendar-day-title']}>Miercoles</div>

          <div className={styles['calendar-day-content']}>
            <div className={styles['calendar-card-container']}>
              <input
                className={styles['calendar-card-input']}
                type="checkbox"
                name="calendar-ckechbox"
              />{' '}
              <div className={styles['calendar-card-text-container']}>
                <div className={styles['calendar-card-text-hour']}>
                  10:00 AM
                </div>
                <div className={styles['calendar-card-text-message']}>
                  Llamar Andrea Echeverri he Llamar Andrea Echeverri Llamar
                  Andrea Echeverri Llamar Andrea Echeverri
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles['calendar-day-container']}>
          <div className={styles['calendar-day-title']}>Jueves</div>

          <div className={styles['calendar-day-content']}>
            <div className={styles['calendar-card-container']}>
              <input
                className={styles['calendar-card-input']}
                type="checkbox"
                name="calendar-ckechbox"
              />{' '}
              <div className={styles['calendar-card-text-container']}>
                <div className={styles['calendar-card-text-hour']}>
                  10:00 AM
                </div>
                <div className={styles['calendar-card-text-message']}>
                  Llamar Andrea Echeverri he Llamar Andrea Echeverri Llamar
                  Andrea Echeverri Llamar Andrea Echeverri
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles['calendar-day-container']}>
          <div className={styles['calendar-day-title']}>Viernes</div>

          <div className={styles['calendar-day-content']}>
            <div className={styles['calendar-card-container']}>
              <input
                className={styles['calendar-card-input']}
                type="checkbox"
                name="calendar-ckechbox"
              />{' '}
              <div className={styles['calendar-card-text-container']}>
                <div className={styles['calendar-card-text-hour']}>
                  10:00 AM
                </div>
                <div className={styles['calendar-card-text-message']}>
                  Llamar Andrea Echeverri he Llamar Andrea Echeverri Llamar
                  Andrea Echeverri Llamar Andrea Echeverri
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default pendingCalendar;
