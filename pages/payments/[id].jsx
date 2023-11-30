import Link from "next/link";
import styles from "./styles.module.css";

const PaymentDetail = () => {
  return (
    <>
      <div className={styles["top-content"]}>
        <div className="container flex j-s a-c">
          <Link href={"/contacts"} className={`bg-ct ${styles["icon"]}`}></Link>
          <div className={styles["title"]}>Pagos </div>
        </div>
      </div>

      <div className={styles["pagos-section"]}>
        <div className="container">
          <div className={styles["separador"]}></div>
          <div className={styles["wrap-detalle"]}>
            <div className={styles["right"]}>
              <div className={styles["line"]}>
                <img src="/images/Ellipse 81.png" />
                <div className={styles["ver-line"]}></div>
              </div>

              <div className={styles["pendientes"]}>
                <div className={styles["pendiente-top"]}>
                  <span className={styles["tipo-sub"]}>Fontana Campestre</span>
                  <ul>
                    <li>Tipo 2 - apartamento 102</li>
                    <li>N° de cuotas: 8</li>
                  </ul>
                </div>
                <div className={styles["greybox"]}>
                  <div className={styles["info"]}>
                    <div className={styles["date"]}>17/01/22</div>
                    <div className={styles["aceptada"]}>
                      <img src="/images/aceptada.png" />
                      Cotización Aceptada
                    </div>
                    <div className={styles["pdf"]}>
                      <img src="/images/pdf-blue.png" />
                    </div>
                    <div className={styles["empty"]}></div>
                  </div>

                  <div className={styles["blue-point"]}></div>
                </div>
                <div className={styles["greybox"]}>
                  <div className={styles["info"]}>
                    <div className={styles["date"]}>17/01/22</div>
                    <div className={styles["aceptada"]}>
                      <img src="/images/card.png" />
                      Pago cuota N°1
                    </div>
                    <div className={styles["pdf"]}> $10.000.000</div>
                    <div className={styles["empty"]}>
                      Estado: <span className={styles["estado"]}>Pagado</span>
                    </div>
                  </div>

                  <div className={styles["blue-point"]}></div>
                </div>
                <div className={styles["greybox"]}>
                  <div className={styles["info"]}>
                    <div className={styles["date"]}>17/01/22</div>
                    <div className={styles["aceptada"]}>
                      <img src="/images/card.png" />
                      Pago cuota N°2
                    </div>
                    <div className={styles["pdf"]}> $10.000.000</div>
                    <div className={styles["empty"]}>
                      Estado: <span className={styles["estado"]}>Pagado</span>
                    </div>
                  </div>

                  <div className={styles["blue-point"]}></div>
                </div>
                <div className={styles["greybox"]}>
                  <div className={styles["info"]}>
                    <div className={styles["date"]}>17/01/22</div>
                    <div className={styles["aceptada"]}>
                      <img src="/images/card.png" />
                      Pago cuota N°3
                    </div>
                    <div className={styles["pdf"]}> $10.000.000</div>
                    <div className={styles["empty"]}>
                      Estado: <span className={styles["estado"]}>Pagado</span>
                    </div>
                  </div>

                  <div className={styles["blue-point"]}></div>
                </div>

                <div className={styles["box"]}>
                  <div className={styles["info"]}>
                    <div className={styles["date"]}>17/01/22</div>
                    <div className={styles["aceptada"]}>
                      <img src="/images/card.png" />
                      Pago cuota N°5
                    </div>
                    <div className={styles["pdf"]}> $10.000.000</div>
                    <div className={styles["empty"]}>Estado: Pendiente</div>
                  </div>

                  <div className={styles["grey-point"]}></div>
                </div>

                <div className={styles["box"]}>
                  <div className={styles["info"]}>
                    <div className={styles["date"]}>17/01/22</div>
                    <div className={styles["aceptada"]}>
                      <img src="/images/card.png" />
                      Pago cuota N°5
                    </div>
                    <div className={styles["pdf"]}> $10.000.000</div>
                    <div className={styles["empty"]}>Estado: Pendiente</div>
                  </div>

                  <div className={styles["grey-point"]}></div>
                </div>

                <div className={styles["box"]}>
                  <div className={styles["info"]}>
                    <div className={styles["date"]}>17/01/22</div>
                    <div className={styles["aceptada"]}>
                      <img src="/images/card.png" />
                      Pago cuota N°5
                    </div>
                    <div className={styles["pdf"]}> $10.000.000</div>
                    <div className={styles["empty"]}>Estado: Pendiente</div>
                  </div>

                  <div className={styles["grey-point"]}></div>
                </div>
              </div>
            </div>
            <div className={styles["pendientes-bottom"]}>
              <a button className={styles["transferir"]} href="#popup1">
                Transferir compra
              </a>
              <a button className={styles["seguimiento"]} href="#popup2">
                Ver Seguimiento
              </a>
            </div>
          </div>
          <div className={styles["wrap-detalle-movil"]}>
            <div className={styles["right"]}>
              <div className={styles["line"]}>
                <img src="/images/Ellipse 81.png" />
                <div className={styles["ver-line"]}></div>
              </div>

              <div className={styles["pendientes"]}>
                <div className={styles["pendiente-top"]}>
                  <span className={styles["tipo-sub"]}>Fontana Campestre</span>
                  <ul>
                    <li>Tipo 2 - apartamento 102</li>
                    <li>N° de cuotas: 8</li>
                  </ul>
                </div>
                <div className={styles["greybox"]}>
                  <div className={styles["info"]}>
                    <div className={styles["wrap-info-movil"]}>
                      <div className={styles["date"]}>17/01/22</div>
                      <div className={styles["aceptada-movil"]}>
                        <img src="/images/aceptada.png" />
                        Cotización Aceptada
                      </div>
                    </div>
                    <div className={styles["pdf-movil"]}>
                      <img src="/images/pdf-blue.png" />
                    </div>
                  </div>

                  <div className={styles["blue-point"]}></div>
                </div>
                <div className={styles["greybox"]}>
                  <div className={styles["info"]}>
                    <div className={styles["wrap-info-movil"]}>
                      <div className={styles["date-movil"]}>17/01/22</div>
                      <div className={styles["aceptada-movil"]}>
                        <img src="/images/card.png" />
                        Pago cuota N°1
                      </div>
                    </div>

                    <div className={styles["pdf"]}> $10.000.000</div>
                  </div>

                  <div className={styles["blue-point"]}></div>
                </div>
                <div className={styles["greybox"]}>
                  <div className={styles["info"]}>
                    <div className={styles["wrap-info-movil"]}>
                      <div className={styles["date-movil"]}>17/01/22</div>
                      <div className={styles["aceptada-movil"]}>
                        <img src="/images/card.png" />
                        Pago cuota N°2
                      </div>
                    </div>
                    <div className={styles["pdf"]}> $10.000.000</div>
                  </div>

                  <div className={styles["blue-point"]}></div>
                </div>
                <div className={styles["greybox"]}>
                  <div className={styles["info"]}>
                    <div className={styles["wrap-info-movil"]}>
                      <div className={styles["date-movil"]}>17/01/22</div>

                      <div className={styles["aceptada-movil"]}>
                        <img src="/images/card.png" />
                        Pago cuota N°3
                      </div>
                    </div>

                    <div className={styles["pdf"]}> $10.000.000</div>
                  </div>

                  <div className={styles["blue-point"]}></div>
                </div>

                <div className={styles["box"]}>
                  <div className={styles["info-movil"]}>
                    <div className={styles["wrap-info-movil"]}>
                      <div className={styles["date-movil"]}>17/01/22</div>

                      <div className={styles["aceptada-movil"]}>
                        <img src="/images/card.png" />
                        Pago cuota N°5
                      </div>
                    </div>

                    <div className={styles["pdf"]}> $10.000.000</div>
                  </div>

                  <div className={styles["grey-point"]}></div>
                </div>

                <div className={styles["box"]}>
                  <div className={styles["info"]}>
                    <div className={styles["wrap-info-movil"]}>
                      <div className={styles["date-movil"]}>17/01/22</div>

                      <div className={styles["aceptada-movil"]}>
                        <img src="/images/card.png" />
                        Pago cuota N°5
                      </div>
                    </div>

                    <div className={styles["pdf"]}> $10.000.000</div>
                  </div>

                  <div className={styles["grey-point"]}></div>
                </div>

                <div className={styles["box"]}>
                  <div className={styles["info-movil"]}>
                    <div className={styles["wrap-info-movil"]}>
                      <div className={styles["date-movil"]}>17/01/22</div>

                      <div className={styles["aceptada-movil"]}>
                        <img src="/images/card.png" />
                        Pago cuota N°5
                      </div>
                    </div>
                    <div className={styles["pdf"]}> $10.000.000</div>
                  </div>

                  <div className={styles["grey-point"]}></div>
                </div>
              </div>
            </div>
            <div className={styles["pendientes-bottom"]}>
              <a button className={styles["transferir"]}>
                Transferir compra
              </a>
              <a button className={styles["seguimiento"]}>
                Ver Seguimiento
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentDetail;
