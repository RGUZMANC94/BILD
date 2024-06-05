import React from 'react';
import styles from './SideInfoProfile.module.css';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

const SideInfoProfile = ({ contactInfo, typeViewer, setShowEditContact }) => {
  const dispatch = useDispatch();

  console.log('Informacion del contactIndo: ', contactInfo);
  return (
    <>
      {contactInfo && (
        <div className={styles['editar-perfil']}>
          <div className={styles.containerEditarPerfil}>
            {typeViewer === 'buyer' && (
              <button
                className={`${styles.editar}`}
                onClick={() => setShowEditContact(true)}
              />
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
              {contactInfo.name &&
                `${contactInfo.name} ${contactInfo.lastname}`}
              {contactInfo.firstNames &&
                `${contactInfo.firstNames} ${contactInfo.lastNames}`}
            </span>
            {(typeViewer === 'adviser' || typeViewer === 'admin') && (
              <div className={styles['perfil-icons-admin']}>
                <div className={styles['admin-section-container']}>
                  <div className={styles['admin-img-container']}>
                    <img src="/images/id-profile.svg" />
                  </div>
                  <div className={styles['admin-text-container']}>
                    {contactInfo.documentNumber}
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
                  {contactInfo.documentNumber}
                </div>

                <div className={styles['perfil-icons']}>
                  <a
                    href={`tel:+57${contactInfo.phoneNumber}`}
                    className={styles['perfil-buttons']}>
                    <img src="/images/profile-phone-icon.png" />
                  </a>
                  <a
                    href={`mailto:${contactInfo.email}?subject=BILD`}
                    className={styles['perfil-buttons']}>
                    <img src="/images/profile-email-icon.png" />
                  </a>
                  <a
                    href={`https://wa.me/${contactInfo.phoneNumber}?subject=BILD`}
                    target="_blank"
                    className={styles['perfil-buttons']}>
                    <img src="/images/profile-whatsapp-icon.png" />
                  </a>
                </div>
                <div className={styles['pendientes-movil']}>
                  <div className={styles['opc-pendiente']}>
                    <Link href="/opportunities/0" className={styles.opcion}>
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
                {contactInfo.contactProfile.length > 0 && (
                  <>
                    <div className={styles['informacion-perfil']}>
                      <span className={styles['info-perfil']}>
                        Información adicional
                      </span>
                      <div className={styles['campos-informacion']}>
                        <span className={styles['sub-title']}>Familiar:</span>
                        <div className={styles.campos}>
                          {contactInfo.contactProfile[0].civilStatus && (
                            <button
                              type="button"
                              onClick="cambiarColor(this.parentNode)"
                              className={styles.campo}>
                              {contactInfo.contactProfile[0].civilStatus ===
                                'S' && 'Soltero'}
                              {contactInfo.contactProfile[0].civilStatus ===
                                'C' && 'Casado'}
                              {contactInfo.contactProfile[0].civilStatus ===
                                'DI' && 'Divorciado'}
                              {contactInfo.contactProfile[0].civilStatus ===
                                'UN' && 'Union Libre'}
                            </button>
                          )}
                          {contactInfo.contactProfile[0].amountChildren &&
                            (contactInfo.contactProfile[0].amountChildren ===
                            '0' ? (
                              <button
                                type="button"
                                onClick="cambiarColor(this.parentNode)"
                                className={styles.campo}>
                                Sin Hijos
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick="cambiarColor(this.parentNode)"
                                className={styles.campo}>
                                Con Hijos
                              </button>
                            ))}
                        </div>
                      </div>
                    </div>
                    <div className={styles['informacion-perfil']}>
                      <div className={styles['campos-informacion']}>
                        <span className={styles['sub-title']}>
                          Tipo de comprador:
                        </span>
                        <div className={styles.campos}>
                          {contactInfo.contactProfile[0].housingInversion &&
                            (contactInfo.contactProfile[0].housingInversion ===
                            'I' ? (
                              <button
                                type="button"
                                onClick="cambiarColor(this.parentNode)"
                                className={styles.campo}>
                                Inversionista
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick="cambiarColor(this.parentNode)"
                                className={styles.campo}>
                                Vivienda
                              </button>
                            ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}

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
