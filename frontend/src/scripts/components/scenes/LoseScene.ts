import LoseModal from '../modal/LoseModal';
import CustomModal from '../modal/CustomModal';

export default class LoseScene extends Phaser.Scene {
  constructor() {
    super({ key: 'lose-scene' });
  }

  preload() {}

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
