import LoseModal from '../modal/LoseModal';

export default class LoseScene extends Phaser.Scene {
  constructor() {
    super({ key: 'lose-scene' });
  }

  preload() {}

  create() {
    const modal = new LoseModal(this);

    this.tweens.add({
      targets: modal,
      scale: { start: 0.3, to: 1 },
      ease: 'Elastic.Out',
      repeat: 0,
      duration: 1000,
    });

    modal.cancelBtn.setInteractive().on('pointerup', () => {
      modal.disappearance();
      this.cancel();
    });

    this.input.keyboard.on('keydown-LEFT', (event) => {
      if (event.ctrlKey) {
        this.cancel();
      }
    });

    modal.restartBtn.setInteractive().on('pointerup', () => {
      modal.disappearance();
      this.time.delayedCall(300, () => this.scene.start('game-scene'));
    });

    this.input.keyboard.on('keydown-R', (event) => {
      modal.disappearance();
      this.time.delayedCall(300, () => this.scene.start('game-scene'));
    });
  }

  cancel() {
    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.time.delayedCall(500, () => {
        this.scene.stop('game-scene');
        this.scene.start('LevelsScene');
      });
    });
  }
}
