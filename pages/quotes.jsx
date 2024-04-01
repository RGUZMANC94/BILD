import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import styles from '../styles/Quotes.module.css';
import SquareInput from '../components/squareInput';

const Quotes = () => {
  const { id } = useSelector((state) => state.userState);
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
        idClient: contactListSelected.idCli,
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
    if (refreshFlag) {
      setRefreshFlag(false);
    }
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

      document
        .querySelector(`.${styles.popSuccessCreated}`)
        .classList.add(styles.activePopUp);

      setTimeout(() => {
        setRefreshFlag(true);
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

  return (
    <>
      <div className={styles['top-content']}>
        <div className="container flex j-s a-c">
          <Link
            href={`/buyer/${contactListSelected.idCli}`}
            className={`bg-ct ${styles.icon}`}></Link>
          <div
            className={
              styles.title
            }>{`Cotizaciones de ${contactListSelected.name} ${contactListSelected.lastname}`}</div>
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
          <div className={styles.nombre}>Nombre</div>
          <div className={styles.fecha}>Fecha de modificación</div>
          <div className={styles['tamaño']}>Tamaño</div>
        </div>
        <div className={styles['listas-cotizaciones']}>
          <div className={styles['nombre-lista']}>
            {seleccion &&
              seleccion.map((project, i) => (
                <details className={styles.accordion} key={i}>
                  <summary className={styles['accordion-btn']}>
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
                            />
                          </div>

                          <img src="images/pdf-icon-white.svg" />
                          <span>{`TIPO ${payment.propertyType}-${payment.nameTypeProperty}.pdf`}</span>
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
                              <img src="images/upload-documentation-white.svg" />
                            </div>
                          </div>
                          <div className={styles.delete}>
                            <div
                              className={styles.deleteContainer}
                              onClick={() => deleteQuote(payment.idPortfolio)}>
                              <img src="images/delete-quote-white.svg" />
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
        <div className={styles.submenu}>
          <div className={styles['sub-close']} />
          <div className={styles['sub-text']}>
            {fileIndex.length} elemento seleccionado
          </div>
          <div className={styles['sub-icons']}>
            <div className={styles['sub-upload']}>
              <div
                className={styles.deleteContainer}
                onClick={() => downloadAllFiles()}>
                <img src="images/upload-documentation-white.svg" />
              </div>
            </div>
            <div className={styles['sub-delete']}>
              <div
                className={styles.deleteContainer}
                onClick={() => chainedDelete(fileIndex)}>
                <img src="images/delete-quote-white.svg" />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`${styles.popSuccessCreated}`}>
        <div className={styles.bgPopUp}></div>
        <div className={styles.popup2}>
          <div className={styles.content}>
            <div className={styles['icon-box']}>
              <img src="/images/check-circle.png" />
              <span className={styles['pop-text']}>
                ¡Tú cotización ha sido eliminada con éxito!
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
                <span className={styles['pop-text-bold']}>¡Oops!</span>Algo no
                está bien. Por favor, revisa los datos ingresados e inténtalo de
                nuevo.
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quotes;
