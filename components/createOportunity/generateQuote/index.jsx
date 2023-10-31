import styles from "./quote.module.css";

const GenerateQuote = ({ setGenerateQuote }) => {
  return (
    <div className={styles["generar-cotizacion"]}>
      <span className={styles["title"]}>GENERAR COTIZACIÓN</span>
      <div className={styles["seleccion"]}>
        <div className={styles["origen"]}>
          <span className={styles["text-origen"]}>Tipo:</span>
          <div className={styles["elegir-seleccion"]}>
            <span className={styles["label"]}></span>
            <label for="subject"></label>
            <select
              placeholder="Subject line"
              name="subject"
              className={styles["subject_input"]}
              required
            >
              <option disabled hidden selected>
                2
              </option>
              <option>Opción 1</option>
              <option>Opción 2</option>
              <option>Opción 3</option>
            </select>
          </div>
        </div>
        <div className={styles["origen"]}>
          <span className={styles["text-origen"]}>Apto:</span>
          <div className={styles["elegir-seleccion"]}>
            <span className={styles["label"]}></span>
            <label for="subject"></label>
            <select
              placeholder="Subject line"
              name="subject"
              className={styles["subject_input"]}
              required
            >
              <option disabled hidden selected>
                2
              </option>
              <option>Opción 1</option>
              <option>Opción 2</option>
              <option>Opción 3</option>
            </select>
          </div>
        </div>
      </div>
      <div className={styles["cotizacion-form"]}>
        <div className={styles["lado-a"]}>
          <div className={styles["separacion"]}>
            <span className={styles["title-separacion"]}>Separación</span>
          </div>
        </div>
        <div className={styles["lado-b"]}>
          <fieldset>
            <input
              className={styles.inputQuote}
              type="text"
              name="separacion"
              placeholder="3'000.000"
            />
          </fieldset>
        </div>
      </div>
      <div className={styles["cotizacion-form"]}>
        <div className={styles["lado-c"]}>
          <span className={styles["title-separacion"]}>Cuota Inicial</span>
          <br />
          <span className={styles["title-separacion"]}>
            (Incluye separación)
          </span>
        </div>
        <div className={styles["lado-d"]}>
          <fieldset>
            <input
              className={styles.inputQuote}
              type="text"
              name="separacion"
              placeholder="3'000.000"
            />
          </fieldset>
        </div>
      </div>
      <div className={styles["cotizacion-form"]}>
        <div className={styles["lado-a"]}>
          <span className={styles["title-separacion"]}>
            Saldo cuota inicial
          </span>
        </div>
        <div className={styles["lado-b"]}>
          <span className={styles["title-saldo"]}>37&apos;000.000</span>
        </div>
      </div>
      <div className={styles["cotizacion-form"]}>
        <div className={styles["lado-a"]}>
          <span className={styles["title-separacion"]}>
            Número cuotas mensuales
          </span>
          <br />
        </div>
        <div className={styles["lado-b"]}>
          <select
            placeholder="Subject line"
            name="subject"
            className={styles["subject_input"]}
            required
          >
            <option disabled hidden selected>
              2
            </option>
            <option>Opción 1</option>
            <option>Opción 2</option>
            <option>Opción 3</option>
          </select>
        </div>
      </div>

      <label>
        <input
          className={`${styles.inputQuote} ${styles["cuotas"]}`}
          type="checkbox"
          name="cb-terminosservicio"
          required
        />
        Ver detalle de cuotas
      </label>
      <br />
      <div className={styles["cotizacion-form"]}>
        <div className={styles["lado-c"]}>
          <span className={styles["title-separacion"]}>
            Valor cuota mensual
          </span>
        </div>
        <div className={styles["lado-d"]}>
          <span className={styles["title-saldo"]}>9&apos;375.000</span>
        </div>
      </div>
      <div className={styles["cotizacion-form"]}>
        <div className={styles["lado-c"]}>
          <span className={styles["title-separacion"]}>Saldo apartamento</span>
        </div>
        <div className={styles["lado-d"]}>
          <span className={styles["title-saldo"]}>94&apos;375.000</span>
        </div>
      </div>
      <div className={styles["checked"]}>
        <label>
          <input
            className={`${styles.inputQuote} ${styles["cuotas"]}`}
            type="checkbox"
            name="cb-terminosservicio"
            required
          />
          Enviar link de pago
          <img src="/images/link-pago.png" />
        </label>
      </div>
      <div className={styles["cotizacion-form"]}>
        <div className={styles["lado-e"]}>
          <span className={styles["title-separacion"]}>COMPARTIR</span>
        </div>
      </div>
      <div className={styles["cotizacion-form"]}>
        <div className={styles["lado-c"]}>
          <img src="/images/mail.png" />
          <span className={styles["title-separacion"]}>MAIL</span>
        </div>
        <div className={styles["lado-d"]}>
          <img src="/images/whatsapp.png" />
          <span
            className={styles["title-separacion"]}
            onClick={() => {
              setGenerateQuote(false);
            }}
          >
            WHATSAPP
          </span>
        </div>
      </div>
    </div>
  );
};

export default GenerateQuote;
