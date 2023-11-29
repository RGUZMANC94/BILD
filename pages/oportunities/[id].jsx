import CreateOportunity from "../../components/createOportunity";
import { openPopUp } from "../../redux/popUpOportunity";
import styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Oprtunities = () => {
  const dispatch = useDispatch();
  const { openPopUpOportunity } = useSelector(
    (state) => state.popUpOportunityState
  );
  return (
    <>
      <section className={styles["main"]}>
        <div className={styles["top-content"]}>
          <div className={styles["icon"]}>
            <i className="fa-solid fa-angle-left"></i>
          </div>
          <div className={styles["title"]}>Oportunidades de John Lennon </div>
        </div>

        <div className={styles["oportunidades"]}>
          <div className={styles["tipo"]}>
            <div className={`${styles["tipo-unit"]} ${styles.active}`}>
              <div className={styles["img-tipo"]}>
                <img src="/images/tipo-1.png" />
                <div className={styles["zoom"]}></div>
              </div>
              <div className={styles["tipo-info"]}>
                <span className={styles["tipo-title"]}>Fontana Campestre</span>
                <span className={styles["tipo-sub"]}>TIPO 1 - 302</span>
                <div className={styles["detalles"]}>Seguimiento: 23/05/23</div>
              </div>
              <div className={styles["back"]}></div>
            </div>
            <div className={styles["tipo-unit"]}>
              <div className={styles["img-tipo"]}>
                <img src="/images/tipo-1.png" />
                <div className={styles["zoom"]}></div>
              </div>
              <div className={styles["tipo-info"]}>
                <span className={styles["tipo-title"]}>Fontana Campestre</span>
                <span className={styles["tipo-sub"]}>TIPO 1 - 302</span>
                <div className={styles["detalles"]}>Seguimiento: 23/05/23</div>
              </div>
              <div className={styles["back"]}></div>
            </div>
            <div className={styles["tipo-unit"]}>
              <div className={styles["img-tipo"]}>
                <img src="/images/tipo-1.png" />
                <div className={styles["zoom"]}></div>
              </div>
              <div className={styles["tipo-info"]}>
                <span className={styles["tipo-title"]}>Fontana Campestre</span>
                <span className={styles["tipo-sub"]}>TIPO 1 - 302</span>
                <div className={styles["detalles"]}>Seguimiento: 23/05/23</div>
              </div>
              <div className={styles["back"]}></div>
            </div>
          </div>
          <div className={styles["wrap-right"]}>
            
            <div className={styles["right"]}>
              <div className={styles["line"]}>
                <img src="/images/Ellipse 81.png" />
                <div className={styles["ver-line"]}></div>
              </div>

              <div className={styles["pendientes"]}>
                <div className={styles["pendiente-top"]}>
                  <span className={styles["tipo-sub"]}>John Lennon</span>
                  <ul className={styles.ulNode}>
                    <li>Fontana Campestre</li>
                    <li>Tipo 2:302</li>
                  </ul>
                </div>
                <div className={styles["greybox"]}>
                  <div className={styles["info"]}>
                    <label>
                      <input
                        className={styles.input}
                        type="checkbox"
                        name="cb-terminosservicio"
                        required
                      />{" "}
                      <span>05/01/22</span>
                    </label>
                    <ul>
                      <li className={styles["pendiente-list"]}>
                        <b>Pendiente 3:</b>
                      </li>
                      <li>Entregar la información de documentación</li>
                    </ul>
                  </div>
                  <div className={styles["time"]}>
                    <span className={styles["hour"]}>11:07 am</span>
                  </div>
                  <div className={styles["blue-point"]}></div>
                </div>

                <div className={styles["box-dotted"]}>
                  <div className={styles["blue-point-plus"]}>3+</div>
                </div>

                <div className={styles["box"]}>
                  <span>05/01/22</span>
                  <ul>
                    <li className={styles["pendiente-list"]}>
                      Creación del Contacto
                    </li>
                    <li>Visita en la sala de ventas</li>
                  </ul>
                  <div className={styles["blue-point"]}></div>
                </div>
              </div>
              <div className={styles["pendientes-bottom"]}>
                <button
                  className={styles["ver-oportunidad"]}
                  onClick={() => dispatch(openPopUp(true))}
                >
                  Ver Oportunidad
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
      {openPopUpOportunity && <CreateOportunity created={true} />}
    </>
  );
};

export default Oprtunities;
