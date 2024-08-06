import { Range, getTrackBackground } from 'react-range';
import { useState, useEffect } from 'react';
import styles from './quote.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../button';
import SquareInput from '../../squareInput';
import CurrencyInput from 'react-currency-input-field';
import Portal from '../../../HOC/portal';
import { useRouter } from 'next/router';
import { closePopUp } from '../../../redux/popUpOportunity';
import SuccessPopUp from '../../successPopUp';
import ErrorPopUp from '../../errorPopUp';

const GenerateQuote = ({
  setGenerateQuote,
  closePopUpPortal,
  setRefreshFlag,
  id,
  prePriceInfo,
}) => {
  // const { id } = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const router = useRouter();
  const [values, setValues] = useState([30]);
  const { projectsList } = useSelector((state) => state.projectState);
  const { unitSelected } = useSelector((state) => state.unitState);
  const { contactSelected } = useSelector(
    (state) => state.contactOpportunityState
  );
  const { opportunitySelected } = useSelector(
    (state) => state.opportunityState
  );

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [popQuotes, setPopQuotes] = useState(false);
  const [sentLink, setSentLink] = useState(false);
  const [initialQuote, setInitialQuote] = useState(0);
  const [balanceInitialQuote, setBalanceInitialQuote] = useState(0);
  const [monthlyQuote, setMonthlyQuote] = useState(0);
  const [unitBalance, setUnitBalance] = useState(0);
  const [separation, setSeparation] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [fees, setFees] = useState(2);
  const [successQuote, setSuccessQuote] = useState(0);
  const [feesArray, setFeesArray] = useState([]);
  const [datos, setDatos] = useState({
    idSaleOp: opportunitySelected,
    totalValue: null,
    percentageToPay: null,
    numberDues: null,
    separationValue: null,
    payments: [],
    paymentStartDate: formatDate(new Date()),
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [feesTotal, setFeesTotal] = useState(0);
  const [minDuePercentage, setMinDuePercentage] = useState(
    prePriceInfo ? prePriceInfo.minPercentage : 1
  );
  const [minQuoteValue, setMinQuoteValue] = useState(0);
  const [maxNumberDues, setMaxNumberDues] = useState(
    prePriceInfo ? prePriceInfo.numberDues : 2
  );

  /* const [startDate, setStartDate] = useState('');

  useEffect(() => {
    const today = new Date();
    setStartDate(formatDate(today));
  }, []);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const getMaxDate = () => {
    const today = new Date();
    let futureDate = new Date(today.setMonth(today.getMonth() + maxNumberDues));
    if (futureDate.getDate() !== today.getDate()) {
      futureDate = new Date(today.getFullYear(), today.getMonth() + maxNumberDues + 1, 0);
    }
    console.log('futureDate:', formatDate(futureDate));
    return formatDate(futureDate);
  };

  const getCurrentDate = () => {
    const today = new Date();
    return formatDate(today);
  };
  const [sendFlag, setSendFlag] = useState(false);


  const dateFormatting = () => {
    setDatos((prevDatos) => ({
      ...prevDatos,
      paymentStartDate: formatDate(startDate),
    }));
    setSendFlag(true);
  };

  useEffect(() => {
    if (sendFlag) {
      sendFormInfo();
      setSendFlag(false);
    }
  }, [sendFlag]);
*/
  /* console.log('maxNumberDues:', maxNumberDues);
  console.log('fees', fees);
  console.log('monthlyQuote:', monthlyQuote);
  console.log('balanceInitialQuote:', balanceInitialQuote);
  console.log('prePriceInfo', prePriceInfo);
  console.log('oporunitySelected', opportunitySelected);*/

  useEffect(() => {
    if (fees !== maxNumberDues) {
      setFees(maxNumberDues);
    }
  }, [maxNumberDues]);

  useEffect(() => {
    if (feesArray.length !== 0) {
      setFeesTotal(feesArray.reduce((acc, fee) => acc + Number(fee), 0));
    }
  }, [feesArray, fees]);

  useEffect(() => {
    const formattedPayments = feesArray.map((paymentValue) => ({
      paymentValue: `${paymentValue}.0`,
    }));

    setDatos((prevDatos) => ({
      ...prevDatos,
      totalValue: `${unitSelected.propertyPrice}.0`,
      percentageToPay: values[0],
      numberDues: fees,
      separationValue: `${Number(separation) + Number(downPayment)}.0`,
      payments: popQuotes ? [...formattedPayments] : [],
    }));
  }, [
    opportunitySelected,
    unitSelected,
    values,
    fees,
    separation,
    downPayment,
    popQuotes,
    feesArray,
  ]);

  useEffect(() => {
    if (sliderFlag) {
      setInitialQuote((unitSelected.propertyPrice * values[0]) / 100);
    }
  }, [values]);

  // console.log('initialQuote',initialQuote, typeof initialQuote);

  // console.log(initialQuote, separation, downPayment);
  useEffect(() => {
    setBalanceInitialQuote(
      initialQuote - (Number(separation) + Number(downPayment))
    );
  }, [initialQuote, separation, downPayment]);

  useEffect(() => {
    setUnitBalance(unitSelected.propertyPrice - initialQuote);
  }, [initialQuote]);

  useEffect(() => {
    setMonthlyQuote(balanceInitialQuote / Number(fees));
  }, [fees, balanceInitialQuote, initialQuote, separation, downPayment]);

  useEffect(() => {
    setMinQuoteValue(monthlyQuote * (minDuePercentage / 100));
  }, [monthlyQuote]);

  const handleChangeFees = (e) => {
    const value = Number(e.target.value);
    const minQuoteValue = 10; // Reemplaza este valor con el valor deseado
    if (value >= minQuoteValue) {
      setFees(value);
    } else {
      setFees(minQuoteValue);
    }
  };

  function formatMoney(num) {
    return Number(num).toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }

  const [totalModified, setTotalModified] = useState(0);
  const [nonModifiedValue, setNonModifiedValue] = useState(0);
  const [lastModifiedIndex, setLastModifiedIndex] = useState(null);
  const [alerts, setAlerts] = useState([]); // Array para manejar las alertas

  const handlePopQuotes = () => {
    setPopQuotes(!popQuotes);
    if (popQuotes) {
      setFeesArray([]);
    }
  };

  const handleFeeChange = (value, index, event) => {
    const newFeesArray = [...feesArray];
    newFeesArray[index] = value;

    setFeesArray(newFeesArray);

    if (parseFloat(value) < minQuoteValue || parseFloat(value) > initialQuote) {
      setAlerts((prev) => {
        const newAlerts = [...prev];
        newAlerts[index] = true; // Mostrar alerta si el valor es menor que minQuoteValue o mayor que initialQuote
        return newAlerts;
      });
    } else {
      setAlerts((prev) => {
        const newAlerts = [...prev];
        newAlerts[index] = false; // Quitar alerta si el valor es válido
        return newAlerts;
      });
      setTotalModified(calculateTotalModified());
      setNonModifiedValue(calculateNonModifiedValue());
    }

    if (event && event.target && event.target.id === 'unchanged') {
      event.target.id = 'modified';
    }

    setLastModifiedIndex(index);
  };

  useEffect(() => {
    setTotalModified(calculateTotalModified());
    setNonModifiedValue(calculateNonModifiedValue());
  }, [feesArray]);

  useEffect(() => {
    if (lastModifiedIndex !== null) {
      updateNonModifiedValues();
    }
  }, [totalModified, nonModifiedValue]);

  const renderDynamicInputs = () => {
    const inputs = [];
    for (let i = 0; i < fees; i++) {
      inputs.push(
        <div key={i} className={styles['cotizacion-input-form']}>
          <div className={styles['inner-cotizacion']}>
            <span className={styles.labelSide}>{`Cuota ${i + 1}:`}</span>
            {prePriceInfo && prePriceInfo.dues.length > 0 && (
              <span className={styles.labelSideDate}>
                {`${prePriceInfo.dues[i].paymentDate}`}
              </span>
            )}
            <CurrencyInput
              className={`border-input ${styles.inputQuote} ${
                alerts[i] ? 'bg-red-100' : ''
              }`}
              prefix="$ "
              decimalSeparator=","
              groupSeparator="."
              name={`downPayment ${i + 1}`}
              placeholder={`Cuota ${i + 1}`}
              value={feesArray[i]}
              decimalsLimit={0}
              allowDecimals={false}
              onValueChange={(value, name, event) =>
                handleFeeChange(value, i, event)
              }
              onBlur={(event) => {
                if (event.target.id === 'unchanged') {
                  event.target.id = 'modified';
                  setLastModifiedIndex(i);
                }
                if (!alerts[i]) {
                  setTotalModified(calculateTotalModified());
                  setNonModifiedValue(calculateNonModifiedValue());
                }
              }}
              id="unchanged"
              required
            />
          </div>

          {alerts[i] && (
            <div className={`${styles['alert-input']} bg-alert`}>
              <p>
                {parseFloat(feesArray[i]) < minQuoteValue
                  ? 'El valor mínimo permitido es'
                  : 'El valor máximo permitido es'}
                <a
                  href="#"
                  onClick={() =>
                    handleFeeChange(
                      parseFloat(feesArray[i]) < minQuoteValue
                        ? Math.floor(Number(minQuoteValue))
                        : Math.floor(Number(initialQuote)),
                      i
                    )
                  }
                  className="font-bold text-dark-2 dark:text-light-1 underline">
                  {parseFloat(feesArray[i]) < minQuoteValue
                    ? ` $${Math.floor(Number(minQuoteValue))}.`
                    : ` $${Math.floor(Number(initialQuote))}.`}
                </a>{' '}
              </p>
            </div>
          )}
        </div>
      );
    }
    return inputs;
  };

  function initializeFeesArray() {
    const feeValue = Math.floor(balanceInitialQuote / fees);
    const remainder = balanceInitialQuote % fees;

    const initialFeesArray = Array.from({ length: fees }, (_, i) =>
      (i < remainder ? feeValue + 1 : feeValue)
    );

    setFeesArray(initialFeesArray);
  }

  const calculateTotalModified = () => {
    const inputs = document.querySelectorAll('input#modified');
    let total = 0;
    inputs.forEach((input) => {
      const value = parseFloat(input.value.replace(/[^0-9]/g, '')) || 0;
      total += value;
    });
    return total;
  };

  const calculateNonModifiedValue = () => {
    const totalModified = calculateTotalModified();
    const nonModifiedCount =
      document.querySelectorAll('input#unchanged').length;
    if (nonModifiedCount === 0) {
      return 0;
    }
    const nonModifiedValue =
      (balanceInitialQuote - totalModified) / nonModifiedCount;

    if (nonModifiedValue < 0) {
      return 0;
    }

    if (nonModifiedValue < minQuoteValue) {
      return Math.floor(minQuoteValue);
    }
    return Math.floor(nonModifiedValue);
  };

  const updateNonModifiedValues = () => {
    const inputs = document.querySelectorAll('input#unchanged');
    const newFeesArray = [...feesArray];
    inputs.forEach((input) => {
      const inputIndex = parseInt(input.name.split(' ')[1]) - 1;
      newFeesArray[inputIndex] = nonModifiedValue;
    });
    setFeesArray(newFeesArray);
  };

  useEffect(() => {
    initializeFeesArray();
  }, [unitBalance, fees, balanceInitialQuote, popQuotes]);

  const handleSentLink = () => {
    setSentLink(!sentLink);
  };

  const sendFormInfo = async (e) => {
    e.preventDefault();

    if (!popQuotes) {
      delete datos.payments;
    }

    console.log(datos);

    try {
      const quoteCreated = await fetch('/api/createQuote', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          datos,
        }),
      });

      if (!quoteCreated.ok) {
        const errorMessage = await quoteCreated.text();
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

      const responseData = await quoteCreated.json();
      console.log('respuesta de la cotizacion', responseData);
      setSuccessQuote((prevState) => 1);

      setTimeout(() => {
        if (setRefreshFlag) {
          setRefreshFlag((prevState) => true);
          closePopUpPortal();
        } else {
          dispatch(closePopUp());
          router.push('/opportunities');
        }
        setTimeout(() => {
          setSuccessQuote((prevState) => 0);
        }, 500);
      }, 2000);
    } catch (error) {
      setSuccessQuote((prevState) => 2);
      setTimeout(() => {
        setSuccessQuote((prevState) => 0);
      }, 2500);
      console.error(
        'Error en la respuesta del servidor (Creacion de oportunidad)'
      );
      console.error('Error al crear la cotizacion:', error.errorMessage);
    }
  };

  // Alert No. Cuota
  const [showAlert, setShowAlert] = useState(false);

  const handleFeesChange = (e) => {
    const value = e.target.value;
    setFees(value);
    if (parseInt(value) > maxNumberDues) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  };

  const handleSetMaxDues = () => {
    setFees(maxNumberDues);
    setShowAlert(false);
  };

  // Alert Reserva / separacion

  const [showAlertSeparation, setShowAlertSeparation] = useState(false);

  const handleSeparation = (val) => {
    const value = Number(val);
    setSeparation(value);
    if (parseInt(value) > initialQuote) {
      setShowAlertSeparation(true);
    } else {
      setShowAlertSeparation(false);
    }
  };

  const handleSetSeparation = () => {
    setSeparation(initialQuote);
    setShowAlertSeparation(false);
  };

  // Alert Separacion / downpayment

  const [showAlertDownPayment, setShowAlertDownPayment] = useState(false);

  const handleDownPayment = (val) => {
    const value = Number(val);
    setDownPayment(value);
    if (parseInt(value) > initialQuote) {
      setShowAlertDownPayment(true);
    } else {
      setShowAlertDownPayment(false);
    }
  };

  const handleSetDownPayment = () => {
    setDownPayment(initialQuote);
    setShowAlertDownPayment(false);
  };

  // Alerta de cuota inicial

  const [sliderFlag, setSliderFlag] = useState(true);

  const [showInitialAlert, setShowInitialAlert] = useState(false);

  const handleInitialQuoteChange = (val) => {
    setSliderFlag(false);

    const num = Number(val);

    let tempNum = num;

    if (num < 0) {
      tempNum = 0;
      setShowInitialAlert(false);
      setInitialQuote(tempNum);
      setValues([0]);
    } else if (num > unitSelected.propertyPrice) {
      setShowInitialAlert(true);
      setInitialQuote(tempNum);
      setValues([100]);
    } else {
      setShowInitialAlert(false);
      setInitialQuote(tempNum);
      setValues([Math.floor((tempNum / unitSelected.propertyPrice) * 100)]);
    }
  };

  /* const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    const minDateString = new Date(year, month, day).toISOString().split('T')[0];
    setMinDate(minDateString);
    console.log('minDateString:', minDateString);

    const maxDateValue = new Date(year, month + maxNumberDues, day);
    const maxDateString = maxDateValue.toISOString().split('T')[0];
    console.log('maxDateString:', maxDateString);
    setMaxDate(maxDateString);
  }, [maxNumberDues]);*/

  return (
    <>
      <form className={styles['generar-cotizacion']} onSubmit={sendFormInfo}>
        <div className={`${styles.topContent} header-popup`}>
          <span className={`${styles.title} font-black`}>
            Generar Cotización
          </span>
          <div className={styles.seleccion}>
            <div className={styles.origen}>
              <span className={styles.labelSimple}>Tipo:</span>
              <span className={styles.labelFocus}>{unitSelected.type}</span>
            </div>
            <div className={styles.origen}>
              <span className={styles.labelSimple}>Apto:</span>
              <span className={styles.labelFocus}>{unitSelected.type}</span>
            </div>
          </div>
        </div>

        <div className={styles.infoContainer}>
          <span className={styles.labelSubtitle}>
            Porcentaje de Cuota Inicial
          </span>

          <div className={`flex j-sb a-c ${styles.outerRange}`}>
            <Range
              values={values}
              step={1}
              min={0}
              max={100}
              // rtl={rtl}
              onChange={(values) => {
                setSliderFlag(true);
                setValues(values);
              }}
              renderTrack={({ props, children }) => (
                <div
                  onMouseDown={props.onMouseDown}
                  onTouchStart={props.onTouchStart}
                  style={{
                    ...props.style,
                    height: '36px',
                    display: 'flex',
                    width: 'calc(100% - 80px)',
                  }}>
                  <div
                    ref={props.ref}
                    style={{
                      height: '4px',
                      width: '100%',
                      background: getTrackBackground({
                        values,
                        colors: ['#D9D9D9', '#D9D9D9'],
                        min: 0,
                        max: 100,
                        // rtl,
                      }),
                      alignSelf: 'center',
                    }}>
                    {children}
                  </div>
                </div>
              )}
              renderThumb={({ props, isDragged }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: '20px',
                    width: '46px',
                    borderRadius: '3px',
                    backgroundColor: '#2467FF',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}></div>
              )}
            />
            <div className={styles.labelRangePercenth}>{`${values}%`}</div>
          </div>

          <div className={styles['cotizacion-input-form']}>
            <div className={styles['inner-cotizacion']}>
              <span className={styles.labelSide}>Valor Cuota Inicial:</span>

              <CurrencyInput
                className={`border-input ${styles.inputQuote}`}
                prefix="$ "
                decimalSeparator=","
                groupSeparator="."
                id="initialQuote-input"
                name="initialQuote"
                placeholder={`${initialQuote}`}
                // defaultValue={1000000}
                value={initialQuote}
                allowDecimals={false}
                onValueChange={(value) => handleInitialQuoteChange(value)}
              />
            </div>
            {showInitialAlert && (
              <div className={`${styles['alert-input']} bg-alert`}>
                <p>
                  Por favor introduzca un valor menor al precio total.{' '}
                  <a
                    href="#"
                    onClick={() =>
                      handleInitialQuoteChange(unitSelected.propertyPrice)
                    }
                    className="font-bold text-dark-2 dark:text-light-1 underline">
                    Valor sugerido.
                  </a>{' '}
                </p>
              </div>
            )}
          </div>

          <div className={styles['cotizacion-input-form']}>
            <div className={styles['inner-cotizacion']}>
              <span className={styles.labelSide}>Reserva:</span>

              <CurrencyInput
                className={`border-input ${styles.inputQuote}`}
                prefix="$ "
                decimalSeparator=","
                groupSeparator="."
                id="separation-input"
                name="separation"
                placeholder="$0"
                // defaultValue={1000000}
                allowDecimals={false}
                value={separation}
                onValueChange={(value) => handleSeparation(value)}
                required
              />
            </div>
            {showAlertSeparation && (
              <div className={`${styles['alert-input']} bg-alert`}>
                <p>
                  Por favor introduzca un valor menor al de la Cuota Inicial.{' '}
                  <a
                    href="#"
                    onClick={handleSetSeparation}
                    className="font-bold text-dark-2 dark:text-light-1 underline">
                    Valor sugerido.
                  </a>{' '}
                </p>
              </div>
            )}
          </div>

          <div className={styles['cotizacion-input-form']}>
            <div className={styles['inner-cotizacion']}>
              <span className={styles.labelSide}>Separación:</span>

              <CurrencyInput
                className={`border-input ${styles.inputQuote}`}
                prefix="$ "
                decimalSeparator=","
                groupSeparator="."
                id="downPayment-input"
                name="downPayment"
                placeholder="$0"
                // defaultValue={1000000}
                decimalsLimit={2}
                allowDecimals={false}
                onValueChange={(value) => handleDownPayment(value)}
                value={downPayment}
              />
            </div>

            {showAlertDownPayment && (
              <div className={`${styles['alert-input']} bg-alert`}>
                <p>
                  Por favor introduzca un valor menor al de la Cuota Inicial.{' '}
                  <a
                    href="#"
                    onClick={handleSetDownPayment}
                    className="font-bold text-dark-2 dark:text-light-1 underline">
                    Valor sugerido.
                  </a>{' '}
                </p>
              </div>
            )}
          </div>

          <div className={`divisorPopup ${styles.infoSection}`}>
            <span className={styles.labelSimple}>Saldo Cuota Inicial:</span>
            <span className={styles.labelFocus}>
              {formatMoney(balanceInitialQuote)}
            </span>
          </div>

          <div className={styles['cotizacion-input-form']}>
            <div className={styles['inner-cotizacion']}>
              <span className={styles.labelSide}>No. Cuotas Mensuales:</span>

              <input
                className={`border-input ${styles.subject_input} dark:bg-dark-4 bg-transparent`}
                type="text"
                name="fees"
                value={fees}
                onChange={handleFeesChange}
                placeholder="2"
                required
              />
            </div>

            {showAlert && (
              <div className={`${styles['alert-input']} bg-alert`}>
                <p>
                  El número máximo de cuotas mensuales es {maxNumberDues}.{' '}
                  <a
                    href="#"
                    onClick={handleSetMaxDues}
                    className="font-bold text-dark-2 dark:text-light-1 underline">
                    Valor sugerido.
                  </a>{' '}
                </p>
              </div>
            )}
          </div>
          {/*
          <div className={styles['cotizacion-form']}>
            <span className={styles.labelSide}>Fecha inicio de pago:</span>
              <input
                type="date"
                value={startDate}
                required
                onChange={handleStartDateChange}
                className={styles.subject_input}
                min={minDate}
                max={maxDate}
              />
          </div>
          */}

          <div className={styles.squareInputContainer}>
            <SquareInput
              isDisable={showAlert}
              onChangeFunct={handlePopQuotes}
            />

            <span className={styles.labelQuotesSelect}>
              Ver detalle de cuotas
            </span>
          </div>
          {popQuotes && (
            <>
              {renderDynamicInputs()}

              <div className={`divisorPopup ${styles.infoSection}`}>
                <span className={styles.labelSimple}>Total de Cuotas:</span>
                <span className={styles.labelFocus}>
                  {formatMoney(feesTotal)}
                </span>
              </div>
            </>
          )}

          {!popQuotes && (
            <div className={`divisorPopup ${styles.infoSection}`}>
              <span className={styles.labelSimple}>Valor Cuota Mensual:</span>
              <span className={styles.labelFocus}>
                {formatMoney(monthlyQuote)}
              </span>
            </div>
          )}

          <span className={styles.infoSectionDivider} />

          <div className={`divisorPopup ${styles.infoSection}`}>
            <span className={styles.labelSimple}>Saldo Apartamento:</span>
            <span className={styles.labelFocus}>
              {formatMoney(unitBalance)}
            </span>
          </div>

          <div
            className={`${styles.squareInputContainer} ${styles['label-hide']}`}>
            <SquareInput onChangeFunct={handleSentLink} />
            <span className={styles.labelQuotesSelectNoLine}>
              Enviar link de pago {`${sentLink}`}{' '}
            </span>
            <img src="/images/link-pago.png" className={styles.arrowImage} />
          </div>
          <div
            className={`${styles['cotizacion-form']} ${styles['label-hide']}`}>
            <span className={styles.labelFocus}>COMPARTIR:</span>

            <div className={styles.iconContainer}>
              <div className={styles.iconSubContainer}>
                <img src="/images/mail.png" />
                <span className={styles.labelSimple}>MAIL</span>
              </div>

              <div className={styles.iconSubContainer}>
                <img src="/images/whatsapp.png" />
                <span
                  className={styles.labelSimple}
                  onClick={() => {
                    setGenerateQuote(false);
                  }}>
                  WHATSAPP
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.BottomContent} footer-popup`}>
          <Button
            buttonType={'secondary'}
            iconImage={false}
            label={'Cancelar'}
            inheritClass={styles.buttonCreateOpportunity}
            clickFunction={closePopUpPortal ?? null}
            preventDefault={true}
          />
          <Button
            buttonType={'primary'}
            iconImage={false}
            label={'Guardar'}
            inheritClass={styles.buttonCreateOpportunity}
            isDisabled={
              showAlert ||
              showInitialAlert ||
              showAlertSeparation ||
              showAlertDownPayment ||
              separation === 0 ||
              fees < 1
            }
          />
        </div>
      </form>
      <Portal>
        {successQuote === 1 && (
          <SuccessPopUp
            message={'¡Tú cotización ha sido creada con éxito!'}></SuccessPopUp>
        )}
        {successQuote === 2 && (
          <ErrorPopUp errorMessage={errorMessage}></ErrorPopUp>
        )}
      </Portal>
    </>
  );
};

export default GenerateQuote;
