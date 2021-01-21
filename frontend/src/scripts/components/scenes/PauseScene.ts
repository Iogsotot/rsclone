import PauseModal from '../modal/PauseModal';
import Modal from '../modal/Modal';

export default class PauseScene extends Phaser.Scene {
  constructor() {
    super({ key: 'pause-scene' });
  }

  preload() {}

  create() {
    const modal = new PauseModal(this);

    modal.closeModalBtn.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      this.scene.stop();
      this.scene.resume('game-scene');
    });
    
    modal.menuBtn.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      this.scene.stop('game-scene');
      this.scene.start('LevelsScene');
    });

    modal.restartBtn.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      this.scene.start('game-scene');
    });
    
    modal.resumeBtn.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      this.scene.stop();
      this.scene.resume('game-scene');
    });
  }
}
