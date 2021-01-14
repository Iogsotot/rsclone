export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.add.text(20, 20, 'Playing game', {
      font: '30px Arial',
      color: 'lightblue',
    });
    this.scene.start('game-scene');
  }
}
