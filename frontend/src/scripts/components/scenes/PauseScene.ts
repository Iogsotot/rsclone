import PauseModal from '../modal/PauseModal';
import Modal from '../modal/Modal';

export default class PauseScene extends Phaser.Scene {
  constructor() {
    super({ key: 'pause-scene' });
  }

  preload() {}

  create() {
    const modal = new PauseModal(this, 'modal-bg', 'title-bg');

    modal.closeBtn.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      this.scene.stop();
      this.scene.resume('game-scene');
      console.log('close');
    });

    modal.startNewBtn.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      this.scene.stop();
      this.scene.start('game-scene');
    });

    modal.quitBtn.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      
      this.scene.stop();
      this.scene.start('game-scene');
    });
  }
}
