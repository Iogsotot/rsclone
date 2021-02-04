import WinModal from '../modal/WinModal';
import {
  isGreatDefender,
  isIronDefender,
  isCompleteWin,
  isFirstAsterisk,
} from '../../constants/achievements';

export default class WinScene extends Phaser.Scene {
  starsNumber: any;

  constructor(starsNumber) {
    super({ key: 'win-scene' });
    this.starsNumber = starsNumber;
  }

  preload() {}

  create(data: any) {
    const modal = new WinModal(this, data.starsNumber);

    this.tweens.add({
      targets: modal,
      scale: { start: 0.3, to: 1 },
      ease: 'Elastic.Out',
      repeat: 0,
      duration: 1000,
    });

    isGreatDefender(this);
    isIronDefender(this);
    isCompleteWin(this);
    isFirstAsterisk(this);

    modal.continueBtn.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      modal.disappearance();
      this.continue();
    });

    this.input.keyboard.on('keydown-RIGHT', (event) => {
      if (event.ctrlKey) {
        this.continue();
      }
    });

    modal.restartBtn.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      modal.disappearance();
      this.time.delayedCall(300, () => this.scene.start('game-scene'));
    });

    this.input.keyboard.on('keydown-R', (event) => {
      modal.disappearance();
      this.time.delayedCall(300, () => this.scene.start('game-scene'));
    });
  }

  continue() {
    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.time.delayedCall(500, () => {
        this.scene.start('LevelsScene');
        this.scene.stop('game-scene');
      });
    });
  }
}
