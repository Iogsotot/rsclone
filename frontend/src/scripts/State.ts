// import { GameObjects } from "phaser";
import { use } from "matter";
import { sendPlayerStatsToServer } from "./components/stats/PlayerStats";
import { levelsConfig, LOCAL_STORAGE_KEY } from "./constants/constants"

export default class State {
  level: number;
  // мб переделать на enum ?
  gameDifficulty: number;
  config: object;
  currentGameStats: object;
  playerStats: object;

  constructor(level: number, gameDifficulty: number) {
    this.level = level;
    this.gameDifficulty = gameDifficulty;
    this.config = this.produceConfig();
    this.currentGameStats = {};
  }

  produceConfig() {
    return levelsConfig[`level_${this.level}`];
  }

  updateCurrentGameStats(data: object) {
    this.currentGameStats = { ...this.currentGameStats, ...data }
  }

  preparePlayerStatsForBackend() {
    let currentPlayerStats = this.getFromLocalStorage();
    const currentLevel = `level_${this.level}`;
    if (!currentPlayerStats['gameProgress']) {
      currentPlayerStats['gameProgress'] = { [currentLevel]: this.currentGameStats['levelProgress'] };
    } else if (!currentPlayerStats['gameProgress'][currentLevel] || currentPlayerStats['gameProgress'][currentLevel] < this.currentGameStats['levelProgress']) {
      currentPlayerStats['gameProgress'][currentLevel] = this.currentGameStats['levelProgress'];
    }
    if (!currentPlayerStats['ironModeProgress']) {
      currentPlayerStats['ironModeProgress'] = { [currentLevel]: this.currentGameStats['levelProgress'] };
    } else if (!currentPlayerStats['ironModeProgress'][currentLevel] || currentPlayerStats['ironModeProgress'][currentLevel] < this.currentGameStats['levelProgress']) {
      currentPlayerStats['ironModeProgress'][currentLevel] = this.currentGameStats['levelProgress'];
    }
    currentPlayerStats.builtTowers += this.currentGameStats['builtTowers'];
    currentPlayerStats.soldTowers += this.currentGameStats['soldTowers'];
    currentPlayerStats.killedEnemies += this.currentGameStats['killedEnemies'];
    currentPlayerStats.gameLogInCount = currentPlayerStats['gameLogInCount'];
    currentPlayerStats.achievements =  currentPlayerStats.achievements || this.getAchievements();
    return currentPlayerStats;
  }

  getAchievements() {
    // TODO
  }

  async sendDataToBackend() {
    // TODO вызвать sendPlayerStatsToServer из PlayerStats
    const data = this.preparePlayerStatsForBackend()
    const userId = localStorage.getItem("id");
    await sendPlayerStatsToServer(userId, data)
  }

  // должен отправлять на backend эту же информацию (+ инфу по ачивкав из state)

  saveToLocalStorage(data: any = null) {
    if (!data) {
      data = this.preparePlayerStatsForBackend();
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
  }

  getFromLocalStorage() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ||
      JSON.stringify({ 'builtTowers': 0, 'soldTowers': 0, 'killedEnemies': 0, 'gameLogInCount': 0, 'achievements': {} }))
  }
}