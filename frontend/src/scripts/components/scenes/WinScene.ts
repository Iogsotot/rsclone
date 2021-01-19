import WinModal from '../modal/WinModal';

export default class WinScene extends Phaser.Scene {
  constructor() {
    super({ key: 'win-scene' });
  }

  preload() {}

  create() {
    const modal = new WinModal(this, 2);

    modal.continueBtn.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      this.scene.stop('game-scene');
      this.scene.start('LevelsScene');
    });

    modal.restartBtn.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      this.scene.start('game-scene');
    });
  }
}
