import Link from "next/link";
import styles from "./styles.module.css";
import SideInfoProfile from "../../components/sideInfoProfile";

const ProfileEnlace = () => {
  return (
    <div className={styles["perfil"]}>
      {/* <div className={styles["editar-perfil"]}>
        <div className={styles["editar"]}>Editar</div>
        <div className={styles["perfil-img"]}>
          <img src="/images/henry.png" />
        </div>
        <span className={styles["name-perfil"]}>Henry Cavill</span>
        <span className={styles["sub-name"]}>Comprador</span>
        <div className={styles["id-perfil"]}>
          <img src="/images/id.png" />
          13.932.102. Bogotá D.C
        </div>
        <div className={styles["perfil-icons"]}>
          <div className={styles["perfil-icon"]}>
            <img src="/images/phone-profile.png" />
          </div>
          <div className={styles["perfil-icon"]}>
            <img src="/images/mail-profile.png" />
          </div>
          <div className={styles["perfil-icon"]}>
            <img src="/images/whats-profile.png" />
          </div>
        </div>
        <div className={styles["pendientes-movil"]}>
          <div className={styles["flag"]}>Pendientes:</div>
          <div className={styles["listado"]}>
            <label className={styles["penlist"]}>
              <input className={styles["check"]} type="checkbox" required />
              Enviar Brochure del proyecto Fontana Campestre
            </label>
            <label className={styles["penlist"]}>
              <input className={styles["check"]} type="checkbox" required />
              Enviar cotización del proyecto La Florida
            </label>
            <label className={styles["penlist"]}>
              <input className={styles["check"]} type="checkbox" required />
              Enviar cotización a Zeta Bosio de Campo Alegre
            </label>
          </div>
          <div className={styles["opc-pendiente"]}>
            <div className={styles["opcion"]}>
              <img src="/images/oportunidades-icon.png" />
              <span className={`${styles.badge} ${styles.red}`}>2</span>
              Oportunidades
            </div>
            <div className={styles["opcion"]}>
              <img src="/images/cotizaciones-icon.png" />
              <span className={`${styles.badge} ${styles.red}`}>5</span>
              Cotizaciones
            </div>
            <div className={styles["opcion"]}>
              <img src="/images/documentacion-icon.png" />
              <span className={`${styles.badge} ${styles.red}`}>3</span>
              Documentación
            </div>
            <div className={styles["opcion"]}>
              <img src="/images/pagos-icon.png" />
              <span className={`${styles.badge} ${styles.red}`}>7</span>Pagos
            </div>
          </div>
        </div>
        <div className={styles["informacion-perfil"]}>
          <span className={styles["info-perfil"]}>Información adicional</span>
          <div className={styles["campos-informacion"]}>
            <span className={styles["sub-title"]}>FAMILIAR:</span>
            <div className={styles["campos"]}>
              <button
                type="button"
                onclick="cambiarColor(this.parentNode)"
                className={styles["campo"]}
              >
                Con Hijos
              </button>
              <button
                type="button"
                onclick="cambiarColor(this.parentNode)"
                className={styles["campo"]}
              >
                Separado
              </button>
            </div>
          </div>
        </div>
        <div className={styles["informacion-perfil"]}>
          <div className={styles["campos-informacion"]}>
            <span className={styles["sub-title"]}>TIPO DE COMPRADOR:</span>
            <div className={styles["campos"]}>
              <button
                type="button"
                onclick="cambiarColor(this.parentNode)"
                className={styles["campo"]}
              >
                Inversionista
              </button>
            </div>
          </div>
        </div>
      </div> */}
      <SideInfoProfile />
      <div className={styles["pendientes"]}>
        <div className={styles["opc-pendiente"]}>
          <Link href="/oportunities/0" className={styles["opcion"]}>
            <img src="/images/key-white.png" />
            <span className={`${styles.badge} ${styles.red}`}>2</span>
            Oportunidades
          </Link>
          <Link href="/quotes" className={styles["opcion"]}>
            <img src="/images/cotizaciones-white.png" />
            <span className={`${styles.badge} ${styles.red}`}>5</span>
            Cotizaciones
          </Link>
          <Link href="/documentation" className={styles["opcion"]}>
            <img src="/images/docs-white.png" />
            <span className={`${styles.badge} ${styles.red}`}>3</span>
            Documentación
          </Link>
          <Link href="/payments" className={styles["opcion"]}>
            <img src="/images/payments-white.png" />
            <span className={`${styles.badge} ${styles.red}`}>7</span>Pagos
          </Link>
        </div>
        <div className={styles["flag"]}>Pendientes</div>
        <div className={styles["listado"]}>
          <label className={styles["penlist"]}>
            <input className={styles["check"]} type="checkbox" required />
            Enviar Brochure del proyecto Fontana Campestre
          </label>
          <label className={styles["penlist"]}>
            <input className={styles["check"]} type="checkbox" required />
            Enviar cotización del proyecto La Florida
          </label>
          <label className={styles["penlist"]}>
            <input className={styles["check"]} type="checkbox" required />
            Enviar cotización a Zeta Bosio de Campo Alegre
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProfileEnlace;
