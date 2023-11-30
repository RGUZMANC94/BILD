import styles from './CategoriesPopUp.module.css';

const CategoriesPopUp = () => {
  return (
    <div id="popUp1" className={`${styles.popup1} ${styles.overlay}`}>
      <div className={styles.popup}>
        <span className={styles['pop-text']}>
          Selecciona las categorías y el orden en que quieres visualizarlas.
        </span>
        <a className={styles.close} href="#">
          &times;
        </a>
        <div className={styles.content}>
          <div className={styles['cat-input']}>
            <div className={styles['side-a']}>
              <input className={styles.check} type="checkbox" required />
              <span className={styles['text-cat']}>Dash de ventas totales</span>
            </div>
            <div className={styles['side-b']}></div>
          </div>

          <div className={styles['cat-input']}>
            <div className={styles['side-a']}>
              <input className={styles.check} type="checkbox" required />
              <span className={styles['text-cat']}>Dash de ventas totales</span>
            </div>
            <div className={styles['side-b']}></div>
          </div>

          <div className={styles['cat-input']}>
            <div className={styles['side-a']}>
              <input className={styles.check} type="checkbox" required />
              <span className={styles['text-cat']}>
                Resumen de ventas y desistimientos mensuales
              </span>
            </div>
            <div className={styles['side-b']}></div>
          </div>

          <div className={styles['cat-input']}>
            <div className={styles['side-a']}>
              <input className={styles.check} type="checkbox" required />
              <span className={styles['text-cat']}>Estatus de las ventas</span>
            </div>
            <div className={styles['side-b']}></div>
          </div>

          <div className={styles['cat-input']}>
            <div className={styles['side-a']}>
              <input className={styles.check} type="checkbox" required />
              <span className={styles['text-cat']}>Visitas por medio</span>
            </div>
            <div className={styles['side-b']}></div>
          </div>

          <div className={styles['cat-input']}>
            <div className={styles['side-a']}>
              <input className={styles.check} type="checkbox" required />
              <span className={styles['text-cat']}>Ventas por medio</span>
            </div>
            <div className={styles['side-b']}></div>
          </div>

          <div className={styles['cat-input']}>
            <div className={styles['side-a']}>
              <input className={styles.check} type="checkbox" required />
              <span className={styles['text-cat']}>
                Visual del % de inventario vendido sobre total{' '}
              </span>
            </div>
            <div className={styles['side-b']}></div>
          </div>

          <div className={styles['cat-input']}>
            <div className={styles['side-a']}>
              <input className={styles.check} type="checkbox" required />
              <span className={styles['text-cat']}>
                Dash de efectividad por medios{' '}
              </span>
            </div>
            <div className={styles['side-b']}></div>
          </div>

          <div className={styles['cat-input']}>
            <div className={styles['side-a']}>
              <input className={styles.check} type="checkbox" required />
              <span className={styles['text-cat']}>
                Visual de inventarios replicando el edificio para mayor claridad{' '}
              </span>
            </div>
            <div className={styles['side-b']}></div>
          </div>

          <div className={styles['cat-input']}>
            <div className={styles['side-a']}>
              <input className={styles.check} type="checkbox" required />
              <span className={styles['text-cat']}>
                Visual de % de ventas por tipo en planta{' '}
              </span>
            </div>
            <div className={styles['side-b']}></div>
          </div>
          <div className={styles.origen}>
            <div className={styles.boton}>
              <button className={styles.buscar}>Buscar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPopUp;
