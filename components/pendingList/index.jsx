import React from 'react';
import styles from './pending-list.module.css';

const pendingList = () => {
  return (
    <>
      <div className={styles['list-container']}>
        <div className={styles['list-day-container']}>
          <div className={styles['list-day-title']}>LUNES</div>
          <div className={styles['list-card-section']}>
            <div className={styles['list-card-container']}>
              <input
                type="checkbox"
                id="checkbox1"
                className={styles.checkboxInput}
              />
              <label
                htmlFor="checkbox1"
                className={styles.checkboxLabelSquare}></label>
              <div className={styles['list-card-text-hour']}>10:00 am</div>
              <div className={styles['list-card-text-message']}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quibusdam recusandae esse harum consequuntur. Perferendis labore
                cumque quae distinctio placeat quia sapiente ipsam eius, eveniet
                a quam voluptates sequi rerum reprehenderit!
              </div>
            </div>

            <div className={styles['list-card-container']}>
              <input
                type="checkbox"
                id="checkbox2"
                className={styles.checkboxInput}
              />
              <label
                htmlFor="checkbox2"
                className={styles.checkboxLabelSquare}></label>
              <div className={styles['list-card-text-hour']}>10:00 am</div>
              <div className={styles['list-card-text-message']}>
                Llamar Andrea Echeverri
              </div>
            </div>

            <div className={styles['list-card-container']}>
              <input
                type="checkbox"
                id="checkbox3"
                className={styles.checkboxInput}
              />
              <label
                htmlFor="checkbox3"
                className={styles.checkboxLabelSquare}></label>
              <div className={styles['list-card-text-hour']}>10:00 am</div>
              <div className={styles['list-card-text-message']}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. In
                illum ipsam odio quod cum hic labore. Eos dolorum ad nam eaque
                corporis deleniti ex atque, sint culpa, deserunt modi aliquam.
              </div>
            </div>
          </div>
        </div>

        <div className={styles['list-day-container']}>
          <div className={styles['list-day-title']}>Martes</div>
          <div className={styles['list-card-section']}>
            <div className={styles['list-card-container']}>
              <input
                type="checkbox"
                id="checkbox4"
                className={styles.checkboxInput}
              />
              <label
                htmlFor="checkbox4"
                className={styles.checkboxLabelSquare}></label>
              <div className={styles['list-card-text-hour']}>10:00 am</div>
              <div className={styles['list-card-text-message']}>
                Llamar Andrea Echeverri
              </div>
            </div>
          </div>
        </div>

        <div className={styles['list-day-container']}>
          <div className={styles['list-day-title']}>Miercoles</div>
          <div className={styles['list-card-section']}>
            <div className={styles['list-card-container']}>
              <input
                type="checkbox"
                id="checkbox5"
                className={styles.checkboxInput}
              />
              <label
                htmlFor="checkbox5"
                className={styles.checkboxLabelSquare}></label>
              <div className={styles['list-card-text-hour']}>10:00 am</div>
              <div className={styles['list-card-text-message']}>
                Llamar Andrea Echeverri
              </div>
            </div>
          </div>
        </div>

        <div className={styles['list-day-container']}>
          <div className={styles['list-day-title']}>Jueves</div>
          <div className={styles['list-card-section']}>
            <div className={styles['list-card-container']}>
              <input
                type="checkbox"
                id="checkbox6"
                className={styles.checkboxInput}
              />
              <label
                htmlFor="checkbox6"
                className={styles.checkboxLabelSquare}></label>
              <div className={styles['list-card-text-hour']}>10:00 am</div>
              <div className={styles['list-card-text-message']}>
                Llamar Andrea Echeverri
              </div>
            </div>
          </div>
        </div>

        <div className={styles['list-day-container']}>
          <div className={styles['list-day-title']}>Viernes</div>
          <div className={styles['list-card-section']}>
            <div className={styles['list-card-container']}>
              <input
                type="checkbox"
                id="checkbox7"
                className={styles.checkboxInput}
              />
              <label
                htmlFor="checkbox7"
                className={styles.checkboxLabelSquare}></label>
              <div className={styles['list-card-text-hour']}>10:00 am</div>
              <div className={styles['list-card-text-message']}>
                Llamar Andrea Echeverri
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default pendingList;
