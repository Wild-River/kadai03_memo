import "../css/style.css";
import Alpine from "alpinejs";
import persist from "@alpinejs/persist";
import chart01 from "./components/charts/chart-01";
import chart02 from "./components/charts/chart-02";
import chart03 from "./components/charts/chart-03";
import { mkCharacters } from "./components/data/mk-characters";
import { mkVehicles } from "./components/data/mk-vehicles";
import { calcCombined, convertStatsHalf } from "./components/utils/mk-calc";

window.chart01 = chart01;
window.chart02 = chart02;
window.chart03 = chart03;
window.calcCombined = calcCombined;
window.convertStatsHalf = convertStatsHalf;

Alpine.plugin(persist);
window.Alpine = Alpine;

if (!localStorage.getItem('mk_characters')) {
  localStorage.setItem('mk_characters', JSON.stringify(mkCharacters));
}
if (!localStorage.getItem('mk_vehicles')) {
  localStorage.setItem('mk_vehicles', JSON.stringify(mkVehicles));
}

Alpine.start();

// キャラクター更新
window.editCharacter = (character) => {
  window.location.href = `edit-character.html?name=${character.name}`;
};
// マシン更新
window.editVehicle = (vehicle) => {
  window.location.href = `edit-vehicle.html?name=${vehicle.name}`;
};

// キャラクター削除
window.deleteCharacter = (character) => {
  const characters = JSON.parse(localStorage.getItem('mk_characters') || '[]');
  const updated = characters.filter(c => c.name !== character.name);
  localStorage.setItem('mk_characters', JSON.stringify(updated));
  // Alpine.jsの変数も更新
  const alpineData = document.body._x_dataStack[0];
  alpineData.mkCharacters = updated;
  alpineData.character = updated[0] ?? null;
  alpineData.characterStats = updated[0] ? window.convertStatsHalf(updated[0]) : null;
  if (updated[0]) window.chart01(updated[0].name);  // nullチェック追加
};

// マシン削除
window.deleteVehicle = (vehicle) => {
  const vehicles = JSON.parse(localStorage.getItem('mk_vehicles') || '[]');
  const updated = vehicles.filter(v => v.name !== vehicle.name);
  localStorage.setItem('mk_vehicles', JSON.stringify(updated));
  const alpineData = document.body._x_dataStack[0];
  alpineData.mkVehicles = updated;
  alpineData.vehicle = updated[0] ?? null;
  alpineData.vehicleStats = updated[0] ? window.convertStatsHalf(updated[0]) : null;
  if (updated[0]) window.chart02(updated[0].name);  // nullチェック追加
};