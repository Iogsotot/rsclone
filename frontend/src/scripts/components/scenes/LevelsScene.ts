import generateLevelsMap from '../../levels-map/generateLevelsMap';
import LevelButton from '../../components/button/LevelButton';

export default class LevelsScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LevelsScene' });
  }

  create() {
    this.add.image(0, 0, 'levelsMap').setOrigin(0, 0);
    const level1Button = new LevelButton(this, 300, 200, 'level1Button', 1);
    const level2Button = new LevelButton(this, 700, 300, 'level2Button', 2);
    const level3Button = new LevelButton(this, 1000, 500, 'level3Button', 3);
  }
}
