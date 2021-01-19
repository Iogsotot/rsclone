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
