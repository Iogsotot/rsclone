import StartScreenModal from '../modal/StartScreenModal';
import { map1 } from '../../constants/maps';

export default class StartGameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'start-game-scene' });
  }

  preload() {
    this.load.image('modal-bg', './assets/interface/modal-bg.png');
    this.load.image('title-bg', './assets/interface/title-bg.png');
    this.load.image('modal-close-btn', './assets/interface/close-btn.png');
    this.load.image('lose-img', './assets/interface/lose.png');
    this.load.image('btn', './assets/interface/btn.png');
    this.load.image('btn-pressed', './assets/interface/btn-pressed.png');
    this.load.image('map', map1.url);
  }

  create() {
    const modal = new StartScreenModal(this, map1.scaleCoordinateTowers.length, 'modal-bg', 'title-bg');

    modal.startNewBtn.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      this.scene.start('game-scene');
    });
  }
}
