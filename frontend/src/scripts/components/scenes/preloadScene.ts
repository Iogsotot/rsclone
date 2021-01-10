export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  create() {
    this.add.text(20, 20, 'Loading game...');
    // console.log('loading...');
    this.scene.start('MainScene');
  }
}
