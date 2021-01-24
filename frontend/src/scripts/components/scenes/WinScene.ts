import WinModal from '../modal/WinModal';

export default class WinScene extends Phaser.Scene {
  starsNumber: any;
  constructor(starsNumber) {
    super({ key: 'win-scene' });
    this.starsNumber = starsNumber;
  }

  preload() {}

  create(data: any) {
    const modal = new WinModal(this, data.starsNumber);
    modal.continueBtn.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      this.scene.stop('game-scene');
      this.scene.start('LevelsScene');
    });

    modal.restartBtn.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      this.scene.start('game-scene');
    });
  }
}
