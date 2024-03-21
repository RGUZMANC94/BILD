import styles from '../styles/Dashboard.module.css';
import { useEffect, useRef, useState } from 'react';
import CategoriesPopUp from '../components/categoriesPopUp';
import { createChart, ColorType } from 'lightweight-charts';
import Button from '../components/button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const Dashboard = () => {
  const data = [
    { time: '2022-12-18', value: 5 },
    { time: '2023-01-19', value: 5 },
    { time: '2023-02-19', value: 8 },
    { time: '2023-03-19', value: 8 },
  ];
  const colors = {
    backgroundColor: 'transparent',
    lineColor: '#AD84F4',
    textColor: 'white',
    areaTopColor: 'transparent',
    areaBottomColor: 'transparent',
  };

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      volumeChart.applyOptions({
        width: chartContainerRef.current.clientWidth,
      });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: colors.backgroundColor },
        textColor: colors.textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: (chartContainerRef.current.clientWidth * 9) / 16,
      autoSize: true,
      leftPriceScale: {
        visible: true,
      },
      rightPriceScale: {
        visible: false,
      },
      grid: {
        vertLines: {
          color: '#777777',
        },
        horzLines: {
          color: '#777777',
        },
      },
    });

    chart.timeScale().fitContent();

    const newSeries = chart.addAreaSeries({
      lineColor: colors.lineColor,
      topColor: colors.areaTopColor,
      bottomColor: colors.areaBottomColor,
    });
    newSeries.setData(data);

    const volumeChart = createChart(chartVolumesRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: colors.backgroundColor },
        textColor: colors.textColor,
      },
      width: chartVolumesRef.current.clientWidth,
      height: (chartVolumesRef.current.clientWidth * 9) / 16,
      autoSize: true,
      leftPriceScale: {
        visible: true,
      },
      rightPriceScale: {
        visible: false,
      },
    });

    volumeChart.timeScale().fitContent();

    const newVolumeSeries = volumeChart.addHistogramSeries({
      color: '#26a69a',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
    });

    newVolumeSeries.setData([
      {
        time: '2018-10-19',
        value: 19103293.0,
        color: '#C2D5FF',
      },
      {
        time: '2018-10-22',
        value: 21737523.0,
        color: '#C2D5FF',
      },
      {
        time: '2018-10-23',
        value: 29328713.0,
        color: '#C2D5FF',
      },
      {
        time: '2018-10-24',
        value: 37435638.0,
        color: '#C2D5FF',
      },
      { time: '2018-10-25', value: 25269995.0, color: 'rgba(255,82,82, 0.8)' },
      { time: '2018-10-26', value: 24973311.0, color: 'rgba(255,82,82, 0.8)' },
      {
        time: '2018-10-29',
        value: 22103692.0,
        color: '#C2D5FF',
      },
    ]);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      chart.remove();
      volumeChart.remove();
    };
  }, [
    data,
    colors.backgroundColor,
    colors.lineColor,
    colors.textColor,
    colors.areaTopColor,
    colors.areaBottomColor,
  ]);

  const [startDate, setStartDate] = useState(new Date('2024/02/08'));
  const [endDate, setEndDate] = useState(new Date('2024/02/10'));

  const chartContainerRef = useRef();
  const chartVolumesRef = useRef();

  const handleDateSelect = () => {};
  const handleDateChange = (date) => {
    (date) => setStartDate(date);
  };
  const handleChange = (date) => {
    (date) => setStartDate(date);
  };

  return (
    <>
      <div className={styles['top-dashboard']}>
        <div className="container flex j-sb a-c">
          <div className={`flex j-s a-c ${styles.calendar}`}>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className={styles['input-date']}
            />
            <div className={`${styles.separator}`}></div>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              className={styles['input-date']}
            />
          </div>
          <div className={styles.widgets}>
            <div className={styles['top-w']}>
              <div className={`${styles.outerOptions} flex j-s a-c`}>
                <div className={`bg-ct ${styles.categories}`}></div>
                <p>Ordenar</p>
              </div>
              <div className={`${styles.outerOptions} flex j-s a-c`}>
                <div className={`bg-ct ${styles.filtros}`}></div>
                <p>Filtrar</p>
              </div>
            </div>
            <div className={styles['download-report-desk']}>
              <Button buttonType={'primary'} label={'Descargar Reporte'} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles['wrap-dashboard']}>
        <div className={styles.welcome}>
          <div className={styles['perfil-img']}>
            <img src="images/perfil-img.jpeg" />
            <div className={styles['welcome-text']}>
              <span className={styles['welcome-tit']}>¡Bienvenido, John!</span>
              <span className={styles.profile}>Gerente comercial</span>
            </div>
          </div>
        </div>

        <div className={styles.allChartsContainer}>
          <div
            className={`${styles.viewsThrough} ${styles.outerChart} ${styles.wrapChart}`}>
            <h4 className={styles.titleChart}>Vistas por medio</h4>
            <div ref={chartContainerRef} />
          </div>

          <div className={`${styles.outerChart} ${styles.wrapChart}`}>
            <div className={styles.table}>
              <h5 className={`${styles.blueCell}  ${styles['title-table']}`}>
                Estatus de las ventas
              </h5>
              <div className={`${styles.rowTable} flex j-s a-c`}>
                <div
                  className={`${styles.blueCell} ${styles.tableCell} flex j-c a-c`}>
                  Estado
                </div>
                <div
                  className={`${styles.blueCell} ${styles.tableCell} flex j-c a-c`}>
                  Negocios
                </div>
                <div
                  className={`${styles.blueCell} ${styles.tableCell} flex j-c a-c`}>
                  %
                </div>
              </div>
              <div className={`${styles.rowTable} flex j-s a-c`}>
                <div
                  className={`${styles.blueCell} ${styles.tableCell} flex j-c a-c`}>
                  Cerrados
                </div>
                <div
                  className={`${styles.whiteCell} ${styles.tableCell} flex j-c a-c`}>
                  311
                </div>
                <div
                  className={`${styles.whiteCell} ${styles.tableCell} flex j-c a-c`}>
                  87.6%
                </div>
              </div>
              <div className={`${styles.rowTable} flex j-s a-c`}>
                <div
                  className={`${styles.blueCell} ${styles.tableCell} flex j-c a-c`}>
                  Pendiente adquiriente
                </div>
                <div
                  className={`${styles.whiteCell} ${styles.tableCell} flex j-c a-c`}>
                  1
                </div>
                <div
                  className={`${styles.whiteCell} ${styles.tableCell} flex j-c a-c`}>
                  0.3%
                </div>
              </div>
              <div className={`${styles.rowTable} flex j-s a-c`}>
                <div
                  className={`${styles.blueCell} ${styles.tableCell} flex j-c a-c`}>
                  Proceso de radicación
                </div>
                <div
                  className={`${styles.whiteCell} ${styles.tableCell} flex j-c a-c`}>
                  7
                </div>
                <div
                  className={`${styles.whiteCell} ${styles.tableCell} flex j-c a-c`}>
                  2.0%
                </div>
              </div>
              <div className={`${styles.rowTable} flex j-s a-c`}>
                <div
                  className={`${styles.blueCell} ${styles.tableCell} flex j-c a-c`}>
                  Negocios de socios
                </div>
                <div
                  className={`${styles.whiteCell} ${styles.tableCell} flex j-c a-c`}>
                  16
                </div>
                <div
                  className={`${styles.whiteCell} ${styles.tableCell} flex j-c a-c`}>
                  4.5%
                </div>
              </div>
              <div className={`${styles.rowTable} flex j-s a-c`}>
                <div
                  className={`${styles.blueCell} ${styles.tableCell} flex j-c a-c`}>
                  Por iniciar proceso legalización
                </div>
                <div
                  className={`${styles.whiteCell} ${styles.tableCell} flex j-c a-c`}>
                  2
                </div>
                <div
                  className={`${styles.whiteCell} ${styles.tableCell} flex j-c a-c`}>
                  0.6
                </div>
              </div>
              <div
                className={`${styles.blueCell} bg-complete flex j-sb a-c  ${styles['large-cell-table']}`}>
                <p>TOTAL</p>
                <p>355</p>
                <p>100%</p>
              </div>
            </div>
          </div>

          <div
            className={`${styles.viewsThrough} ${styles.outerChart} ${styles.wrapChart}`}>
            <h4 className={styles.titleChart}>Vistas por medio</h4>
            <div ref={chartVolumesRef} />
          </div>
          <div className={styles.wrapChart}></div>
          <div className={styles.wrapChart}></div>
        </div>
        <div className={styles['download-report-movil']}>
          <Button
            buttonType={'primary'}
            label={'Descargar Reporte'}
            className={styles['download-report-movil-button']}
          />
        </div>
      </div>
      <CategoriesPopUp />
    </>
  );
};

export default Dashboard;
