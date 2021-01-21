import PauseModal from '../modal/PauseModal';
import Modal from '../modal/Modal';

export default class PauseScene extends Phaser.Scene {
  modal: PauseModal

  constructor() {
    super({ key: 'pause-scene' });
  }

  preload() {}

  create() {
    this.modal = new PauseModal(this);
    this.modal.slideIn(this)

    this.events.on('resume', () => {
      this.modal.slideIn(this)
    })

    this.modal.closeModalBtn.setInteractive().on('pointerup', () => {
      this.modal.slideOut(this)
      setTimeout(() => {
        this.scene.pause();
        this.scene.run('game-scene');
        this.scene.moveBelow('game-scene')
      }, 400);
    });

    this.modal.menuBtn.setInteractive().on('pointerup', () => {
      this.scene.stop('game-scene');
      this.scene.start('LevelsScene');
    });

    this.modal.restartBtn.setInteractive().on('pointerup', () => {
      this.scene.start('game-scene');
    });

    this.modal.resumeBtn.setInteractive().on('pointerup', () => {
      this.modal.slideOut(this)
      setTimeout(() => {
        this.scene.pause();
        this.scene.run('game-scene');
        this.scene.moveBelow('game-scene')
      }, 400);
    });
  }
}
