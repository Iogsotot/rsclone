import { PlayerStatsManager } from "../components/stats/PlayerStats";
import { LOCAL_STORAGE_KEY } from "./constants"

const achievements = {
  firstAsterisk: false,
  completeWin: false,
  firstBlood: false,
  greatDefender: false,
  ironDefender: false,
  killer: false,
  seller: false,
  builder: false,
}
const playerStats = new PlayerStatsManager();

function isGreatDefender() {
  const statsData = playerStats.getFromLocalStorage();
  const gameProgress = statsData['gameProgress'];
  const values: Array<number> = Object.values(gameProgress);

  if (values.reduce((a: number, b: number) => a + b, 0) === 9) {
    playerStats.saveToLocalStorage({ 'achievements': { ...statsData['achievements'], 'greatDefender': true } });
  }
  //if (cсумма всех звёзд по всем уровням (gameProgress) = 9) {
  // изменять в LS greatDefender: true
  // }
  // const key = LOCAL_STORAGE_KEY;
  // console.log(localStorage.getItem(LOCAL_STORAGE_KEY));
  // JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "")
  // return console.log(context.state);
}

function isIronDefender() {
  //if (cсумма всех звёзд по всем уровням (ironModeProgress) = 9) {
  // изменять в LS ironDefender: true
  // }
  const statsData = playerStats.getFromLocalStorage();
  const ironModeProgress = statsData['ironModeProgress'];
  const values: Array<number> = Object.values(ironModeProgress);

  if (values.reduce((a: number, b: number) => a + b, 0) === 9) {
    playerStats.saveToLocalStorage({ 'achievements': { ...statsData['achievements'], 'ironDefender': true } });
  }
}

function isCompleteWin() {
  //if (если у каждого ключа в gameProgress есть значение не равное 0) {
  // изменять в LS completeWin: true
  // }
  const statsData = playerStats.getFromLocalStorage();
  const gameProgress = statsData['gameProgress'];
  const values: Array<number> = Object.values(gameProgress);
  if (values.length === 3 && values.indexOf(0) === -1) {
    playerStats.saveToLocalStorage({ 'achievements': { ...statsData['achievements'], 'completeWin': true } });
  }
}

function isFirstAsterisk() {
  //if (если у любого ключа в gameProgress или в ironModeProgress значение не равное 0) {
  // изменять в LS firstAsterisk: true
  // }
  const statsData = playerStats.getFromLocalStorage();
  const gameProgress = statsData['gameProgress'];
  const ironModeProgress = statsData['ironModeProgress'];
  const gameValues: Array<number> = Object.values(gameProgress);
  const ironModeValues: Array<number> = Object.values(ironModeProgress);
  if ((gameValues.indexOf(1) !== -1 || gameValues.indexOf(2) !== -1 || gameValues.indexOf(3) !== -1)
    || (ironModeValues.indexOf(1) !== -1 || ironModeValues.indexOf(2) !== -1 || ironModeValues.indexOf(3) !== -1)) {
    playerStats.saveToLocalStorage({ 'achievements': { ...statsData['achievements'], 'firstAsterisk': true } });
  }
}

function isBuilder() {
  const statsData = playerStats.getFromLocalStorage();
  const builtTowers = statsData['builtTowers'];
  if (builtTowers === 30) {
    playerStats.saveToLocalStorage({ 'achievements': { ...statsData['achievements'], 'builder': true } });
  }
}

function isFirstBlood() {
  const statsData = playerStats.getFromLocalStorage();
  const killedEnemies = statsData['killedEnemies'];
  if (killedEnemies === 1) {
    console.log("AFASFSADFASFAFAFASF")
    playerStats.saveToLocalStorage({ 'achievements': { ...statsData['achievements'], 'firstBlood': true } });
  }
}

function isKiller() {
  const statsData = playerStats.getFromLocalStorage();
  const killedEnemies = statsData['killedEnemies'];
  if (killedEnemies === 150) {
    playerStats.saveToLocalStorage({ 'achievements': { ...statsData['achievements'], 'killer': true } });
  }
}

function isSeller() {
  const statsData = playerStats.getFromLocalStorage();
  const soldTowers = statsData['soldTowers'];
  if (soldTowers === 30) {
    playerStats.saveToLocalStorage({ 'achievements': { ...statsData['achievements'], 'seller': true } });
  }
}

export { isBuilder, isSeller, isKiller, isIronDefender, isGreatDefender, isFirstBlood, isFirstAsterisk, isCompleteWin }