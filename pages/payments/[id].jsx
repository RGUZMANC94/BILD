import Link from 'next/link';
import styles from './styles.module.css';

const PaymentDetail = () => {
  return (
    <>
      <div className={styles['top-content']}>
        <div className="container flex j-s a-c">
          <Link href={'/payments'} className={`bg-ct ${styles.icon}`}></Link>
          <div className={styles.title}>Pagos </div>
        </div>
      </div>

      <div className={styles['pagos-section']}>
        <div className="container">
          <div className={styles.separador}></div>
          <div className={styles['wrap-detalle']}>
            <div className={styles['pendiente-top-movil']}>
              <span className={styles['tipo-sub']}>Fontana Campestre</span>
              <span className={styles['tipo-direccion']}>
                Tipo 2 - apartamento 102
              </span>
              <span className={styles['tipo-cuotas']}>N° de cuotas: 8</span>
            </div>

            <div className={styles.right}>
              <div className={styles.line}>
                <img src="/images/Ellipse 81.png" />
                <div className={styles['ver-line']}></div>
              </div>

              <div className={styles.pendientes}>
                <div className={styles['pendiente-top']}>
                  <span className={styles['tipo-sub']}>Fontana Campestre</span>
                  <span className={styles['tipo-direccion']}>
                    Tipo 2 - apartamento 102
                  </span>
                  <span className={styles['tipo-cuotas']}>N° de cuotas: 8</span>
                </div>
                <div className={styles.greybox}>
                  <div className={styles.info}>
                    <div className={styles.date}>17/01/22</div>
                    <div className={styles.aceptada}>
                      <img src="/images/confirmed-deed.svg" />
                      Cotización Aceptada
                    </div>
                    <div className={styles.pdf}>
                      <img src="/images/pdf-icon-white.svg" />
                    </div>
                    <div className={styles.empty}></div>
                  </div>

                  <div className={styles['blue-point']}></div>
                </div>
                <div className={styles.greybox}>
                  <div className={styles.info}>
                    <div className={styles.date}>17/01/22</div>
                    <div className={styles.aceptada}>
                      <img src="/images/card.svg" />
                      Pago cuota N°1
                    </div>
                    <div className={styles.pdf}> $10.000.000</div>
                    <div className={styles.empty}>
                      Estado: <span className={styles.estado}>Pagado</span>
                    </div>
                  </div>

                  <div className={styles['blue-point']}></div>
                </div>
                <div className={styles.greybox}>
                  <div className={styles.info}>
                    <div className={styles.date}>17/01/22</div>
                    <div className={styles.aceptada}>
                      <img src="/images/card.svg" />
                      Pago cuota N°2
                    </div>
                    <div className={styles.pdf}> $10.000.000</div>
                    <div className={styles.empty}>
                      Estado: <span className={styles.estado}>Pagado</span>
                    </div>
                  </div>

                  <div className={styles['blue-point']}></div>
                </div>
                <div className={styles.greybox}>
                  <div className={styles.info}>
                    <div className={styles.date}>17/01/22</div>
                    <div className={styles.aceptada}>
                      <img src="/images/card.svg" />
                      Pago cuota N°3
                    </div>
                    <div className={styles.pdf}> $10.000.000</div>
                    <div className={styles.empty}>
                      Estado: <span className={styles.estado}>Pagado</span>
                    </div>
                  </div>

                  <div className={styles['blue-point']}></div>
                </div>

                <div className={styles.box}>
                  <div className={styles.info}>
                    <div className={styles.date}>17/01/22</div>
                    <div className={styles.aceptada}>
                      <img src="/images/card.svg" />
                      Pago cuota N°5
                    </div>
                    <div className={styles.pdf}> $10.000.000</div>
                    <div className={styles.empty}>Estado: Pendiente</div>
                  </div>

                  <div className={styles['grey-point']}></div>
                </div>

                <div className={styles.box}>
                  <div className={styles.info}>
                    <div className={styles.date}>17/01/22</div>
                    <div className={styles.aceptada}>
                      <img src="/images/card.svg" />
                      Pago cuota N°5
                    </div>
                    <div className={styles.pdf}> $10.000.000</div>
                    <div className={styles.empty}>Estado: Pendiente</div>
                  </div>

                  <div className={styles['grey-point']}></div>
                </div>

                <div className={styles.box}>
                  <div className={styles.info}>
                    <div className={styles.date}>17/01/22</div>
                    <div className={styles.aceptada}>
                      <img src="/images/card.svg" />
                      Pago cuota N°5
                    </div>
                    <div className={styles.pdf}> $10.000.000</div>
                    <div className={styles.empty}>Estado: Pendiente</div>
                  </div>

                  <div className={styles['grey-point']}></div>
                </div>
              </div>
            </div>
            <div className={styles['pendientes-bottom']}>
              <a button className={styles.transferir} href="#popup1">
                Transferir compra
              </a>
              <a button className={styles.seguimiento} href="#popup2">
                Ver Seguimiento
              </a>
            </div>
          </div>
          {/* movil anterior*/}
        </div>
      </div>
    </>
  );
};

export default PaymentDetail;
