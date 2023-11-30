import { useState } from 'react';
import styles from './events.module.css';
import AddEvents from '../addEvents';

const EventsOportunity = ({ setShowPopEvents, showPopEvents }) => {
  return (
    <>
      <button
        className={styles.evento}
        onClick={() => {
          setShowPopEvents(true);
        }}
      >
        Agregar evento
      </button>
      <div className={styles.contact}>
        <div className={styles['user-evento']}>
          <img src="/images/Ellipse 81.png" />
        </div>
        <div className={styles['lista-evento']}>
          <span>05/01/22</span>
          <ul className={styles.ulEvent}>
            <li>Creación del contacto</li>
            <li>Visita en sala de ventas</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default EventsOportunity;
