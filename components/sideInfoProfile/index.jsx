import React from 'react';
import styles from './SideInfoProfile.module.css';
import capitalizeFLetter from '../../utils/capitalizeFirstLetter';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { changeContactEdit } from '../../redux/editObjectSlice';

const SideInfoProfile = ({ contactInfo, typeViewer }) => {
  const dispatch = useDispatch();
  const { contactListSelected } = useSelector(
    (state) => state.contactOpportunityState
  );

  console.log('Informacion del contactIndo: ', contactInfo);
  return (
    <>
      {contactInfo && (
        <div className={styles['editar-perfil']}>
          <div className={styles.containerEditarPerfil}>
            {typeViewer === 'buyer' && (
              <Link
                href={{
                  pathname: '/edit-contact',
                  query: { contact: contactInfo.idCli },
                }}
                className={`${styles.editar}`}></Link>
            )}

            <div className={styles['perfil-img']}>
              <img
                alt=""
                src={
                  typeViewer === 'buyer'
                    ? contactInfo.image[0] !== '' && contactInfo.image[0]
                      ? `${contactInfo.image[0].url}`
                      : '/images/henry.png'
                    : '/images/henry.png'
                }
              />
            </div>
            <span className={styles['name-perfil']}>
              {`${contactInfo.name} ${contactInfo.lastname}`}
            </span>
            <span className={styles['sub-name']}>
              {capitalizeFLetter(typeViewer)}
            </span>
            {(typeViewer === 'adviser' || typeViewer === 'admin') && (
              <div className={styles['perfil-icons-admin']}>
                <div className={styles['admin-section-container']}>
                  <div className={styles['admin-img-container']}>
                    <img src="/images/id-profile.svg" />
                  </div>
                  <div className={styles['admin-text-container']}>
                    13.932.102. Bogotá D.C
                  </div>
                </div>

                <div className={styles['admin-section-container']}>
                  <div className={styles['admin-img-container']}>
                    <img src="/images/email-profile.svg" />
                  </div>
                  <div className={styles['admin-text-container']}>
                    {contactInfo.email}
                  </div>
                  <div className={styles['admin-edit-container']}>
                    <img src="/images/edit-profile.svg" />
                  </div>
                </div>

                <div className={styles['admin-section-container']}>
                  <div className={styles['admin-img-container']}>
                    <img src="/images/phone-profile.svg" />
                  </div>
                  <div className={styles['admin-text-container']}>
                    329 043 0000
                  </div>
                  <div className={styles['admin-edit-container']}>
                    <img src="/images/edit-profile.svg" />
                  </div>
                </div>

                <div className={styles['admin-section-container']}>
                  <div className={styles['admin-img-container']}>
                    <img src="/images/contacts-profile.svg" />
                  </div>
                  <div className={styles['admin-text-container']}>
                    103 contactos
                  </div>
                </div>

                <div className={styles['admin-section-container']}>
                  <div className={styles['admin-img-container']}>
                    <img src="/images/contacts-profile.svg" />
                  </div>
                  <div className={styles['admin-text-container']}>
                    10 contactos recientes
                  </div>
                </div>

                <div className={styles['admin-section-container']}>
                  <div className={styles['admin-img-container']}>
                    <img src="/images/projects-profile.svg" />
                  </div>
                  <div className={styles['admin-text-container']}>
                    5 proyectos activos
                  </div>
                </div>
              </div>
            )}
            {typeViewer === 'admin' && (
              <div className={styles.pendientes}>
                <div className={styles.flag}>Pendientes</div>
                <div className={styles.listado}>
                  <label className={styles.penlist}>
                    <div className={styles.checkMask}></div>
                    <input className={styles.check} type="checkbox" required />
                    Enviar Brochure del proyecto Fontana Campestre
                  </label>
                  <label className={styles.penlist}>
                    <input className={styles.check} type="checkbox" required />
                    <div className={styles.checkMask}></div>
                    Enviar cotización del proyecto La Florida
                  </label>
                </div>
              </div>
            )}
            {typeViewer === 'buyer' && (
              <>
                <div className={styles['id-perfil']}>
                  <img src="/images/id.png" />
                  13.932.102. Bogotá D.C
                </div>

                <div className={styles['perfil-icons']}>
                  <div className={styles['perfil-icon']}>
                    <img src="/images/phone-profile.png" />
                  </div>
                  <div className={styles['perfil-icon']}>
                    <img src="/images/mail-profile.png" />
                  </div>
                  <div className={styles['perfil-icon']}>
                    <img src="/images/whats-profile.png" />
                  </div>
                </div>
                <div className={styles['pendientes-movil']}>
                  <div className={styles['opc-pendiente']}>
                    <Link href="/oportunities/0" className={styles.opcion}>
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
                      <span className={`${styles.badge} ${styles.red}`}>7</span>
                      Pagos
                    </Link>
                  </div>
                </div>
                <div className={styles['informacion-perfil']}>
                  <span className={styles['info-perfil']}>
                    Información adicional
                  </span>
                  <div className={styles['campos-informacion']}>
                    <span className={styles['sub-title']}>Familiar:</span>
                    <div className={styles.campos}>
                      <button
                        type="button"
                        onClick="cambiarColor(this.parentNode)"
                        className={styles.campo}>
                        Con Hijos
                      </button>
                      <button
                        type="button"
                        onClick="cambiarColor(this.parentNode)"
                        className={styles.campo}>
                        Separado
                      </button>
                    </div>
                  </div>
                </div>
                <div className={styles['informacion-perfil']}>
                  <div className={styles['campos-informacion']}>
                    <span className={styles['sub-title']}>
                      Tipo de comprador:
                    </span>
                    <div className={styles.campos}>
                      <button
                        type="button"
                        onClick="cambiarColor(this.parentNode)"
                        className={styles.campo}>
                        Inversionista
                      </button>
                    </div>
                  </div>
                </div>
                <div className={styles.flag}>Pendientes:</div>
                <div className={styles.listado}>
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
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SideInfoProfile;
