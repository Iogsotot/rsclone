import StartScreenModal from '../modal/StartScreenModal';
import { map1 } from '../../constants/maps';

export default class StartGameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'start-game-scene' });
  }

  preload() {}

  create() {
    const modal = new StartScreenModal(
      this,
      map1.scaleCoordinateTowers.length,
      'modal-bg',
      'title-bg'
    );

    modal.startNewBtn.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      this.scene.start('game-scene', {level: 1, difficulty: 1});
    });
  }
}
