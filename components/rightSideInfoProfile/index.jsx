import React, { useContext } from 'react';
import styles from './RightProfile.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BildContext from '../context';

const RightSideProfile = ({ contactInfo, typeViewer }) => {
  const [clientId, setClientId] = useState('');
  const { isDark } = useContext(BildContext);
  const router = useRouter();
  useEffect(() => {
    if (contactInfo) {
      setClientId(contactInfo.idCli);
    }
  }, [contactInfo]);
  return (
    <>
      {typeViewer === 'buyer' && (
        <div className={styles['opc-pendiente']}>
          <Link
            href={`/opportunities/${router.query.id}`}
            className={`before:content-[''] before:absolute before:w-full before:h-full before:bg-light-1/20 font-black z-0 relative bg-card bg-cover bg-no-repeat bg-center bg-[url(/images/profile1.jpg)] ${styles.opcion}`}>
            <img
              className="w-12 h-12 object-contain relative"
              src={isDark ? '/images/key-white.png' : '/images/light/key.png'}
            />
            <span className={`${styles.badge} ${styles.red} font-black`}>
              2
            </span>
            <p className='relative'>Oportunidades</p>
          </Link>
          <Link
            href={`/contacts/${router.query.id}/quotes`}
            className={`before:content-[''] before:absolute before:w-full before:h-full before:bg-light-1/20 font-black z-0 relative bg-card bg-cover bg-no-repeat bg-center bg-[url(/images/profile2.jpg)] ${styles.opcion}`}>
            <img
              className="w-12 h-12 object-contain relative"
              src={
                isDark
                  ? '/images/cotizaciones-white.png'
                  : '/images/light/dashboard.png'
              }
            />
            <span className={`${styles.badge} ${styles.red} font-black`}>
              5
            </span>
            <p className='relative'>Cotizaciones</p>
          </Link>
          <Link
            href={`/documentation/${router.query.id}`}
            className={`before:content-[''] before:absolute before:w-full before:h-full before:bg-light-1/20 font-black z-0 relative bg-card bg-cover bg-no-repeat bg-center bg-[url(/images/profile3.jpg)] ${styles.opcion}`}>
            <img
              className="w-12 h-12 object-contain relative"
              src={
                isDark
                  ? '/images/docs-white.png'
                  : '/images/light/documentos.png'
              }
            />
            <span className={`${styles.badge} ${styles.red} font-black`}>
              3
            </span>
            <p className='relative'>Documentación</p>
          </Link>
          <Link
            href={`/contacts/${router.query.id}/payments`}
            className={`before:content-[''] before:absolute before:w-full before:h-full before:bg-light-1/20 font-black z-0 relative bg-card bg-cover bg-no-repeat bg-center bg-[url(/images/profile4.jpg)] ${styles.opcion}`}>
            <img
              className="w-12 h-12 object-contain relative"
              src={
                isDark
                  ? '/images/payments-white.png'
                  : '/images/light/money.png'
              }
            />
            <span className={`${styles.badge} ${styles.red} font-black`}>
              7
            </span>
            <p className='relative'>Pagos</p>
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

      {/* typeViewer === 'admin' && (
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
      ); */}
    </>
  );
};

export default RightSideProfile;
