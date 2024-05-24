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
}) => {
  const { id } = useSelector((state) => state.userState);
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
    paymentStartDate: null,
    payments: [],
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [feesTotal, setFeesTotal] = useState(0);

  console.log('fees', fees);
  console.log('monthlyQuote:', monthlyQuote);
  console.log('balanceInitialQuote:', balanceInitialQuote);

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
      paymentStartDate: '2024-12-30',
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
    setInitialQuote((unitSelected.propertyPrice * values[0]) / 100);
  }, [values]);

  console.log(initialQuote, separation, downPayment);
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

  function formatMoney(num) {
return num.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 });
}  

  const handlePopQuotes = () => {
    setPopQuotes(!popQuotes);
    if (popQuotes) {
      setFeesArray([]);
    }
  };

  const handleFeeChange = (value, index) => {
    const newFeesArray = [...feesArray];
    newFeesArray[index] = value;
    setFeesArray(newFeesArray);
  };

  const renderDynamicInputs = () => {
    const inputs = [];
    for (let i = 0; i < fees; i++) {
        inputs.push(
            <div key={i} className={styles['cotizacion-form']}>
                <span className={styles.labelSide}>{`Cuota ${i + 1}:`}</span>
                <CurrencyInput
                    className={styles.inputQuote}
                    prefix="$ "
                    decimalSeparator=","
                    groupSeparator="."
                    id={`Cuota ${i + 1}`}
                    name={`downPayment ${i + 1}`}
                    placeholder={`Cuota ${i + 1}`}
                    value={feesArray[i]}
                    decimalsLimit={0}
                    onValueChange={(value) => handleFeeChange(value, i)}
                    required
                />
            </div>
        );
    }
    return inputs;
};

  function initializeFeesArray() {
    const feeValue = Math.floor(balanceInitialQuote / fees);
    const remainder = balanceInitialQuote % fees;

    const initialFeesArray = Array.from({ length: fees }, (_, i) => (

      i < remainder ? feeValue + 1 : feeValue
    )
    );

    setFeesArray(initialFeesArray);
}

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
      // document
      //   .querySelector(`.${styles.popSuccessCreated}`)
      //   .classList.add(styles.activePopUp);

      setTimeout(() => {
        // document
        //   .querySelector(`.${styles.popSuccessCreated}`)
        //   .classList.remove(styles.activePopUp);
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
        // window.location.reload();
      }, 2000);
    } catch (error) {
      // document
      //   .querySelector(`.${styles.popError}`)
      //   .classList.add(styles.activePopUp);
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

  return (
    <>
      <form className={styles['generar-cotizacion']} onSubmit={sendFormInfo}>
        <div className={styles.topContent}>
          <span className={styles.title}>GENERAR COTIZACIÓN</span>
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
              onChange={(values) => setValues(values)}
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

          <div className={styles.infoSection}>
            <span className={styles.labelSimple}>Total Cuota Inicial:</span>
            <span className={styles.labelFocus}>
              {formatMoney(initialQuote)}
            </span>
          </div>
          <div className={styles['cotizacion-form']}>
            <span className={styles.labelSide}>Separación:</span>

            <CurrencyInput
              className={styles.inputQuote}
              prefix="$ "
              decimalSeparator=","
              groupSeparator="."
              id="separation-input"
              name="separation"
              placeholder="$0"
              // defaultValue={1000000}
              decimalsLimit={2}
              onValueChange={(value) => setSeparation(value)}
              required
            />
          </div>
          <div className={styles['cotizacion-form']}>
            <span className={styles.labelSide}>Abono Inicial:</span>

            <CurrencyInput
              className={styles.inputQuote}
              prefix="$ "
              decimalSeparator=","
              groupSeparator="."
              id="downPayment-input"
              name="downPayment"
              placeholder="$0"
              // defaultValue={1000000}
              decimalsLimit={2}
              onValueChange={(value) => setDownPayment(value)}
              required
            />
          </div>

          <div className={styles.infoSection}>
            <span className={styles.labelSimple}>Saldo Cuota Inicial:</span>
            <span className={styles.labelFocus}>
              {formatMoney(balanceInitialQuote)}
            </span>
          </div>

          <div className={styles['cotizacion-form']}>
            <span className={styles.labelSide}>No. Cuotas Mensuales:</span>

            <input
              className={styles.subject_input}
              type="text"
              name="fees"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              placeholder="2"
              required
            />
          </div>

          <div className={styles.squareInputContainer}>
            <SquareInput onChangeFunct={handlePopQuotes} />

            <span className={styles.labelQuotesSelect}>
              Ver detalle de cuotas
            </span>
          </div>
          {console.log('fessArray:',feesArray)}
          {popQuotes && (
            <>
            
            {renderDynamicInputs()}

            
            <div className={styles.infoSection}>
            <span className={styles.labelSimple}>Total de Cuotas:</span>
              <span className={styles.labelFocus}>
                {formatMoney(feesTotal)}
              </span>
            </div>
            </>
          )}

          {!popQuotes && (
            <div className={styles.infoSection}>
              <span className={styles.labelSimple}>Valor Cuota Mensual:</span>
              <span className={styles.labelFocus}>
                {formatMoney(monthlyQuote)}
              </span>
            </div>
          )}

          <span className={styles.infoSectionDivider}/>

          <div className={styles.infoSection}>
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

        <div className={styles.bottomContent}>
          <Button
            buttonType={'secondary'}
            iconImage={false}
            label={'CANCELAR'}
            inheritClass={styles.buttonCreateOpportunity}
            clickFunction={closePopUpPortal ?? null}
            preventDefault={true}
          />
          <Button
            buttonType={'primary'}
            iconImage={false}
            label={'Guardar'}
            inheritClass={styles.buttonCreateOpportunity}
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
