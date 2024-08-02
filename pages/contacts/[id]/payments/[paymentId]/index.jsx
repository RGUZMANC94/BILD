import Link from 'next/link';
import styles from './styles.module.css';
// import { useSelector } from 'react-redux';
import Loader from '../../../../../components/lodaer';
import { useRouter } from 'next/router';
import { useState, useEffect , useContext } from 'react';
import Button from '../../../../../components/button';
import { parseCookies } from '../../../../../utils/parseCookies';
import Portal from '../../../../../HOC/portal';
import SuccessPopUp from '../../../../../components/successPopUp';
import ErrorPopUp from '../../../../../components/errorPopUp';
import BildContext from '../../../../../components/context/index';

export const getServerSideProps = async ({
  req: {
    headers: { cookie },
  },
  query: { id, paymentId },
}) => {
  const { user_tk } = parseCookies(cookie);
  const { user } = JSON.parse(user_tk);
  try {
    const response = await fetch(
      `http://44.206.53.75/Sales-1.0/REST_Index.php/backend/GetPrice?username=${user.userid}&idSaleOp=${paymentId}&iddpf=&idClient=`
    );
    if (!response.ok) {
      throw new Error('Bad response from server');
    }
    const resQuotes = await response.json();
    const filterQuote = resQuotes.find((pago) => pago.type === 'IV');
    const responseContact = await fetch(
      `http://44.206.53.75/Sales-1.0/REST_Index.php/backend/GetContact?idclient=${id}&username=${user.userid}`
    );
    if (!response.ok) {
      throw new Error('Bad response from server');
    }
    const contact = await responseContact.json();
    contact[0].idCli = id;
    return {
      props: {
        filterQuote,
        user,
        contact,
        idClient: id,
        paymentId,
      },
    };
  } catch (error) {
    return {
      props: {
        error: 'Error in request',
      },
    };
  }
};

const PaymentDetail = ({ filterQuote, user, contact, idClient, paymentId }) => {
  const router = useRouter();
  const { userid: id } = user;
  const [quotes, setQuotes] = useState(filterQuote);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [opportunitySelected, setOpportunitySelected] = useState(null);
  const [pdfURL, setPdfURL] = useState(null);
  const contactListSelected = contact[0];
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [succesPayment, setSuccesPayment] = useState(0);
  const { isDark } = useContext(BildContext);

  console.log(router);

  console.log('dentro de opotunidades id:', router.query.id);

  const getPrices = async () => {
    setLoading((prevState) => true);
    const response = await fetch('/api/getQuote', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        idSaleOp: `${paymentId}`,
        iddpf: '',
        idClient: '',
      }),
    });

    const quotesResponse = await response.json();
    setLoading((prevState) => false);
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
    // getPrices();
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
      setLoading((prevState) => true);
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
        setSuccesPayment((preState) => 3);
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
      setLoading((prevState) => false);
      console.log('Payment updated:', responseData);
      setSuccesPayment((preState) => 1);

      setTimeout(() => {
        setUpdateFlag((prevState) => true);
        setTimeout(() => {
          setSuccesPayment((preState) => 0);
        }, 1000);
      }, 2000);
    } catch (error) {
      setSuccesPayment((preState) => 2);
      setTimeout(() => {
        setTimeout(() => {
          setSuccesPayment((preState) => 0);
        }, 1000);
      }, 2000);
      console.error('Error al crear el proyecto:', error);
    }
  };

  const getOpportunity = async () => {
    setLoading((prevState) => true);
    const response = await fetch('/api/opportunities', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        idProject: '',
        idClient,
        sorting: '',
      }),
    });

    console.log('dentro de opotunidades id:', paymentId);

    const opportunitiesResponse = await response.json();
    setLoading((prevState) => false);
    console.log('dentro de opotunidades id:', opportunitiesResponse);
    setOpportunitySelected(
      opportunitiesResponse.find((opp) => opp.idSaleOp === paymentId)
    );
  };

  console.log('Lista de pagos:', quotes);

  console.log('Lista de oportunidades:', opportunitySelected);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className={`${styles['top-content']} bg-sub-header`}>
        <div className="container flex j-s a-c">
          <Link
            href={`/contacts/${idClient}/payments`}
            className={`bg-ct ${styles.icon} bg-[url(/images/light/back.png)] dark:bg-[url(/images/back.svg)]`}></Link>
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
                <div className={`${styles['ver-line']} border-r-[1px] border-solid border-light-3`}></div>
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
                    className={`bg-card ${ opportunitySelected.stageCycleSaleOp === 'Separacion'
                        ? styles.box
                        : styles.greybox}`
                     
                    }>
                    <div className={styles.info}>
                      <div className={styles.date}>
                        {quotes ? `${quotes.updatedDate.split(' ')[0]}` : ''}
                      </div>
                      <div className={styles.aceptada}>
                        <img className={`${!isDark && 'invert-filter'}`} src="/images/confirmed-deed.svg" />
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
                        <img className={`${!isDark && 'invert-filter'}`} src="/images/pdf-icon-white.svg" />
                      </div>

                      <div className={styles.empty}>
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
                      </div>
                    </div>

                    <div className={`${styles['blue-point']} bg-light-4 dark:bg-light-1`}></div>
                  </div>
                )}

                {quotes && quotes.dues.length > 0
                  ? // eslint-disable-next-line no-confusing-arrow
                    quotes.dues.map((quote, i) =>
                      Object.keys(quote).length > 4 ? (
                        <div className={styles.greybox} key={i}>
                          <div className={styles.info}>
                            <div
                              className={
                                styles.date
                              }>{`${quote.expirationDate}`}</div>
                            <div className={styles.aceptada}>
                              <img className={`${!isDark && 'invert-filter'}`} src="/images/card.svg" />
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

                          <div className={`${styles['blue-point']} bg-light-3 dark:bg-light-4`}></div>
                        </div>
                      ) : (
                        <div className={styles.box} key={i}>
                          <div className={styles.info}>
                            <div
                              className={
                                styles.date
                              }>{`${quote.expirationDate}`}</div>
                            <div className={styles.aceptada}>
                              <img className={`${!isDark && 'invert-filter'}`} src="/images/card.svg" />
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

                          <div className={`${styles['grey-point']} bg-light-3 dark:bg-light-1`}></div>
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
              <Button
                buttonType={'secondary'}
                iconImage={false}
                label={'Transferir compra'}
                inheritClass={styles.transferir}
                clickFunction={console.log('')}></Button>
              <Button
                buttonType={'primary'}
                iconImage={false}
                label={'Ver Seguimiento'}
                inheritClass={styles.transferir}
                clickFunction={console.log('')}></Button>
            </div>
          </div>
          {/* movil anterior*/}
        </div>
      </div>
      <Portal>
        {succesPayment === 1 && (
          <SuccessPopUp
            message={'¡Tú cotización ha sido creada con éxito!'}></SuccessPopUp>
        )}
        {succesPayment === 2 && (
          <ErrorPopUp errorMessage={errorMessage}></ErrorPopUp>
        )}
        {succesPayment === 3 && <Loader />}
      </Portal>
    </>
  );
};

export default PaymentDetail;
