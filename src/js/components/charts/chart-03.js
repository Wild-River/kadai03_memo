import ApexCharts from "apexcharts";
import { convertStats } from "../utils/mk-calc";

let chartThreeInstance = null;

const chart03 = (combined) => {

  if (chartThreeInstance) {
    chartThreeInstance.destroy();
    chartThreeInstance = null;
  }

  if (!combined) return;

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

  // chart-03.js 専用の変換関数
  const convertHalf = (value, base) => parseFloat((value / 5 + base / 2).toFixed(1));

  const convertStatsHalf = (data) => ({
    on_road_speed: convertHalf(data.on_road_speed, 0.4),
    off_road_speed: convertHalf(data.off_road_speed, 0.4),
    water_speed: convertHalf(data.water_speed, 0.4),
    acceleration: convertHalf(data.acceleration, 0.6),
    mini_turbo: convertHalf(data.mini_turbo, 0.8),
    weight: convertHalf(data.weight, 0.6),
    coin_curve: convertHalf(data.coin_curve, 0.6),
    on_road_handling: convertHalf(data.on_road_handling, 0.2),
    off_road_handling: convertHalf(data.off_road_handling, 0.2),
    water_handling: convertHalf(data.water_handling, 0.2),
    invincibility: convertHalf(data.invincibility, 0),
  });

  const characterStats = convertStatsHalf(combined.character);
  const vehicleStats = convertStatsHalf(combined.vehicle);

  const series = [
    {
      name: combined.character.name_ja,
      data: [
        characterStats.on_road_speed,
        characterStats.off_road_speed,
        characterStats.water_speed,
        characterStats.acceleration,
        characterStats.mini_turbo,
        characterStats.weight,
        characterStats.coin_curve,
        characterStats.on_road_handling,
        characterStats.off_road_handling,
        characterStats.water_handling,
        characterStats.invincibility,
      ],
    },
    {
      name: combined.vehicle.name_ja,
      data: [
        vehicleStats.on_road_speed,
        vehicleStats.off_road_speed,
        vehicleStats.water_speed,
        vehicleStats.acceleration,
        vehicleStats.mini_turbo,
        vehicleStats.weight,
        vehicleStats.coin_curve,
        vehicleStats.on_road_handling,
        vehicleStats.off_road_handling,
        vehicleStats.water_handling,
        vehicleStats.invincibility,
      ],
    }
  ];

  const chartThreeOptions = {
    series: series,
    colors: ["#FFD902", "#FF2A3B"],
    chart: {
      fontFamily: "'Noto Sans JP', sans-serif",
      type: "bar",
      height: 480,
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
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
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Noto Sans JP",
      markers: { radius: 99 },
    },
    yaxis: {
      title: false,
      labels: {
        maxWidth: 200,
        style: { fontSize: '14px' },
      },
    },
    grid: {
      xaxis: { lines: { show: true } },
    },
    fill: { opacity: 1 },
    states: {
      hover: {
        filter: { type: "darken", value: 0.85 },
      },
    },
    tooltip: {
      x: { show: false },
      y: {
        formatter: (val) => val,
      },
    },
  };

  const chartSelector = document.querySelectorAll("#chartThree");

  if (chartSelector.length) {
    chartThreeInstance = new ApexCharts(
      document.querySelector("#chartThree"),
      chartThreeOptions,
    );
    chartThreeInstance.render().then(() => {
      window.dispatchEvent(new Event('resize'));
    });
  }
};

export default chart03;