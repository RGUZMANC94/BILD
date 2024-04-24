import { Range, getTrackBackground } from 'react-range';
import { useState, useEffect } from 'react';
import styles from './quote.module.css';
import { useSelector } from 'react-redux';
import Button from '../../button';
import SquareInput from '../../squareInput';
import CurrencyInput from 'react-currency-input-field';

const GenerateQuote = ({ setGenerateQuote }) => {
  const { id } = useSelector((state) => state.userState);
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

  console.log('fees', fees);
  console.log('monthlyQuote:', monthlyQuote);
  console.log('balanceInitialQuote:', balanceInitialQuote);

  // Efecto para manejar cambios en valores y en popQuotes
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
    return num.toLocaleString('es-CO', { currency: 'COP', style: 'currency' });
  }

  const handlePopQuotes = () => {
    setPopQuotes(!popQuotes);
    if (popQuotes) {
      setFeesArray([]);
    }
  };

  const handleFeeChange = (e, index) => {
    const newFeesArray = [...feesArray];
    newFeesArray[index] = e.target.value;
    setFeesArray(newFeesArray);
  };

  const renderDynamicInputs = () => {
    const inputs = [];
    for (let i = 0; i < fees; i++) {
      inputs.push(
        <div key={i} className={styles['cotizacion-form']}>
          <span className={styles.labelSide}>{`Cuota ${i + 1}`}</span>
          <input
            className={styles.inputQuote}
            type="number"
            value={feesArray[i] || ''}
            onChange={(e) => handleFeeChange(e, i)}
            placeholder={`Cuota ${i + 1}`}
            required
          />
        </div>
      );
    }
    return inputs;
  };

  const handleSentLink = () => {
    setSentLink(!sentLink);
  };

  const sendFormInfo = async (e) => {
    e.preventDefault();

    if (!popQuotes) {
      delete datos.payments;
    }
    /*
    if (!popQuotes) {
      setDatos((prevDatos) => ({
        ...prevDatos,
        idSaleOp: opportunitySelected,
        totalValue: `${unitSelected.propertyPrice}.0`,
        percentageToPay: `${values[0]}`,
        numberDues: fees,
        separationValue: `${Number(separation) + Number(downPayment)}.0`,
        paymentStartDate: '2024-12-30',
      }));
    } else {
      const formattedPayments = feesArray.map((paymentValue) => ({
        paymentValue: `${paymentValue}.0`,
      }));

      setDatos((prevDatos) => ({
        ...prevDatos,
        idSaleOp: opportunitySelected,
        totalValue: `${unitSelected.propertyPrice}.0`,
        percentageToPay: values[0],
        numberDues: fees,
        separationValue: `${Number(separation) + Number(downPayment)}.0`,
        paymentStartDate: '2024-12-30',
        payments: [...formattedPayments],
      }));
    }*/

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

      if (quoteCreated.ok) {
        const responseData = await quoteCreated.json();
        console.log('respuesta de la cotizacion', responseData);

        document
          .querySelector(`.${styles.popSuccessCreated}`)
          .classList.add(styles.activePopUp);

        setTimeout(() => {
          document
            .querySelector(`.${styles.popSuccessCreated}`)
            .classList.remove(styles.activePopUp);
          window.location.reload();
        }, 2000);
      } else {
        document
          .querySelector(`.${styles.popError}`)
          .classList.add(styles.activePopUp);

        setTimeout(() => {
          document
            .querySelector(`.${styles.popError}`)
            .classList.remove(styles.activePopUp);
        }, 2000);
        console.error(
          'Error en la respuesta del servidor (Creacion de oportunidad)'
        );
      }
    } catch (error) {
      console.error('Error al crear la cotizacion:', error);
    }
  };

  return (
    <>
      <form className={styles['generar-cotizacion']} onSubmit={sendFormInfo}>
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
                    height: '12px',
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
                  height: '35px',
                  width: '56px',
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
          <span className={styles.labelSimple}>Total Cuota Inicial</span>
          <span className={styles.labelFocus}>{formatMoney(initialQuote)}</span>
        </div>
        <div className={styles['cotizacion-form']}>
          <span className={styles.labelSide}>Separación</span>

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
          <span className={styles.labelSide}>Abono Inicial</span>

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
          <span className={styles.labelSimple}>Saldo Cuota Inicial</span>
          <span className={styles.labelFocus}>
            {formatMoney(balanceInitialQuote)}
          </span>
        </div>

        <div className={styles['cotizacion-form']}>
          <span className={styles.labelSide}>No. Cuotas Mensuales</span>

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
        {console.log(feesArray)}
        {popQuotes && renderDynamicInputs()}

        {!popQuotes && (
          <div className={styles.infoSection}>
            <span className={styles.labelSimple}>Valor Cuota Mensual</span>
            <span className={styles.labelFocus}>
              {formatMoney(monthlyQuote)}
            </span>
          </div>
        )}

        <div className={styles.infoSection}>
          <span className={styles.labelSimple}>Saldo Apartamento</span>
          <span className={styles.labelFocus}>{formatMoney(unitBalance)}</span>
        </div>

        <div
          className={`${styles.squareInputContainer} ${styles['label-hide']}`}>
          <SquareInput onChangeFunct={handleSentLink} />
          <span className={styles.labelQuotesSelectNoLine}>
            Enviar link de pago {`${sentLink}`}{' '}
          </span>
          <img src="/images/link-pago.png" className={styles.arrowImage} />
        </div>
        <div className={`${styles['cotizacion-form']} ${styles['label-hide']}`}>
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

        <div className={`${styles.buttonsSection} flex j-sb a-s`}>
          <Button
            buttonType={'primary'}
            iconImage={false}
            label={'CANCELAR'}
            inheritClass={styles.buttonCreateOpportunity}
          />
          <Button
            buttonType={'secondary'}
            iconImage={false}
            label={'Guardar'}
            inheritClass={styles.buttonCreateOpportunity}
          />
        </div>
      </form>
      <div className={`${styles.popSuccessCreated}`}>
        <div className={styles.bgPopUp}></div>
        <div className={styles.popup2}>
          <div className={styles.content}>
            <div className={styles['icon-box']}>
              <img src="/images/check-circle.png" />
              <span className={styles['pop-text']}>
                ¡Tú cuota ha sido creada con éxito!
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.popError} `}>
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

export default GenerateQuote;
