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
    this.modal.slideIn();

    this.events.on('resume', () => {
      this.modal.slideIn()
    })

    this.modal.closeModalBtn.setInteractive().on('pointerup', () => {
      this.modal.slideOut();
      setTimeout(() => {
        this.sound.resumeAll();
        this.scene.pause();
        this.scene.run('game-scene');
        this.scene.moveBelow('game-scene');
      }, 400);
    });

    this.modal.menuBtn.setInteractive().on('pointerup', () => {
      this.modal.slideOut();
      this.cameras.main.fadeOut(500, 0, 0, 0)
	    this.cameras.main.once('camerafadeoutcomplete', () => {
        this.time.delayedCall(1000, () => {
          this.scene.stop('game-scene');
          this.scene.start('LevelsScene');
        })
	    })
    });

    this.modal.restartBtn.setInteractive().on('pointerup', () => {
      this.modal.slideOut();
      this.time.delayedCall(300, () => this.scene.start('game-scene'));
    });

    this.modal.resumeBtn.setInteractive().on('pointerup', () => {
      this.modal.slideOut();
      setTimeout(() => {
        this.sound.resumeAll();
        this.scene.pause();
        this.scene.run('game-scene');
        this.scene.moveBelow('game-scene');
      }, 400);
    });
  }
}
