import LevelButton from '../../components/button/LevelButton';

export default class LevelsScene extends Phaser.Scene {
  sounds: {[key: string]: Phaser.Sound.BaseSound | any} = {};
  constructor() {
    super({ key: 'LevelsScene' });
  }

  createSounds() {
    this.sounds = {
      mainTheme: this.sound.add('main-theme', {
        loop: true,
        volume: 1,
      }),
      levelTheme: this.sound.add('level-1', {
        loop: true,
        volume: 1,
      }),
      levelAttack: this.sound.add('level-1-attack', {
        loop: true,
        volume: 1,
      }),
      
      win: this.sound.add('win', {
        volume: 1,
      }),
      defeat: this.sound.add('defeat', {
        volume: 1,
      }),
    };
    
    this.sounds.mainTheme.setVolume(0.5);

    if (!this.sounds.mainTheme.isPlaying) {
      this.sounds.mainTheme.play();
    }
    // this.sounds.mainTheme.play();
    // console.log(Object.keys(this.sounds.mainTheme), this.sounds.mainTheme.config, this.sounds.mainTheme);
    // console.log(this.sounds);
  }

  create() {
    this.createSounds();
    this.cameras.main.fadeIn(750, 0, 0, 0)
    this.add.image(0, 0, 'levelsMap').setOrigin(0, 0);
    new LevelButton(this, 500, 300, 'level1Button', 1).setAlpha(0.8);
    new LevelButton(this, 500, 520, 'level2Button', 2).setAlpha(0.8);
    new LevelButton(this, 980, 590, 'level3Button', 3).setAlpha(0.8);
  }
}
