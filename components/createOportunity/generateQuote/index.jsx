import { Range, getTrackBackground } from "react-range";
import styles from "./quote.module.css";
import { useState } from "react";

const GenerateQuote = ({ setGenerateQuote }) => {
  const [values, setValues] = useState([50]);
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
          <span className={`full-width ${styles["title-separacion"]}`}>
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

      <div className={`flex j-sb a-c ${styles.outerRange}`}>
        <Range
          values={values}
          step={5}
          min={0}
          max={100}
          // rtl={rtl}
          onChange={(values) => setValues(values)}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "36px",
                display: "flex",
                width: "calc(100% - 80px)",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "12px",
                  width: "100%",
                  background: getTrackBackground({
                    values,
                    colors: ["#D9D9D9", "#D9D9D9"],
                    min: 0,
                    max: 100,
                    // rtl,
                  }),
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "35px",
                width: "56px",
                borderRadius: "3px",
                backgroundColor: "#2467FF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
            </div>
          )}
        />
        <div className={styles["labelRangePercenth"]}>{`${values}%`}</div>
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

      <label className="flex j-c a-c">
        <input
          className={`${styles.inputQuote} ${styles["cuotas"]}`}
          type="checkbox"
          name="cb-terminosservicio"
          required
        />
        <div className={styles["checkboxMask"]}></div>
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
        <label className="flex j-c a-c">
          <input
            className={`${styles.inputQuote} ${styles["cuotas"]}`}
            type="checkbox"
            name="cb-terminosservicio"
            required
          />
          <div className={styles["checkboxMask"]}></div>
          Enviar link de pago
          <img src="/images/link-pago.png" className={styles.arrowImage} />
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
