import Link from "next/link";
import styles from "../styles/Contacts.module.css";

const Contacts = () => {
  const contacts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const recentContacts = [1, 2, 3];
  return (
    <section className={styles["main-contain-contact"]}>
      <div className="container">
        <Link
          className={styles["crear-contacto"]}
          href="/create-contact"
        ></Link>
        <div className={styles["contact-top"]}>
          <div className={styles["nombre"]}>Nombre</div>
          <div className={styles["mail"]}>Correo Electrónico</div>
          <div className={styles["numero"]}>Número de contacto</div>
        </div>
        <div className={styles["listas"]}>
          <div className={styles["reciente"]}>Creados Recientemente (2)</div>
          {recentContacts.map((recent, i) => (
            <div className={styles["list-name"]} key={i}>
              <Link href={`/buyer/${i}`}>
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
                      <img src="/images/whatsapp-contacts.png" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className={styles["listas"]}>
          <div className={styles["reciente"]}>Contactos (52)</div>
          {contacts.map((contact, i) => (
            <div className={styles["list-name"]} key={i}>
              <Link href={`/buyer/${i}`}>
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
                      <img src="/images/whatsapp-contacts.png" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contacts;
