import PauseModal from '../modal/PauseModal';
import Modal from '../modal/Modal';

export default class PauseScene extends Phaser.Scene {
  constructor() {
    super({ key: 'pause-scene' });
  }

  preload() {
    this.load.image('modal-bg', './assets/interface/modal-bg.png');
    this.load.image('title-bg', './assets/interface/title-bg.png');
    this.load.image('modal-close-btn', './assets/interface/close-btn.png');
    this.load.image('btn', './assets/interface/btn.png');
    this.load.image('btn-pressed', './assets/interface/btn-pressed.png');
  }

  create() {
    const modal = new PauseModal(this, 'modal-bg', 'title-bg');

    modal.closeBtn.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      this.scene.stop();
      this.scene.resume('game-scene');
      console.log('close')
    });

    modal.startNewBtn.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      this.scene.stop();
      this.scene.start('game-scene');
    });
  }
}
