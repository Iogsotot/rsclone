export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image('settings-btn', './assets/interface/settings-icon.png');

    this.load.image('modal-bg', './assets/interface/modal-bg.png');
    this.load.image('title-bg', './assets/interface/title-bg.png');
    this.load.image('modal-close-btn', './assets/interface/close-btn.png');
    this.load.image('lose-img', './assets/interface/lose.png');
    this.load.image('btn', './assets/interface/btn.png');
    this.load.image('btn-pressed', './assets/interface/btn-pressed.png');
    this.load.image('star-1', './assets/interface/star-1.png');
    this.load.image('star-2', './assets/interface/star-2.png');
    this.load.image('star-3', './assets/interface/star-3.png');
  }

  create() {
    this.add.text(20, 20, 'Loading game...');
    // console.log('loading...');
    this.scene.start('MainScene');
  }
}
