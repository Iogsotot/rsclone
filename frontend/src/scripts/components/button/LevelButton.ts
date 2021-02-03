import Button from './Button';
import { levelsConfig } from '../../constants/constants';
import StartScreenModal from '../modal/StartScreenModal';

export default class LevelButton extends Button {
  level: number;

  constructor(scene: Phaser.Scene, x: number, y: number, btnTexture: string, level: number) {
    super(scene, x, y, btnTexture);
    this.level = level;

    this.btnImage.setScale(1.1);
    this.scene.input.keyboard.on(`keydown-${numToStr(level)}`, (event) => {
      this.handleDown();
    });
  }

  handleDown() {
    const modal = new StartScreenModal(
      this.scene,
      levelsConfig[`level_${this.level}`].map.scaleCoordinateTowers.length,
      this.level,
    );
    modal.slideIn();

    modal.startBtn.setInteractive().on('pointerup', () => {
      // get difficulty
      const diff = modal.difficultyBtn.getDifficulty();
      modal.slideOut();
      this.scene.cameras.main.fadeOut(500, 0, 0, 0);
      this.scene.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.time.delayedCall(500, () => {
          this.scene.scene.start('game-scene', { level: this.level, gameDifficulty: diff });
        });
      });
    });
    this.scene.input.keyboard.on('keydown-ENTER', (event) => {
      // get difficulty
      const diff = modal.difficultyBtn.getDifficulty();
      modal.slideOut();
      this.scene.cameras.main.fadeOut(500, 0, 0, 0);
      this.scene.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.time.delayedCall(500, () => {
          this.scene.scene.start('game-scene', { level: this.level, gameDifficulty: diff });
        });
      });
    });

    modal.closeModalBtn.setInteractive().on('pointerup', () => {
      modal.slideOut();
    });

    this.scene.input.keyboard.on('keydown-ESC', (event) => {
      modal.slideOut();
    });
  }
  handleOut() {
    this.setScale(1).setAlpha(0.8);
  }
}

function numToStr(number: number) {
  switch (number) {
    case 0: return 'ZERO';
    case 1: return 'ONE';
    case 2: return 'TWO';
    case 3: return 'THREE';
    case 4: return 'FOUR';
    case 5: return 'FIVE';
    case 6: return 'SIX';
    case 7: return 'SEVEN';
    case 8: return 'EIGHT';
    case 9: return 'NINE';
  }
}