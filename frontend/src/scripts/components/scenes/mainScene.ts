export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.add.text(20, 20, 'Playing game', {
      font: '30px Arial',
      color: 'lightblue',
    });
    // alert('next scene?');
    // console.log('loading...')
    this.scene.start('start-game-scene');
  }
}
