import LoseModal from '../modal/LoseModal';
import CustomModal from '../modal/CustomModal';

export default class LoseScene extends Phaser.Scene {
  constructor() {
    super({ key: 'lose-scene' });
  }

  preload() {}

  create() {
    const modal = new LoseModal(this);

    modal.cancelBtn.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      this.scene.stop('game-scene');
      this.scene.start('LevelsScene');
    });

    modal.restartBtn.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      this.scene.start('game-scene');
    });
  }
}
