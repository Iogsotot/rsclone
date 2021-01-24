// IMPORTANT TO IMPLEMENT
// export default function getPlayerStatsFromServer(userId) {
//   // await fetch bla bla
//   // getStat() {
//   //   // went to do backend answers
//   // }
//   return {
//     gameProgress: 0,
//     gameLogInCount: 0,
//     killedEnemies: 0,
//     builtTowers: 0,
//     soldTowers: 0,
//     ironModeProgress: 0,

//     achievements: {
//       firstAsterisk: false,
//       completeVictory: false,
//       firstBlood: false,
//       GreatDefender: false,
//       IronDefender: false,
//       killer: false,
//       seller: false,
//       builder: false,
//     }

type AchievStats = {
  firstAsterisk: boolean,
  completeVictory: boolean,
  firstBlood: boolean,
  GreatDefender: boolean,
  IronDefender: boolean,
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
import { KEY_TOKEN } from '../../constants/constants';

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

export {getPlayerStatsFromServer, sendPlayerStatsToServer};


