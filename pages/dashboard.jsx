import styles from '../styles/Dashboard.module.css';
import { useEffect, useRef, useState } from 'react';
import CategoriesPopUp from '../components/categoriesPopUp';
import { createChart, ColorType } from 'lightweight-charts';
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

    // volumeChart.timeScale().fitContent();

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
        color: 'rgba(0, 150, 136, 0.8)',
      },
      {
        time: '2018-10-22',
        value: 21737523.0,
        color: 'rgba(0, 150, 136, 0.8)',
      },
      {
        time: '2018-10-23',
        value: 29328713.0,
        color: 'rgba(0, 150, 136, 0.8)',
      },
      {
        time: '2018-10-24',
        value: 37435638.0,
        color: 'rgba(0, 150, 136, 0.8)',
      },
      { time: '2018-10-25', value: 25269995.0, color: 'rgba(255,82,82, 0.8)' },
      { time: '2018-10-26', value: 24973311.0, color: 'rgba(255,82,82, 0.8)' },
      {
        time: '2018-10-29',
        value: 22103692.0,
        color: 'rgba(0, 150, 136, 0.8)',
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

  const chartContainerRef = useRef();
  const chartVolumesRef = useRef();

  return (
    <>
      <div className={styles['wrap-dashboard']}>
        <div className={styles['top-dashboard']}>
          <div className={styles.welcome}>
            <div className={styles['perfil-img']}>
              <img src="images/perfil-img.jpeg" />
              <div className={styles['welcome-text']}>
                <span className={styles['welcome-tit']}>
                  ¡Bienvenido, John!
                </span>
                <span className={styles.profile}>Gerente comercial</span>
              </div>
            </div>
          </div>

          <div className={styles.widgets}>
            <div className={styles['top-w']}>
              <div className={styles.categories} href="#popUp1"></div>
              <div className={styles.filtros}></div>
            </div>
            <div className={styles.reporte}>
              <a className={styles.download}>Descargar Reporte</a>
            </div>

            <div className={styles.calendar}>
              <input
                type="date"
                className={styles.start}
                name="trip-start"
                value="2018-07-22"
                min="2018-01-01"
                max="2018-12-31"
              />
              <input
                type="date"
                className={styles.start}
                name="trip-start-end"
                value="2018-07-22"
                min="2018-01-01"
                max="2018-12-31"
              />
            </div>
          </div>
        </div>
        <div className={styles.allChartsContainer}>
          <div
            className={`${styles.viewsThrough} ${styles.outerChart} ${styles.wrapChart}`}>
            <h4 className={styles.titleChart}>Vistas por medio</h4>
            <div ref={chartContainerRef} />
          </div>
          <div
            className={`${styles.viewsThrough} ${styles.outerChart} ${styles.wrapChart}`}>
            <h4 className={styles.titleChart}>Vistas por medio</h4>
            <div ref={chartVolumesRef} />
          </div>
          <div className={styles.wrapChart}></div>
          <div className={styles.wrapChart}></div>
        </div>
      </div>
      <CategoriesPopUp />
    </>
  );
};

export default Dashboard;
