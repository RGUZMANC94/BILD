import { useEffect, useState } from "react";
import styles from "./created.module.css";
import EventsOportunity from "../eventsOportunity";
import GenerateQuote from "../generateQuote";

const OportunityCreated = () => {
  const [showCreatedPop, setShowCreatedPop] = useState(false);
  const [generateQuote, setGenerateQuote] = useState(false);

  useEffect(() => {
    setShowCreatedPop(true);
    setTimeout(() => {
      setShowCreatedPop(false);
    }, 4000);
  }, []);

  return (
    <div className={styles["wrap-crear"]}>
      <div className={styles["crear"]}>
        <div className={styles["left-side"]}>
          <div className={styles["crear-tipo"]}>
            <div className={styles["creacion-title"]}>
              <span className={styles["tipo-title"]}>Fontana Campestre</span>
            </div>
            <div className={styles["tipo-unit"]}>
              <div className={styles["img-tipo"]}>
                <a href="#">
                  <img src="/images/crear-tipo.png" />
                </a>
              </div>
              <div className={styles["tipo-info"]}>
                <div className={styles["tipos"]}>
                  <span>TIPO 1 - 102, 103</span>
                  <span>TIPO 2 - 303, 305</span>
                </div>
                <span className={styles["valor"]}>
                  $120 millones - 160 millones
                </span>
                <div className={styles["detalles"]}>
                  <img src="/images/cards/bath.png"  />
                  <span>3-4</span>
                  <img src="/images/cards/bed.png"  />
                  <span>2-3</span>
                </div>
              </div>
              <div className={styles["add"]}></div>
            </div>
          </div>
          <div className={styles["contacto"]}>
            <div className={styles["conecta"]}>
              <button className={styles["contacto-existente"]}>
                Eliminar Oportunidad
              </button>
              <button
                className={styles["crear-cotizacion"]}
                onClick={() => {
                  setGenerateQuote(true);
                }}
              >
                Crear cotización
              </button>
            </div>
          </div>
        </div>
        <div className={styles["right-side"]}>
          {generateQuote ? (
            <GenerateQuote setGenerateQuote={setGenerateQuote} />
          ) : (
            <EventsOportunity />
          )}
        </div>
      </div>
      <div
        className={`${styles["message"]} ${
          showCreatedPop ? styles.showMiniPop : ""
        }`}
      >
        <img src="/images/check.png" />
        <span>Tu oportunidad se creo satisfactoriamente</span>
      </div>
    </div>
  );
};

export default OportunityCreated;
