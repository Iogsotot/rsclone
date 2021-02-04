import { levelsConfig } from './constants/constants';

export default class LevelSettings {
  level: number;

  // мб переделать на enum ?
  gameDifficulty: number;

  config: object;

  constructor(level: number, gameDifficulty: number) {
    this.level = level;
    this.gameDifficulty = gameDifficulty;
    this.config = this.produceConfig();
  }

  produceConfig() {
    return levelsConfig[`level_${this.level}`];
  }
}
