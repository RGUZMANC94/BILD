import Link from 'next/link';
import styles from './styles.module.css';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Button from '../../components/button';

const PaymentDetail = () => {
  const router = useRouter();
  const { id } = useSelector((state) => state.userState);
  const [quotes, setQuotes] = useState(null);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [opportunitySelected, setOpportunitySelected] = useState(null);
  const [pdfURL, setPdfURL] = useState(null);
  const { contactListSelected } = useSelector(
    (state) => state.contactOpportunityState
  );
  const [errorMessage, setErrorMessage] = useState(null);

  console.log('dentro de opotunidades id:', router.query.id);

  const getPrices = async () => {
    const response = await fetch('/api/getQuote', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        idSaleOp: `${router.query.id}`,
        iddpf: '',
        idClient: '',
      }),
    });

    const quotesResponse = await response.json();
    console.log('dentro de Pagos:', quotesResponse);
    setQuotes(quotesResponse.find((pago) => pago.type === 'IV'));
  };

  useEffect(() => {
    if (updateFlag) {
      setUpdateFlag(false);
    }

    getPrices();
    getOpportunity();
  }, [updateFlag]);

  useEffect(() => {
    getPrices();
    getOpportunity();
  }, []);

  const payment = async (paidValue, dueNumber, iddpf) => {
    const datos = {
      payments: [
        {
          paidValue,
          dueNumber,
        },
      ],
    };
    console.log('datos:', datos);

    try {
      const oppUpdated = await fetch('/api/editPayment', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          iddpf,
          datos,
        }),
      });

      console.log('Tipo creado: ', oppUpdated);

      if (!oppUpdated.ok) {
        const errorMessage = await oppUpdated.text();
        console.log('Error FInal: ', errorMessage);
        try {
          const errorObj = JSON.parse(errorMessage);
          if (errorObj && errorObj.error) {
            const errorDescription = errorObj.error.match(
              /"Description":"([^"]*)"/
            )[1];
            const decodedErrorDescription = errorDescription.replace(
              /\\u[\dA-F]{4}/gi,
              (match) =>
                String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16))
            );
            console.log('Error Description:', decodedErrorDescription);
            setErrorMessage(decodedErrorDescription);
          } else {
            console.log('Error object or error property not found');
          }
        } catch (error) {
          console.log('Error parsing JSON:', error);
        }
        throw new Error(errorMessage);
      }

      const responseData = await oppUpdated.json();

      console.log('Payment updated:', responseData);

      document
        .querySelector(`.${styles.popSuccessCreated}`)
        .classList.add(styles.activePopUp);

      setTimeout(() => {
        // window.location.reload();
        setUpdateFlag(true);
        document
          .querySelector(`.${styles.popSuccessCreated}`)
          .classList.remove(styles.activePopUp);
      }, 2000);
    } catch (error) {
      document
        .querySelector(`.${styles.popError}`)
        .classList.add(styles.activePopUp);

      setTimeout(() => {
        document
          .querySelector(`.${styles.popError}`)
          .classList.remove(styles.activePopUp);
      }, 2000);
      console.error('Error al crear el proyecto:', error);
    }
  };

  const getOpportunity = async () => {
    const response = await fetch('/api/opportunities', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        idProject: '',
        idClient: contactListSelected.idCli,
        sorting: '',
      }),
    });

    console.log('dentro de opotunidades id:', router.query.id);

    const opportunitiesResponse = await response.json();
    console.log('dentro de opotunidades id:', opportunitiesResponse);
    setOpportunitySelected(
      opportunitiesResponse.find((opp) => opp.idSaleOp === router.query.id)
    );
  };

  console.log('Lista de pagos:', quotes);

  console.log('Lista de oportunidades:', opportunitySelected);

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
                <img
                  src={
                    opportunitySelected &&
                    (opportunitySelected.idClient.image.length > 0
                      ? opportunitySelected.idClient.image[0].url
                      : '/images/Ellipse 81.png')
                  }
                />
                <div className={styles['ver-line']}></div>
              </div>

              <div className={styles.pendientes}>
                {opportunitySelected && quotes && (
                  <div className={styles['pendiente-top']}>
                    <span
                      className={
                        styles['tipo-sub']
                      }>{`${opportunitySelected.nameProject}`}</span>
                    <span className={styles['tipo-direccion']}>
                      {`Tipo ${opportunitySelected.propertyType.propertyType} - ${opportunitySelected.idProperty}`}
                    </span>
                    <span
                      className={
                        styles['tipo-cuotas']
                      }>{`N° de cuotas: ${quotes.dues.length}`}</span>
                  </div>
                )}

                {opportunitySelected && (
                  <div
                    className={
                      opportunitySelected.stageCycleSaleOp === 'Separacion'
                        ? styles.box
                        : styles.greybox
                    }>
                    <div className={styles.info}>
                      <div className={styles.date}>
                        {quotes ? `${quotes.updatedDate.split(' ')[0]}` : ''}
                      </div>
                      <div className={styles.aceptada}>
                        <img src="/images/confirmed-deed.svg" />
                        {opportunitySelected.stageCycleSaleOp === 'Separacion'
                          ? 'Cotización Pendiente'
                          : 'Cotización Aceptada'}
                      </div>
                      <div
                        className={styles.pdf}
                        onClick={() => {
                          quotes.pdf.length
                            ? setPdfURL(quotes.pdf[0].url)
                            : setPdfURL(null);
                        }}>
                        <img src="/images/pdf-icon-white.svg" />
                      </div>
                      {opportunitySelected.stageCycleSaleOp ===
                        'Separacion' && (
                        <Button
                          buttonType={'primary'}
                          iconImage={false}
                          label={'Pago'}
                          inheritClass={styles.buttonPayment}
                          clickFunction={() =>
                            payment(
                              quotes.separationValue,
                              0,
                              quotes.idPortfolio
                            )
                          }
                        />
                      )}
                      <div className={styles.empty}></div>
                    </div>

                    <div className={styles['blue-point']}></div>
                  </div>
                )}

                {quotes && quotes.dues.length > 0
                  ? quotes.dues.map((quote, i) =>
                      Object.keys(quote).length > 4 ? (
                        <div className={styles.greybox} key={i}>
                          <div className={styles.info}>
                            <div
                              className={
                                styles.date
                              }>{`${quote.expirationDate}`}</div>
                            <div className={styles.aceptada}>
                              <img src="/images/card.svg" />
                              {`Pago cuota N°${quote.dueNumber}`}
                            </div>
                            <div
                              className={
                                styles.pdf
                              }>{`${quote.paymentValue}`}</div>
                            <div className={styles.empty}>
                              Estado:{' '}
                              <span className={styles.estado}>Pagado</span>
                            </div>
                          </div>

                          <div className={styles['blue-point']}></div>
                        </div>
                      ) : (
                        <div className={styles.box} key={i}>
                          <div className={styles.info}>
                            <div
                              className={
                                styles.date
                              }>{`${quote.expirationDate}`}</div>
                            <div className={styles.aceptada}>
                              <img src="/images/card.svg" />
                              {`Pago cuota N°${quote.dueNumber}`}
                            </div>
                            <div
                              className={
                                styles.pdf
                              }>{`$${quote.paymentValue}`}</div>
                            <div className={styles.empty}>
                              Estado: Pendiente
                              {opportunitySelected &&
                                opportunitySelected.stageCycleSaleOp ===
                                  'Cartera' && (
                                  <Button
                                    buttonType={'primary'}
                                    iconImage={false}
                                    label={'Pago'}
                                    inheritClass={styles.buttonPayment}
                                    clickFunction={() =>
                                      payment(
                                        quote.paymentValue,
                                        quote.dueNumber,
                                        quotes.idPortfolio
                                      )
                                    }
                                  />
                                )}
                            </div>
                          </div>

                          <div className={styles['grey-point']}></div>
                        </div>
                      )
                    )
                  : ''}
              </div>
              {pdfURL && (
                <div className={styles['iframe-popup']}>
                  <div className={styles['iframe-popup-content']}>
                    <button
                      onClick={() => setPdfURL(null)}
                      className={styles['iframe-close']}
                    />
                    <iframe
                      src={pdfURL}
                      width="100%"
                      height="100%"
                      frameBorder="0"
                    />
                  </div>
                </div>
              )}
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
      <div className={`${styles.popSuccessCreated}`}>
        <div className={styles.bgPopUp}></div>
        <div className={styles.popup2}>
          <div className={styles.content}>
            <div className={styles['icon-box']}>
              <img src="/images/check-circle.png" />
              <span className={styles['pop-text']}>
                ¡Tú Cotización ha sido aceptada con éxito!
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.popError}`}>
        <div className={styles.bgPopUp}></div>
        <div className={styles.popup3}>
          <div className={styles.content}>
            <div className={styles['icon-box']}>
              <img src="/images/error-circle.png" />
              <span className={styles['pop-text']}>
                <span className={styles['pop-text-bold']}>¡Oops!</span>{' '}
                {`Algo no
                está bien.${
                  errorMessage
                    ? `\n${errorMessage}`
                    : '\nPor favor, revisa los datos ingresados e inténtalo denuevo'
                }.`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentDetail;
