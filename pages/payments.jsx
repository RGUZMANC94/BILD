import Link from "next/link";
import styles from "../styles/Payments.module.css";

const Payments = () => {
  return (
    <div className={styles["top-content"]}>
      <div className={styles["icon"]}></div>
      <div className={styles["title"]}>pagos</div>
      <div className={styles["title"]}>John Lenon</div>

      <div className={styles["pagos-section"]}>
        <Link href="/payments/1" className={styles["pagos-box"]}>
          <div className={styles["left-box"]}>
            <span className={styles["box-title"]}>Fontana Campestre</span>
            <span className={styles["box-subtitle"]}>
              TIPO 2 - Apartamento 102
            </span>
          </div>
          <div className={styles["right-box"]}>
            <div className={styles["icon"]}></div>
          </div>
          <div className={styles["line-filter"]}></div>
        </Link>
        <Link href="/payments/2" className={styles["pagos-box"]}>
          <div className={styles["left-box"]}>
            <span className={styles["box-title"]}>FOntana Campestre</span>
            <span className={styles["box-subtitle"]}>
              TIPO 2 - Apartamento 102
            </span>
          </div>
          <div className={styles["right-box"]}>
            <div className={styles["icon"]}></div>
          </div>
          <div className={styles["line-filter"]}></div>
        </Link>
        <Link href="/payments/3" className={styles["pagos-box"]}>
          <div className={styles["left-box"]}>
            <span className={styles["box-title"]}>Fontana Campestre</span>
            <span className={styles["box-subtitle"]}>
              TIPO 2 - Apartamento 102
            </span>
          </div>
          <div className={styles["right-box"]}>
            <div className={styles["icon"]}></div>
          </div>
          <div className={styles["line-filter"]}></div>
        </Link>
      </div>
    </div>
  );
};

export default Payments;
