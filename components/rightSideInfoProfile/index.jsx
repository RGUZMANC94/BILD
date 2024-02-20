import React from 'react';
import styles from './RightProfile.module.css';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const RightSideProfile = ({ contactInfo, typeViewer }) => {
  const { user_rol } = useSelector((state) => state.userState);
  const [clientId, setClientId] = useState('');

  useEffect(() => {
    if (contactInfo) {
      setClientId(contactInfo.idCli);
    }
  }, [contactInfo]);
  return (
    <>
      {typeViewer === 'buyer' && (
        <div className={styles['opc-pendiente']}>
          <Link href={`/oportunities/${clientId}`} className={styles.opcion}>
            <img src="/images/key-white.png" />
            <span className={`${styles.badge} ${styles.red}`}>2</span>
            Oportunidades
          </Link>
          <Link href="/quotes" className={styles.opcion}>
            <img src="/images/cotizaciones-white.png" />
            <span className={`${styles.badge} ${styles.red}`}>5</span>
            Cotizaciones
          </Link>
          <Link href="/documentation/1" className={styles.opcion}>
            <img src="/images/docs-white.png" />
            <span className={`${styles.badge} ${styles.red}`}>3</span>
            Documentación
          </Link>
          <Link href="/payments" className={styles.opcion}>
            <img src="/images/payments-white.png" />
            <span className={`${styles.badge} ${styles.red}`}>7</span>Pagos
          </Link>
        </div>
      )}

      {/* typeViewer !== 'admin' && (
        <>
          <div className={styles.flag}>Pendientes</div>
          <div className={styles.listado}>
            <div className={styles.penListGroup}>
              <h4 className={styles.penListDay}>Lunes</h4>

              <label className={styles.penlist}>
                <input className={styles.check} type="checkbox" required />
                <div className={styles.checkMask}></div>
                Enviar Brochure del proyecto Fontana Campestre
              </label>
              <label className={styles.penlist}>
                <input className={styles.check} type="checkbox" required />
                <div className={styles.checkMask}></div>
                Enviar cotización del proyecto La Florida
              </label>
              <label className={styles.penlist}>
                <input className={styles.check} type="checkbox" required />
                <div className={styles.checkMask}></div>
                Enviar cotización a Zeta Bosio de Campo Alegre
              </label>
            </div>
            <div className={styles.penListGroup}>
              <h4 className={styles.penListDay}>Martes</h4>

              <label className={styles.penlist}>
                <input className={styles.check} type="checkbox" required />
                <div className={styles.checkMask}></div>
                Enviar Brochure del proyecto Fontana Campestre
              </label>
              <label className={styles.penlist}>
                <input className={styles.check} type="checkbox" required />
                <div className={styles.checkMask}></div>
                Enviar cotización del proyecto La Florida
              </label>
              <label className={styles.penlist}>
                <input className={styles.check} type="checkbox" required />
                <div className={styles.checkMask}></div>
                Enviar cotización a Zeta Bosio de Campo Alegre
              </label>
            </div>
            <div className={styles.penListGroup}>
              <h4 className={styles.penListDay}>Miercoles</h4>

              <label className={styles.penlist}>
                <input className={styles.check} type="checkbox" required />
                <div className={styles.checkMask}></div>
                Enviar Brochure del proyecto Fontana Campestre
              </label>
              <label className={styles.penlist}>
                <input className={styles.check} type="checkbox" required />
                <div className={styles.checkMask}></div>
                Enviar cotización del proyecto La Florida
              </label>
              <label className={styles.penlist}>
                <input className={styles.check} type="checkbox" required />
                <div className={styles.checkMask}></div>
                Enviar cotización a Zeta Bosio de Campo Alegre
              </label>
            </div>
          </div>
        </>
      )*/}

      {typeViewer === 'admin' && (
        <div className={styles['datos-right']}>
          <div className={styles['top-name']}>Permisos</div>
          <hr />
          <form className={`${styles.msform} ${styles.permisos}`}>
            <fieldset>
              <div className={styles['field-user']}>
                <h3 className={styles.user}>Crear proyectos</h3>
                <div className={styles.switch}>
                  <input
                    id="checkbox1"
                    className={styles.look}
                    type="checkbox"
                  />
                  <label for="checkbox1"></label>
                </div>
              </div>
              <div className={styles['field-user']}>
                <h3 className={styles.user}>Crear tipo</h3>
                <div className={styles.switch}>
                  <input
                    id="checkbox2"
                    className={styles.look}
                    type="checkbox"
                  />
                  <label for="checkbox2"></label>
                </div>
              </div>
              <div className={styles['field-user']}>
                <h3 className={styles.user}>Añadir unidades</h3>
                <div className={styles.switch}>
                  <input
                    id="checkbox3"
                    className={styles.look}
                    type="checkbox"
                  />
                  <label for="checkbox3"></label>
                </div>
              </div>
              <div className={styles['field-user']}>
                <h3 className={styles.user}>Asignar inmuebles</h3>
                <div className={styles.switch}>
                  <input
                    id="checkbox4"
                    className={styles.look}
                    type="checkbox"
                  />
                  <label for="checkbox4"></label>
                </div>
              </div>
              <div className={styles['field-user']}>
                <h3 className={styles.user}>Crear oportunidades</h3>
                <div className={styles.switch}>
                  <input
                    id="checkbox5"
                    className={styles.look}
                    type="checkbox"
                  />
                  <label for="checkbox5"></label>
                </div>
              </div>
              <div className={styles['field-user']}>
                <h3 className={styles.user}>Crear cotizaciones</h3>
                <div className={styles.switch}>
                  <input
                    id="checkbox6"
                    className={styles.look}
                    type="checkbox"
                  />
                  <label for="checkbox6"></label>
                </div>
              </div>
              <div className={styles['field-user']}>
                <h3 className={styles.user}>Seguimiento de oportunidades</h3>
                <div className={styles.switch}>
                  <input
                    id="checkbox7"
                    className={styles.look}
                    type="checkbox"
                  />
                  <label for="checkbox7"></label>
                </div>
              </div>
              <div className={styles['field-user']}>
                <h3 className={styles.user}>Eliminar oportunidades</h3>
                <div className={styles.switch}>
                  <input
                    id="checkbox8"
                    className={styles.look}
                    type="checkbox"
                  />
                  <label for="checkbox8"></label>
                </div>
              </div>
              <div className={styles['field-user']}>
                <h3 className={styles.user}>Enviar cotizaciones</h3>
                <div className={styles.switch}>
                  <input
                    id="checkbox10"
                    className={styles.look}
                    type="checkbox"
                  />
                  <label for="checkbox10"></label>
                </div>
              </div>
              <div className={styles['field-user']}>
                <h3 className={styles.user}>Descargar informes</h3>
                <div className={styles.switch}>
                  <input
                    id="checkbox11"
                    className={styles.look}
                    type="checkbox"
                  />
                  <label for="checkbox11"></label>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      )}
    </>
  );
};

export default RightSideProfile;
