import Button from './Button';
import { levelsConfig } from '../../constants/constants';
import StartScreenModal from '../modal/StartScreenModal';

export default class LevelButton extends Button {
  level: number;

  constructor(scene: Phaser.Scene, x: number, y: number, btnTexture: string, level: number) {
    super(scene, x, y, btnTexture);
    this.level = level;
    this.btnImage.setScale(1.1)
  }

  handleDown() {
    const modal = new StartScreenModal(
      this.scene,
      levelsConfig[`level_${this.level}`].map.scaleCoordinateTowers.length,
      this.level
    );
    modal.slideIn()

    modal.startBtn.setInteractive().on('pointerup', () => {
      // get difficulty
      const diff = modal.difficultyBtn.getDifficulty()
      modal.slideOut()
      this.scene.cameras.main.fadeOut(500, 0, 0, 0)
	    this.scene.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.time.delayedCall(500, () => {
          this.scene.scene.start('game-scene', {level: this.level, difficulty: diff});
        })
	    })
    });

    modal.closeModalBtn.setInteractive().on('pointerup', () => {
      modal.slideOut()
      setTimeout(() => {
        this.scene.scene.run('LevelsScene')
      }, 400);
    })
  }
  handleOut() {
    this.setScale(1).setAlpha(0.8);
  }
}
