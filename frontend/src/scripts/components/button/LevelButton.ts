import Button from './Button';
import { levelsConfig } from '../../constants/constants';
import StartScreenModal from '../modal/StartScreenModal';

export default class LevelButton extends Button {
  level: number;

  constructor(scene: Phaser.Scene, x: number, y: number, btnTexture: string, level: number) {
    super(scene, x, y, btnTexture);
    this.level = level;
  }

  handleDown() {
    const modal = new StartScreenModal(
      this.scene,
      levelsConfig[`level_${this.level}`].map.scaleCoordinateTowers.length,
      'modal-bg',
      'title-bg',
      this.level
    );

    modal.startNewBtn.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      this.scene.scene.start('game-scene', {level: this.level, difficulty: 1});
    });
  }
  handleOut() {
    this.setScale(1).setAlpha(0.8);
  }
}
