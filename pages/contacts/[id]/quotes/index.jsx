import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import styles from '../../../../styles/Quotes.module.css';
import SquareInput from '../../../../components/squareInput';
import { parseCookies } from '../../../../utils/parseCookies';
import { useFetch } from '../../../../hooks/useFetch';
import Loader from '../../../../components/lodaer';
import BildContext from '../../../../components/context';
import { useContext } from 'react';
import Portal from '../../../../HOC/portal';
import SuccessPopUp from '../../../../components/successPopUp';
import ErrorPopUp from '../../../../components/errorPopUp';

export const getServerSideProps = async ({
  req: {
    headers: { cookie },
  },
  query: id,
}) => {
  const { user_tk } = parseCookies(cookie);
  return { props: { user: JSON.parse(user_tk), queryId: id } };
};

const Quotes = ({ queryId }) => {
  const { initialState, isDark } = useContext(BildContext);
  const { user } = initialState;
  const { userid: id } = user;
  const { id: idClient } = queryId;
  const { contactListSelected } = useSelector(
    (state) => state.contactOpportunityState
  );
  const [fileIndex, setFileIndex] = useState([]);
  const [urlIndex, setUrlIndex] = useState([]);
  const [quotes, setQuotes] = useState(null);
  const [allOpportunities, setAllOpportunities] = useState(null);
  const [seleccion, setSeleccion] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [showPDF, setShowPDF] = useState(true);
  const [pdfURL, setPdfURL] = useState(null);
  const [errorShown, setErrorShown] = useState(null);
  const [selectCheckboxes, setSelectCheckboxes] = useState(true);
  const [successPopUp, setSuccessPopUp] = useState(0);

  const addCheckboxChange = (index, paymentUrl) => {
    if (fileIndex.includes(index)) {
      const fileIndexActualizados = fileIndex.filter((num) => num !== index);
      setFileIndex(fileIndexActualizados);
      if (paymentUrl !== '') {
        const urlIndexActualizados = urlIndex.filter(
          (url) => url !== paymentUrl
        );
        setUrlIndex(urlIndexActualizados);
      }
    } else {
      setFileIndex([...fileIndex, index]);
      if (paymentUrl !== '') {
        setUrlIndex([...urlIndex, paymentUrl]);
      }
    }
  };

  const getPrices = async () => {
    const response = await fetch('/api/getQuote', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        idSaleOp: '',
        iddpf: '',
        idClient,
      }),
    });

    const quotesResponse = await response.json();
    console.log('dentro de Pagos:', quotesResponse);
    console.log('dentro de Pagos:', quotesResponse.length);
    if (quotesResponse.length) {
      setQuotes(quotesResponse.filter((pago) => pago.type === 'PR'));
      console.log(
        'cotizaciones filtradas:',
        quotesResponse.find((pago) => pago.type === 'PR')
      );
    } else {
      setQuotes([]);
      setErrorShown(`${quotesResponse.Description}`);
    }
  };

  useEffect(() => {
    getPrices();
  }, []);

  useEffect(() => {
    getPrices();
    // if (refreshFlag) {
    //   setRefreshFlag(false);
    // }
  }, [refreshFlag]);

  const groupByProjectName = (array) => {
    const groupedArray = array.reduce((result, current) => {
      const projectName = current.projectName;

      if (!result[projectName]) {
        result[projectName] = [];
      }

      result[projectName].push(current);
      return result;
    }, {});

    return Object.entries(groupedArray).map(([projectName, payments]) => ({
      projectName,
      payments,
    }));
  };
  useEffect(() => {
    if (quotes) {
      setSeleccion(groupByProjectName(quotes));
    }
  }, [quotes]);

  console.log('Seleccion:', seleccion);

  const deleteQuote = async (idport) => {
    try {
      const quoteDeleted = await fetch('/api/deletePayment', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          iddpf: idport,
        }),
      });

      console.log('Quote deleted: ', quoteDeleted);

      if (!quoteDeleted.ok) {
        throw new Error('Failed to delete Quote');
      }

      const responseData = await quoteDeleted.json();

      console.log('Quote deleted:', responseData);

      setSuccessPopUp((preState) => 1);

      setTimeout(() => {
        setRefreshFlag((prevState) => !prevState);
        setTimeout(() => {
          setSuccessPopUp((preState) => 0);
        }, 1000);
      }, 2000);
    } catch (error) {
      setSuccessPopUp((preState) => 2);

      setTimeout(() => {
        setTimeout(() => {
          setSuccessPopUp((preState) => 0);
        }, 1000);
      }, 2000);
      console.error('Error al Borrar cuota:', error);
    }
  };

  const chainedDelete = async (arr) => {
    const chainedRes = await Promise.all(
      arr.map(async (idport) => {
        return await deleteQuote(idport);
      })
    );
    setFileIndex([]);
  };

  const downloadSeletion = () => {
    urlIndex.forEach(function (value, idx) {
      const response = {
        file: value,
      };
      setTimeout(() => {
        window.location.href = response.file;
      }, idx * 100);
    });
  };

  const downloadAllFiles = () => {
    urlIndex.forEach((URL) => window.open(URL));
  };

  const {
    data: contactInfo,
    isPending,
    error,
  } = useFetch({
    url: '/api/getContactInfo',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      idclient: idClient,
    }),
  });

  if (isPending || !contactInfo || contactInfo.length === 0 || error) {
    return <Loader />;
  }

  return (
    <>
      <div className={`${styles['top-content']} bg-sub-header`}>
        <div className="container flex j-s a-c">
          <Link
            href={`/contacts/${idClient}`}
            className={`bg-ct ${styles.icon} bg-[url(/images/light/back.png)] dark:bg-[url(/images/back.svg)]`}></Link>
          <div
            className={`${styles.title} font-black`}>{`Cotizaciones de ${contactInfo[0].firstNames} ${contactInfo[0].lastNames}`}</div>
          <div className={styles['title-movil']}>Cotizaciones</div>
        </div>
      </div>
      <div className={styles['wrap-cotizaciones']}>
        <div className={styles['buscador-contactos']}>
          <input
            className={styles.buscar}
            type="search"
            placeholder="Buscar por nombre"
          />
        </div>
        <div className={styles['top-cotizaciones']}>
          <div className={`font-black ${styles.nombre}`}>Nombre</div>
          <div className={`font-black ${styles.fecha}`}>
            Fecha de modificación
          </div>
          <div className={`font-black ${styles['tamaño']}`}>Tamaño</div>
        </div>
        <div className={styles['listas-cotizaciones']}>
          <div className={styles['nombre-lista']}>
            {seleccion &&
              seleccion.map((project, i) => (
                <details className={styles.accordion} key={i}>
                  <summary
                    className={`${styles['accordion-btn']} dark:after:bg-[url(/images/arrow-tipo-down.svg)] after:bg-[url(/images/arrow_select.png)]  bg-light-2 shadow-md dark:bg-dark-2`}>
                    {`${project.projectName}`}
                  </summary>
                  <div className={styles['accordion-content']}>
                    {project.payments.map((payment, i) => (
                      <div className={styles.file} key={i}>
                        <div className={styles['name-field']}>
                          <div className={styles['checkbox-container']}>
                            <SquareInput
                              onChangeFunct={() =>
                                addCheckboxChange(
                                  payment.idPortfolio,
                                  payment.pdf.length ? payment.pdf[0].url : ''
                                )
                              }
                              selectCheckboxes={selectCheckboxes}
                            />
                          </div>

                          <img
                            src={
                              isDark
                                ? '/images/pdf-icon-white.svg'
                                : '/images/pdf.png'
                            }
                          />
                          <span
                            className={styles.nameQuote}
                            onClick={() => {
                              payment.pdf.length
                                ? setPdfURL(payment.pdf[0].url)
                                : setPdfURL(null);
                            }}>{`TIPO ${payment.propertyType}-${payment.nameTypeProperty}.pdf`}</span>
                        </div>
                        <div
                          className={
                            styles['fecha-field']
                          }>{`${payment.createdDate}`}</div>
                        <div className={styles['size-field']}>
                          169.74KB {`${payment.numberPayments}`}
                        </div>
                        <div className={styles['movil-info']}>
                          <div className={styles['size-field-movil']}>
                            169.74KB {`${payment.numberPayments}`}
                          </div>
                          <span className={styles['separator-movil']}>|</span>
                          <div className={styles['fecha-field-movil']}>
                            {`${payment.createdDate}`}
                          </div>
                        </div>
                        <div className={styles.icons}>
                          <div className={styles.upload}>
                            <div
                              className={styles.uploadContainer}
                              onClick={() => {
                                payment.pdf.length
                                  ? setPdfURL(payment.pdf[0].url)
                                  : setPdfURL(null);
                              }}>
                              <img
                                src={
                                  isDark
                                    ? '/images/upload-documentation-white.svg'
                                    : '/images/upload.png'
                                }
                              />
                            </div>
                          </div>
                          <div className={styles.delete}>
                            <div
                              className={styles.deleteContainer}
                              onClick={() => deleteQuote(payment.idPortfolio)}>
                              <img
                                src={
                                  isDark
                                    ? '/images/delete-quote-white.svg'
                                    : '/images/delete.png'
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </details>
              ))}
            {seleccion && seleccion.length === 0 && (
              <div className={styles['bottom-content']}>
                No se encuentran contizaciones asignadas a este usuario
              </div>
            )}
            {errorShown && <div className={styles.error}>{errorShown}</div>}
          </div>
        </div>
        {pdfURL && (
          <div className={styles['iframe-popup']}>
            <div className={styles['iframe-popup-content']}>
              <button
                onClick={() => setPdfURL(null)}
                className={styles['iframe-close']}
              />
              <iframe src={pdfURL} width="100%" height="100%" frameBorder="0" />
            </div>
          </div>
        )}
      </div>

      {fileIndex.length > 0 && (
        <div className={`bg-sub-header ${styles.submenu}`}>
          <div className={styles.submenuInner}>
            <div
              className={`${styles['sub-close']} dark:bg-[url(/images/close-white.svg)] bg-[url(/images/close.png)]`}
              onClick={() => {
                setSelectCheckboxes(false);
                setFileIndex((prevFiles) => (prevFiles = []));
                const checkboxInputsQuotes = document.querySelectorAll(
                  '.checkboxInputQuotes'
                );
                if (checkboxInputsQuotes.length) {
                  checkboxInputsQuotes.forEach((checkboxInput) => {
                    console.log(checkboxInput);
                    checkboxInput.checked = false;
                  });
                }
              }}
            />
            <div className={`${styles['sub-text']} font-bold`}>
              {fileIndex.length} elemento seleccionado
            </div>
            <div className={styles['sub-icons']}>
              <div className={styles['sub-upload']}>
                <div
                  className={styles.deleteContainer}
                  onClick={() => downloadAllFiles()}>
                  <img
                    src={
                      isDark
                        ? '/images/upload-documentation-white.svg'
                        : '/images/upload.png'
                    }
                  />
                </div>
              </div>
              <div className={styles['sub-delete']}>
                <div
                  className={styles.deleteContainer}
                  onClick={() => chainedDelete(fileIndex)}>
                  <img
                    src={
                      isDark
                        ? '/images/delete-quote-white.svg'
                        : '/images/delete.png'
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    <Portal>
        {successPopUp === 1 && (
          <SuccessPopUp
            message={'¡Tú cotización ha sido eliminada con éxito!'}></SuccessPopUp>
        )}
        {successPopUp === 2 && (
          <ErrorPopUp errorMessage={'Algo no está bien. Por favor, revisa los datos ingresados e inténtalo de nuevo.'}></ErrorPopUp>
        )}
    </Portal>   
    </>
  );
};

export default Quotes;
