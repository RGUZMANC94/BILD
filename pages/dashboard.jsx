import { CategoryScale, Chart } from "chart.js/auto";
import styles from "../styles/Dashboard.module.css";
import { Bar, Line, Pie } from "react-chartjs-2";
import { useState } from "react";
import CategoriesPopUp from "../components/categoriesPopUp";
Chart.register(CategoryScale);
const Dashboard = () => {
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
