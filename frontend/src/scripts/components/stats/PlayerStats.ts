type AchievStats = {
  firstAsterisk: boolean,
  completeVictory: boolean,
  firstBlood: boolean,
  greatDefender: boolean,
  ironDefender: boolean,
  killer: boolean,
  seller: boolean,
  builder: boolean
};

export default class PlayerStats {
  userId: string;

  gameProgress: number;

  gameLogInCount: number;

  killedEnemies: number;

  builtTowers: number;

  soldTowers: number;

  ironModeProgress: number;

  achievements: AchievStats;
  constructor({
    userId,
    gameProgress,
    gameLogInCount,
    killedEnemies,
    builtTowers,
    soldTowers,
    ironModeProgress,
    achievements
  }) {
    this.userId = userId,
    this.gameProgress = gameProgress;
    this.gameLogInCount = gameLogInCount;
    this.killedEnemies = killedEnemies;
    this.builtTowers = builtTowers;
    this.soldTowers = soldTowers;
    this.ironModeProgress = ironModeProgress;
    this.achievements = achievements;
  }
}

import { getCurrentPlayerStats, setCurrentPlayerStats } from '../../backend'
import { KEY_TOKEN, KEY_ID, LOCAL_STORAGE_KEY } from "../../constants/constants"

async function getPlayerStatsFromServer(userId): Promise<object> {
  const token = localStorage.getItem(KEY_TOKEN);
  const response = await getCurrentPlayerStats({ id: userId, token });
  return response
}

async function sendPlayerStatsToServer(userId, data): Promise<object> {
  const token = localStorage.getItem(KEY_TOKEN);
  const response = await setCurrentPlayerStats({ id: userId, token, body: data });
  return response
}


class PlayerStatsManager {

  prepopulateLocalStorage(data: object) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
  }

  saveToLocalStorage(data: object) {
    let currentPlayerStats = this.getFromLocalStorage();
    if (data['level']) {
      const currentLevel = `level_${data['level']}`;
      if (currentPlayerStats['gameProgress'][currentLevel] < data['gameProgress']) {
        currentPlayerStats['gameProgress'][currentLevel] = data['gameProgress'];
      }
      if (currentPlayerStats['ironModeProgress'][currentLevel] < data['ironModeProgress']) {
        currentPlayerStats['ironModeProgress'][currentLevel] = data['ironModeProgress'];
      }
    }
    if (data['builtTowers']) currentPlayerStats.builtTowers = data['builtTowers'];
    if (data['soldTowers']) currentPlayerStats.soldTowers = data['soldTowers'];
    if (data['killedEnemies']) currentPlayerStats.killedEnemies = data['killedEnemies'];
    if (data['achievements']) currentPlayerStats.achievements = data['achievements'];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentPlayerStats))
  }

  getFromLocalStorage() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ||
      JSON.stringify({
 builtTowers: 0, soldTowers: 0, killedEnemies: 0, gameLogInCount: 0, achievements: {} 
}))
  }
}

export { getPlayerStatsFromServer, sendPlayerStatsToServer, PlayerStatsManager };
