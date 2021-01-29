import LevelButton from '../../components/button/LevelButton';

export default class LevelsScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LevelsScene' });
  }

  create() {
    this.cameras.main.fadeIn(750, 0, 0, 0)
    this.add.image(0, 0, 'levelsMap').setOrigin(0, 0);
    new LevelButton(this, 500, 300, 'level1Button', 1).setAlpha(0.8);
    new LevelButton(this, 500, 520, 'level2Button', 2).setAlpha(0.8);
    new LevelButton(this, 980, 590, 'level3Button', 3).setAlpha(0.8);
  }
}
