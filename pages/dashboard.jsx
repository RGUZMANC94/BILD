import { CategoryScale, Chart } from "chart.js/auto";
import styles from "../styles/Dashboard.module.css";
import { Bar, Line, Pie } from "react-chartjs-2";
import { useEffect, useRef, useState } from "react";
import CategoriesPopUp from "../components/categoriesPopUp";
import { createChart, ColorType } from "lightweight-charts";
Chart.register(CategoryScale);
const Dashboard = () => {
  const data = [
    { time: "2018-12-22", value: 32.51 },
    { time: "2018-12-23", value: 31.11 },
    { time: "2018-12-24", value: 27.02 },
    { time: "2018-12-25", value: 27.32 },
    { time: "2018-12-26", value: 25.17 },
    { time: "2018-12-27", value: 28.89 },
    { time: "2018-12-28", value: 25.46 },
    { time: "2018-12-29", value: 23.92 },
    { time: "2018-12-30", value: 22.68 },
    { time: "2018-12-31", value: 22.67 },
  ];
  const colors = {
    backgroundColor: "white",
    lineColor: "#2962FF",
    textColor: "black",
    areaTopColor: "#2962FF",
    areaBottomColor: "rgba(41, 98, 255, 0.28)",
  };

  // const {
  //   data,
  //   colors: {
  //     backgroundColor = "white",
  //     lineColor = "#2962FF",
  //     textColor = "black",
  //     areaTopColor = "#2962FF",
  //     areaBottomColor = "rgba(41, 98, 255, 0.28)",
  //   } = {},
  // } = props;

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: colors.backgroundColor },
        textColor: colors.textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addAreaSeries({
      lineColor: colors.lineColor,
      topColor: colors.areaTopColor,
      bottomColor: colors.areaBottomColor,
    });
    newSeries.setData(data);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
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
  const fakeData = [
    {
      id: 1,
      year: 2016,
      userGain: 1,
      userLost: 823,
    },
    {
      id: 2,
      year: 2017,
      userGain: 2,
      userLost: 345,
    },
    {
      id: 3,
      year: 2018,
      userGain: 3,
      userLost: 555,
    },
    {
      id: 4,
      year: 2019,
      userGain: 4,
      userLost: 0,
    },
    {
      id: 5,
      year: 2020,
      userGain: 10,
      userLost: 234,
    },
  ];
  const [chartData, setChartData] = useState({
    labels: fakeData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained ",
        data: fakeData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#55ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });

  return (
    <>
      <div className={styles["wrap-dashboard"]}>
        <div className={styles["top-dashboard"]}>
          <div className={styles["welcome"]}>
            <div className={styles["perfil-img"]}>
              <img src="images/perfil-img.jpeg" />
              <div className={styles["welcome-text"]}>
                <span className={styles["welcome-tit"]}>
                  ¡Bienvenido, John!
                </span>
                <span className={styles["profile"]}>Gerente comercial</span>
              </div>
            </div>
          </div>

          <div className={styles["widgets"]}>
            <div className={styles["top-w"]}>
              <div className={styles["categories"]} href="#popUp1"></div>
              <div className={styles["filtros"]}></div>
            </div>
            <div className={styles["reporte"]}>
              <a className={styles["download"]}>Descargar Reporte</a>
            </div>

            <div className={styles["calendar"]}>
              <input
                type="date"
                className={styles["start"]}
                name="trip-start"
                value="2018-07-22"
                min="2018-01-01"
                max="2018-12-31"
              />
              <input
                type="date"
                className={styles["start"]}
                name="trip-start-end"
                value="2018-07-22"
                min="2018-01-01"
                max="2018-12-31"
              />
            </div>
          </div>
        </div>
        <div className={styles.allChartsContainer}>
          <div className={styles["wrapChart"]}>
            <div ref={chartContainerRef} />

            <Line
              data={chartData}
              options={{
                scales: {
                  y: {
                    type: "linear",
                    grace: "0",
                  },
                },
                plugins: {
                  title: {
                    display: true,
                    text: "Visitas por medio",
                  },
                  legend: {
                    display: false,
                  },
                },
              }}
            ></Line>
          </div>
          <div className={styles["wrapChart"]}>
            <Bar
              data={chartData}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Ventas por medio",
                  },
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </div>
          <div className={styles["wrapChart"]}>
            <Line
              data={chartData}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Dash de efectividad por medios",
                  },
                  legend: {
                    display: false,
                  },
                },
              }}
            ></Line>
          </div>
        </div>
      </div>
      <CategoriesPopUp />
    </>
  );
};

export default Dashboard;
