import Link from "next/link";
import styles from "../styles/Quotes.module.css";

const Quotes = () => {
  return (
    <>
      <div className={styles["top-content"]}>
        <div className="container flex j-s a-c">
          <Link href={"/contacts"} className={`bg-ct ${styles["icon"]}`}></Link>
          <div className={styles["title"]}>Cotizaciones de John Lennon </div>
        </div>
      </div>
      <div className={styles["wrap-cotizaciones"]}>
        <div className={styles["buscador-contactos"]}>
          <input
            className={styles["buscar"]}
            type="search"
            placeholder="Buscar por nombre"
          />
        </div>
        <div className={styles["top-cotizaciones"]}>
          <div className={styles["nombre"]}>Nombre</div>
          <div className={styles["fecha"]}>Fecha de modificación</div>
          <div className={styles["tamaño"]}>Tamaño</div>
        </div>
        <div className={styles["listas-cotizaciones"]}>
          <div className={styles["nombre-lista"]}>
            <details className={styles["accordion"]}>
              <summary className={styles["accordion-btn"]}>
                FONTANA CAMPESTRE TIPO 1
              </summary>
              <div className={styles["accordion-content"]}>
                <div className={styles["file"]}>
                  <div className={styles["name-field"]}>
                    <input
                      type="radio"
                      className={styles["fold"]}
                      name="nickname-enabled"
                    />{" "}
                    John Lennon. TIPO 1.pdf
                  </div>
                  <div className={styles["fecha-field"]}>25/03/2023 5:35pm</div>
                  <div className={styles["size-field"]}>169.74KB</div>
                  <div className={styles["icons"]}>
                    <div className={styles["upload"]}>
                      <img src="images/upload.png" />
                    </div>
                    <div className={styles["delete"]}>
                      <img src="images/delete.png" />
                    </div>
                  </div>
                </div>

                <div className={styles["file"]}>
                  <div className={styles["name-field"]}>
                    <input
                      type="radio"
                      className={styles["fold"]}
                      name="nickname-enabled"
                    />{" "}
                    John Lennon. TIPO 2.pdf
                  </div>
                  <div className={styles["fecha-field"]}>25/03/2023 5:35pm</div>
                  <div className={styles["size-field"]}>169.74KB</div>
                  <div className={styles["icons"]}>
                    <div className={styles["upload"]}>
                      <img src="images/upload.png" />
                    </div>
                    <div className={styles["delete"]}>
                      <img src="images/delete.png" />
                    </div>
                  </div>
                </div>

                <div className={styles["file"]}>
                  <div className={styles["name-field"]}>
                    <input
                      type="radio"
                      className={styles["fold"]}
                      name="nickname-enabled"
                    />{" "}
                    John Lennon. TIPO 3.pdf
                  </div>
                  <div className={styles["fecha-field"]}>25/03/2023 5:35pm</div>
                  <div className={styles["size-field"]}>169.74KB</div>
                  <div className={styles["icons"]}>
                    <div className={styles["upload"]}>
                      <img src="images/upload.png" />
                    </div>
                    <div className={styles["delete"]}>
                      <img src="images/delete.png" />
                    </div>
                  </div>
                </div>

                <div className={styles["file"]}>
                  <div className={styles["name-field"]}>
                    <input
                      type="radio"
                      className={styles["fold"]}
                      name="nickname-enabled"
                    />{" "}
                    John Lennon. TIPO 4.pdf
                  </div>
                  <div className={styles["fecha-field"]}>25/03/2023 5:35pm</div>
                  <div className={styles["size-field"]}>169.74KB</div>
                  <div className={styles["icons"]}>
                    <div className={styles["upload"]}>
                      <img src="images/upload.png" />
                    </div>
                    <div className={styles["delete"]}>
                      <img src="images/delete.png" />
                    </div>
                  </div>
                </div>
              </div>
            </details>

            <details className={styles["accordion"]}>
              <summary className={styles["accordion-btn"]}>
                FONTANA CAMPESTRE TIPO 2
              </summary>
              <div className={styles["accordion-content"]}>
                <div className={styles["file"]}>
                  <input
                    type="radio"
                    className={styles["fold"]}
                    name="nickname-enabled"
                  />{" "}
                  John Lennon. TIPO 1.pdf
                </div>
                <div className={styles["file"]}>
                  {" "}
                  <input
                    type="radio"
                    className={styles["fold"]}
                    name="nickname-enabled"
                  />{" "}
                  John Lennon. TIPO 2.pdf
                </div>
                <div className={styles["file"]}>
                  {" "}
                  <input
                    type="radio"
                    className={styles["fold"]}
                    name="nickname-enabled"
                  />{" "}
                  John Lennon. TIPO 3.pdf
                </div>
                <div className={styles["file"]}>
                  {" "}
                  <input
                    type="radio"
                    className={styles["fold"]}
                    name="nickname-enabled"
                  />{" "}
                  John Lennon. TIPO 4.pdf
                </div>
              </div>
            </details>

            <details className={styles["accordion"]}>
              <summary className={styles["accordion-btn"]}>
                FONTANA CAMPESTRE TIPO 3
              </summary>
              <div className={styles["accordion-content"]}>
                <div className={styles["file"]}>
                  <input
                    type="radio"
                    className={styles["fold"]}
                    name="nickname-enabled"
                  />{" "}
                  John Lennon. TIPO 1.pdf
                </div>
                <div className={styles["file"]}>
                  {" "}
                  <input
                    type="radio"
                    className={styles["fold"]}
                    name="nickname-enabled"
                  />{" "}
                  John Lennon. TIPO 2.pdf
                </div>
                <div className={styles["file"]}>
                  {" "}
                  <input
                    type="radio"
                    className={styles["fold"]}
                    name="nickname-enabled"
                  />{" "}
                  John Lennon. TIPO 3.pdf
                </div>
                <div className={styles["file"]}>
                  {" "}
                  <input
                    type="radio"
                    className={styles["fold"]}
                    name="nickname-enabled"
                  />{" "}
                  John Lennon. TIPO 4.pdf
                </div>
              </div>
            </details>

            <details className={styles["accordion"]}>
              <summary className={styles["accordion-btn"]}>
                FONTANA CAMPESTRE TIPO 4
              </summary>
              <div className={styles["accordion-content"]}>
                <div className={styles["file"]}>
                  <input
                    type="radio"
                    className={styles["fold"]}
                    name="nickname-enabled"
                  />{" "}
                  John Lennon. TIPO 1.pdf
                </div>
                <div className={styles["file"]}>
                  {" "}
                  <input
                    type="radio"
                    className={styles["fold"]}
                    name="nickname-enabled"
                  />{" "}
                  John Lennon. TIPO 2.pdf
                </div>
                <div className={styles["file"]}>
                  {" "}
                  <input
                    type="radio"
                    className={styles["fold"]}
                    name="nickname-enabled"
                  />{" "}
                  John Lennon. TIPO 3.pdf
                </div>
                <div className={styles["file"]}>
                  {" "}
                  <input
                    type="radio"
                    className={styles["fold"]}
                    name="nickname-enabled"
                  />{" "}
                  John Lennon. TIPO 4.pdf
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quotes;
