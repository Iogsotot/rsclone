import generateLevelsMap from '../../levels-map/generateLevelsMap';
import LevelButton from '../button/LevelButton';

export default class LevelsScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LevelsScene' });
  }

  create() {
    this.add.image(0, 0, 'levelsMap').setOrigin(0, 0);
    const level1Button = new LevelButton(this, 500, 320, 'level1Button', 1).setAlpha(0.8);
    const level2Button = new LevelButton(this, 500, 550, 'level2Button', 2).setAlpha(0.8);
    const level3Button = new LevelButton(this, 855, 710, 'level3Button', 3).setAlpha(0.8);
  }
}
