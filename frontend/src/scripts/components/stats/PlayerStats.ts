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
  gameProgress: number;

  gameLogInCount: number;

  killedEnemies: number;

  builtTowers: number;

  soldTowers: number;

  ironModeProgress: number;

  achievements: AchievStats;

  constructor() {
    this.gameProgress = 0;
    this.gameLogInCount = 0;
    this.killedEnemies = 0;
    this.builtTowers = 0;
    this.soldTowers = 0;
    this.ironModeProgress = 0;

    this.achievements = {
      firstAsterisk: false,
      completeVictory: false,
      firstBlood: false,
      GreatDefender: false,
      IronDefender: false,
      killer: false,
      seller: false,
      builder: false,
    };

  //   this.getDataFromServer();
  }

  // getDataFromServer() {
  // }
}