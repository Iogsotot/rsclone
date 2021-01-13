import { map1 } from '../../constants/maps';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image('map', map1.url);

    this.load.spritesheet('tower', './assets/tower-WIP/tower.png', {
      frameWidth: 60,
      frameHeight: 60
    });

    this.load.spritesheet('defaultEnemy', './assets/sprites/mummy37x45.png', {
      frameWidth: 37,
      frameHeight: 45
    });

    this.load.spritesheet('scorpio', './assets/sprites/scorpio.png', {
      frameWidth: 212,
      frameHeight: 246
    });
  }

  create() {
    this.add.text(20, 20, 'Loading game...');
    // console.log('loading...');
    this.scene.start('MainScene');
  }
}
