import LoseModal from '../modal/LoseModal';
import CustomModal from '../modal/CustomModal';

export default class LoseScene extends Phaser.Scene {
  constructor() {
    super({ key: 'lose-scene' });
  }

  preload() {
    this.load.image('modal-bg', './assets/interface/modal-bg.png');
    this.load.image('title-bg', './assets/interface/title-bg.png');
    this.load.image('modal-close-btn', './assets/interface/close-btn.png');
    this.load.image('lose-img', './assets/interface/lose.png');
    this.load.image('btn', './assets/interface/btn.png');
    this.load.image('btn-pressed', './assets/interface/btn-pressed.png');
  }

  create() {
    const modal = new LoseModal(this, 'modal-bg', 'title-bg');

    modal.startNewBtn.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      this.scene.start('game-scene');
    });
    
    modal.continueBtn.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      this.scene.stop();
      this.scene.resume('game-scene');
    });
  }
}
