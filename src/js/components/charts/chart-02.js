import ApexCharts from "apexcharts";
import { convertStatsHalf } from "../utils/mk-calc";

let chartTwoInstance = null; // インスタンスを保持

// ===== chartTwo


const chart02 = (vehicleName) => {

  // 既存のチャートを破棄
  if (chartTwoInstance) {
    chartTwoInstance.destroy();
    chartTwoInstance = null;
  }

  // localStorageからマシンデータを取得
  const vehicles = JSON.parse(localStorage.getItem("mk_vehicles") || "[]");

  const statLabels = [
    "スピード（舗装路）",
    "スピード（悪路）",
    "スピード（水上）",
    "加速度",
    "ミニターボの加速度",
    "重さ",
    "コイン増の加速度",
    "まがりやすさ（舗装路）",
    "まがりやすさ（悪路）",
    "まがりやすさ（水上）",
    "無敵の時のスピード",
  ];
  const vehicle = vehicles.find(
    (c) => c.name === vehicleName
  );
  const stats = convertStatsHalf(vehicle);   // chart-02

  // マシンごとのseries配列を生成
  const series = [
    {
      name: vehicle.name_ja,
      data: [
        stats.on_road_speed,
        stats.off_road_speed,
        stats.water_speed,
        stats.acceleration,
        stats.mini_turbo,
        stats.weight,
        stats.coin_curve,
        stats.on_road_handling,
        stats.off_road_handling,
        stats.water_handling,
        stats.invincibility,
      ],
    }
  ];

  const chartTwoOptions = {
    series: series,
    colors: ["#FF2A3B"],
    chart: {
      fontFamily: "'Noto Sans JP', sans-serif",
      type: "bar",
      height: 450, // グラフの高さを指定
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: "39%",
        barHeight: "50%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      min: 0,
      max: 4,
      tickAmount: 4,
      categories: statLabels,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Noto Sans JP",

      markers: {
        radius: 99,
      },
    },
    yaxis: {
      title: false,
      labels: {
        maxWidth: 200,
        style: {
          fontSize: '14px',
        },
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },
    states: {
      hover: {
        filter: {
          type: "darken",
          value: 0.85,
        },
      },
    },
    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };

  const chartSelector = document.querySelectorAll("#chartTwo");

  if (chartSelector.length) {
    chartTwoInstance = new ApexCharts(
      document.querySelector("#chartTwo"),
      chartTwoOptions,
    );
    chartTwoInstance.render();
  }
};

export default chart02;
