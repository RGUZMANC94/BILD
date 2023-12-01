import React from 'react';
import styles from './SideInfoProfile.module.css';
import capitalizeFLetter from '../../utils/capitalizeFirstLetter';
import { useSelector } from 'react-redux';

const SideInfoProfile = ({ typeViewer }) => {
  const { user_rol } = useSelector((state) => state.userState);
  return (
    <div className={styles['editar-perfil']}>
      {typeViewer === 'buyer' && <div className={styles.editar}>Editar</div>}

      <div className={styles['perfil-img']}>
        <img src="/images/henry.png" />
      </div>
      <span className={styles['name-perfil']}>Henry Cavill</span>
      <span className={styles['sub-name']}>
        {capitalizeFLetter(typeViewer)}
      </span>
      {(typeViewer === 'adviser' || typeViewer === 'admin') && (
        <div className={styles['perfil-icons']}>
          <div className={styles['id-perfil']}>
            <img src="/images/document-blue.png" />
            13.932.102. Bogotá D.C
          </div>
          <div className={styles['perfil-edit']}>
            <div className={styles['perfil-left']}>
              <img src="/images/mail-blue.png" />
              <a href="mailto:henrycavill@gmail.com">henrycavil@gmail.com</a>
            </div>
            <div className={styles['perfil-right']}>
              <img className={styles.edit} src="/images/small-edit.png" />
            </div>
          </div>
          <div className={styles['perfil-edit']}>
            <div className={styles['perfil-left']}>
              <img src="/images/phone-blue.png" />
              314 786 0473
            </div>
            <div className={styles['perfil-right']}>
              <img className={styles.edit} src="/images/small-edit.png" />
            </div>
          </div>
          <div className={styles['perfil-icon']}>
            <img src="/images/contacts-blue.png" />
            103 contactos
          </div>
          <div className={styles['perfil-icon']}>
            <img src="/images/contacts-blue.png" />
            10 contactos recientes
          </div>
          <div className={styles['perfil-icon']}>
            <img src="/images/proyects-blue.png" />5 proyectos activos
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
            <div className={styles['opc-pendiente']}>
              <div className={styles.opcion}>
                <img src="/images/oportunidades-icon.png" />
                <span className={`${styles.badge} ${styles.red}`}>2</span>
                Oportunidades
              </div>
              <div className={styles.opcion}>
                <img src="/images/cotizaciones-icon.png" />
                <span className={`${styles.badge} ${styles.red}`}>5</span>
                Cotizaciones
              </div>
              <div className={styles.opcion}>
                <img src="/images/documentacion-icon.png" />
                <span className={`${styles.badge} ${styles.red}`}>3</span>
                Documentación
              </div>
              <div className={styles.opcion}>
                <img src="/images/pagos-icon.png" />
                <span className={`${styles.badge} ${styles.red}`}>7</span>Pagos
              </div>
            </div>
          </div>
          <div className={styles['informacion-perfil']}>
            <span className={styles['info-perfil']}>Información adicional</span>
            <div className={styles['campos-informacion']}>
              <span className={styles['sub-title']}>FAMILIAR:</span>
              <div className={styles.campos}>
                <button
                  type="button"
                  onclick="cambiarColor(this.parentNode)"
                  className={styles.campo}>
                  Con Hijos
                </button>
                <button
                  type="button"
                  onclick="cambiarColor(this.parentNode)"
                  className={styles.campo}>
                  Separado
                </button>
              </div>
            </div>
          </div>
          <div className={styles['informacion-perfil']}>
            <div className={styles['campos-informacion']}>
              <span className={styles['sub-title']}>TIPO DE COMPRADOR:</span>
              <div className={styles.campos}>
                <button
                  type="button"
                  onclick="cambiarColor(this.parentNode)"
                  className={styles.campo}>
                  Inversionista
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SideInfoProfile;
