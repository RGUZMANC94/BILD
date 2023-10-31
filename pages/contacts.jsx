import Link from "next/link";
import styles from "../styles/Contacts.module.css";

const Contacts = () => {
  return (
    <section className={styles["main-contain-contact"]}>
      <Link className={styles["crear-contacto"]} href="/create-contact"></Link>
      <div className={styles["contact-top"]}>
        <div className={styles["nombre"]}>Nombre</div>
        <div className={styles["mail"]}>Correo Electrónico</div>
        <div className={styles["numero"]}>Número de contacto</div>
      </div>
      <div className={styles["listas"]}>
        <div className={styles["reciente"]}>Creados Recientemente (2)</div>
        <div className={styles["list-name"]}>
          <div className={styles["list-contact"]}>
            <div className={styles["contact"]}>
              <img src="/images/Ellipse 81.png" />
              <span className={`${styles.badge} ${styles.red}`}>1</span>
              Gustavo Cerati
            </div>
            <div className={styles["reciente-col"]}>
              gustavo.cerati@gmail.com
            </div>
            <div className={styles["number"]}>
              +57 3015928421
              <img src="/images/whastapp-blue.png" />
            </div>
            <div className={styles["iconos-movil"]}>
              <div className={styles["phone-movil"]}>
                <img src="/images/blue-phone-movil.png" />
              </div>
              <div className={styles["wa-movil"]}>
                <img src="/images/whatsapp-green.png" />
              </div>
            </div>
          </div>
        </div>

        <div className={styles["list-name"]}>
          <div className={styles["list-contact"]}>
            <div className={styles["contact"]}>
              <img src="/images/Ellipse 82.png" />
              <span className={`&{styles.badge} ${styles.red}`}>3</span>Whitney
              Houston
            </div>
            <div className={styles["reciente-col"]}>
              whitneyhouston@gmail.com
            </div>
            <div className={styles["number"]}>
              +57 3015928421
              <img src="/images/whastapp-blue.png" />
            </div>
            <div className={styles["iconos-movil"]}>
              <div className={styles["phone-movil"]}>
                <img src="/images/blue-phone-movil.png" />
              </div>
              <div className={styles["wa-movil"]}>
                <img src="/images/whatsapp-green.png" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles["list-name"]}>
          <div className={styles["list-contact"]}>
            <div className={styles["contact"]}>
              <img src="/images/Ellipse 84.png" /> Amy Wine House
            </div>
            <div className={styles["reciente-col"]}>amywinehouse@gmail.com</div>
            <div className={styles["number"]}>
              +57 3015928421
              <img src="/images/whastapp-blue.png" />
            </div>
            <div className={styles["iconos-movil"]}>
              <div className={styles["phone-movil"]}>
                <img src="/images/blue-phone-movil.png" />
              </div>
              <div className={styles["wa-movil"]}>
                <img src="/images/whatsapp-green.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["listas"]}>
        <div className={styles["reciente"]}>Contactos (52)</div>
        <div className={styles["list-name"]}>
          <div className={styles["list-contact"]}>
            <div className={styles["contact"]}>
              <img src="/images/Ellipse 81.png" /> Gustavo Cerati
            </div>
            <div className={styles["reciente-col"]}>
              gustavo.cerati@gmail.com
            </div>
            <div className={styles["number"]}>
              +57 3015928421
              <img src="/images/whastapp-blue.png" />
            </div>
            <div className={styles["iconos-movil"]}>
              <div className={styles["phone-movil"]}>
                <img src="/images/blue-phone-movil.png" />
              </div>
              <div className={styles["wa-movil"]}>
                <img src="/images/whatsapp-green.png" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles["list-name"]}>
          <div className={styles["list-contact"]}>
            <div className={styles["contact"]}>
              <img src="/images/Ellipse 82.png" />
              <span className={`&{styles.badge} ${styles.red}`}>2</span>
              Whitney Houston
            </div>
            <div className={styles["reciente-col"]}>
              whitneyhouston@gmail.com
            </div>
            <div className={styles["number"]}>
              +57 3015928421
              <img src="/images/whastapp-blue.png" />
            </div>
            <div className={styles["iconos-movil"]}>
              <div className={styles["phone-movil"]}>
                <img src="/images/blue-phone-movil.png" />
              </div>
              <div className={styles["wa-movil"]}>
                <img src="/images/whatsapp-green.png" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles["list-name"]}>
          <div className={styles["list-contact"]}>
            <div className={styles["contact"]}>
              <img src="/images/Ellipse 84.png" /> Amy Wine House
            </div>
            <div className={styles["reciente-col"]}>amywinehouse@gmail.com</div>
            <div className={styles["number"]}>
              +57 3015928421
              <img src="/images/whastapp-blue.png" />
            </div>
            <div className={styles["iconos-movil"]}>
              <div className={styles["phone-movil"]}>
                <img src="/images/blue-phone-movil.png" />
              </div>
              <div className={styles["wa-movil"]}>
                <img src="/images/whatsapp-green.png" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles["list-name"]}>
          <div className={styles["list-contact"]}>
            <div className={styles["contact"]}>
              <img src="/images/Ellipse 81.png" />
              <span className={`&{styles.badge} ${styles.red}`}>3</span>
              Gustavo Cerati
            </div>
            <div className={styles["reciente-col"]}>
              gustavo.cerati@gmail.com
            </div>
            <div className={styles["number"]}>
              +57 3015928421
              <img src="/images/whastapp-blue.png" />
            </div>
            <div className={styles["iconos-movil"]}>
              <div className={styles["phone-movil"]}>
                <img src="/images/blue-phone-movil.png" />
              </div>
              <div className={styles["wa-movil"]}>
                <img src="/images/whatsapp-green.png" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles["list-name"]}>
          <div className={styles["list-contact"]}>
            <div className={styles["contact"]}>
              <img src="/images/Ellipse 82.png" /> Whitney Houston
            </div>
            <div className={styles["reciente-col"]}>
              whitneyhouston@gmail.com
            </div>
            <div className={styles["number"]}>
              +57 3015928421
              <img src="/images/whastapp-blue.png" />
            </div>
            <div className={styles["iconos-movil"]}>
              <div className={styles["phone-movil"]}>
                <img src="/images/blue-phone-movil.png" />
              </div>
              <div className={styles["wa-movil"]}>
                <img src="/images/whatsapp-green.png" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles["list-name"]}>
          <div className={styles["list-contact"]}>
            <div className={styles["contact"]}>
              <img src="/images/Ellipse 84.png" /> Amy Wine House
            </div>
            <div className={styles["reciente-col"]}>amywinehouse@gmail.com</div>
            <div className={styles["number"]}>
              +57 3015928421
              <img src="/images/whastapp-blue.png" />
            </div>
            <div className={styles["iconos-movil"]}>
              <div className={styles["phone-movil"]}>
                <img src="/images/blue-phone-movil.png" />
              </div>
              <div className={styles["wa-movil"]}>
                <img src="/images/whatsapp-green.png" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles["list-name"]}>
          <div className={styles["list-contact"]}>
            <div className={styles["contact"]}>
              <img src="/images/Ellipse 81.png" />
              <span className={`&{styles.badge} ${styles.red}`}>2</span>Gustavo
              Cerati
            </div>
            <div className={styles["reciente-col"]}>
              gustavo.cerati@gmail.com
            </div>
            <div className={styles["number"]}>
              +57 3015928421
              <img src="/images/whastapp-blue.png" />
            </div>
            <div className={styles["iconos-movil"]}>
              <div className={styles["phone-movil"]}>
                <img src="/images/blue-phone-movil.png" />
              </div>
              <div className={styles["wa-movil"]}>
                <img src="/images/whatsapp-green.png" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles["list-name"]}>
          <div className={styles["list-contact"]}>
            <div className={styles["contact"]}>
              <img src="/images/Ellipse 82.png" /> Whitney Houston
            </div>
            <div className={styles["reciente-col"]}>
              whitneyhouston@gmail.com
            </div>
            <div className={styles["number"]}>
              +57 3015928421
              <img src="/images/whastapp-blue.png" />
            </div>
            <div className={styles["iconos-movil"]}>
              <div className={styles["phone-movil"]}>
                <img src="/images/blue-phone-movil.png" />
              </div>
              <div className={styles["wa-movil"]}>
                <img src="/images/whatsapp-green.png" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles["list-name"]}>
          <div className={styles["list-contact"]}>
            <div className={styles["contact"]}>
              <img src="/images/Ellipse 84.png" />
              <span className={`&{styles.badge} ${styles.red}`}>4</span>Amy Wine
              House
            </div>
            <div className={styles["reciente-col"]}>amywinehouse@gmail.com</div>
            <div className={styles["number"]}>
              +57 3015928421
              <img src="/images/whastapp-blue.png" />
            </div>
            <div className={styles["iconos-movil"]}>
              <div className={styles["phone-movil"]}>
                <img src="/images/blue-phone-movil.png" />
              </div>
              <div className={styles["wa-movil"]}>
                <img src="/images/whatsapp-green.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
