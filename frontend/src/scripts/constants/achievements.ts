import sendDataToBackend from '../achievements/utils/backend';
import { PlayerStatsManager } from "../components/stats/PlayerStats";
const playerStats = new PlayerStatsManager();
import Popup from '../components/events/achievements_popup';

function isGreatDefender(scene) {
  const statsData = playerStats.getFromLocalStorage();
  const gameProgress = statsData['gameProgress'];
  const values: Array<number> = Object.values(gameProgress);

  
  if (values.reduce((a: number, b: number) => a + b, 0) === 9) {
    const popup = new Popup(scene, 0, 0, 'achievementPopup');
    popup.init('greatDefender');
    popup.startAnimation();

    playerStats.saveToLocalStorage({ 'achievements': { ...statsData['achievements'], 'greatDefender': true } });
    sendDataToBackend();
  }
}

function isIronDefender(scene) {
  const statsData = playerStats.getFromLocalStorage();
  const ironModeProgress = statsData['ironModeProgress'];
  const values: Array<number> = Object.values(ironModeProgress);

  
  if (values.reduce((a: number, b: number) => a + b, 0) === 9) {
    const popup = new Popup(scene, 0, 0, 'achievementPopup');
    popup.init('ironDefender');
    popup.startAnimation();
    playerStats.saveToLocalStorage({ 'achievements': { ...statsData['achievements'], 'ironDefender': true } });
    sendDataToBackend();
  }
}

function isCompleteWin(scene) {
  const statsData = playerStats.getFromLocalStorage();
  const gameProgress = statsData['gameProgress'];
  const values: Array<number> = Object.values(gameProgress);

  
  if (values.length === 3 && values.indexOf(0) === -1) {
    const popup = new Popup(scene, 0, 0, 'achievementPopup');
    popup.init('completeWin');
    popup.startAnimation();
    playerStats.saveToLocalStorage({ 'achievements': { ...statsData['achievements'], 'completeWin': true } });
    sendDataToBackend();
  }
}

function isFirstAsterisk(scene) {
  const statsData = playerStats.getFromLocalStorage();
  const gameProgress = statsData['gameProgress'];
  const ironModeProgress = statsData['ironModeProgress'];
  const gameValues: Array<number> = Object.values(gameProgress);
  const ironModeValues: Array<number> = Object.values(ironModeProgress);

  const popup = new Popup(scene, 0, 0, 'achievementPopup');
  popup.init('firstAsterisk');
  popup.startAnimation();
  
  if ((gameValues.indexOf(1) !== -1 || gameValues.indexOf(2) !== -1 || gameValues.indexOf(3) !== -1)
    || (ironModeValues.indexOf(1) !== -1 || ironModeValues.indexOf(2) !== -1 || ironModeValues.indexOf(3) !== -1)) {
    playerStats.saveToLocalStorage({ 'achievements': { ...statsData['achievements'], 'firstAsterisk': true } });
    sendDataToBackend();
  }
}

function isBuilder(scene) {
  const statsData = playerStats.getFromLocalStorage();
  const builtTowers = statsData['builtTowers'];

  
  if (builtTowers === 30) {
    const popup = new Popup(scene, 0, 0, 'achievementPopup');
    popup.init('builder');
    popup.startAnimation();
    playerStats.saveToLocalStorage({ 'achievements': { ...statsData['achievements'], 'builder': true } });
    sendDataToBackend();
  }
}

function isFirstBlood(scene) {
  const statsData = playerStats.getFromLocalStorage();
  const killedEnemies = statsData['killedEnemies'];

  
  if (killedEnemies === 1) {
    const popup = new Popup(scene, 0, 0, 'achievementPopup');
    popup.init('firstBlood');
    popup.startAnimation();
    playerStats.saveToLocalStorage({ 'achievements': { ...statsData['achievements'], 'firstBlood': true } });
    sendDataToBackend();
  }
}

function isKiller(scene) {
  const statsData = playerStats.getFromLocalStorage();
  const killedEnemies = statsData['killedEnemies'];

  
  if (killedEnemies === 150) {
    const popup = new Popup(scene, 0, 0, 'achievementPopup');
    popup.init('killer');
    popup.startAnimation();
    playerStats.saveToLocalStorage({ 'achievements': { ...statsData['achievements'], 'killer': true } });
    sendDataToBackend();
  }
}

function isSeller(scene) {
  const statsData = playerStats.getFromLocalStorage();
  const soldTowers = statsData['soldTowers'];

  
  if (soldTowers === 30) {
    const popup = new Popup(scene, 0, 0, 'achievementPopup');
    popup.init('seller');
    popup.startAnimation();
    playerStats.saveToLocalStorage({ 'achievements': { ...statsData['achievements'], 'seller': true } });
    sendDataToBackend();
  }
}

export { isBuilder, isSeller, isKiller, isIronDefender, isGreatDefender, isFirstBlood, isFirstAsterisk, isCompleteWin }
