import CustomModal from './CustomModal';
import Button from '../button/Button';

export default class PauseModal extends CustomModal {
  menuBtn: Button;

  restartBtn: Button;

  resumeBtn: Button;

  constructor(scene: Phaser.Scene) {
    super(scene, 'settings-modal-bg', 'settings-header');

    this.initializeButtons(scene);
  }

  initializeButtons(scene: Phaser.Scene) {
    const menuBtnCoordinates = [
      this.sceneCenter[0] - this.bgImage.width / 3,
      this.sceneCenter[1] + this.bgImage.height / 2,
    ];
    this.menuBtn = new Button(scene, menuBtnCoordinates[0], menuBtnCoordinates[1], 'button-menu');

    const restartBtnCoordinates = [
      this.sceneCenter[0],
      this.sceneCenter[1] + this.bgImage.height / 2,
    ];
    this.restartBtn = new Button(
      scene,
      restartBtnCoordinates[0],
      restartBtnCoordinates[1],
      'button-restart'
    );

    const resumeBtnCoordinates = [
      this.sceneCenter[0] + this.bgImage.width / 3,
      this.sceneCenter[1] + this.bgImage.height / 2,
    ];
    this.resumeBtn = new Button(
      scene,
      resumeBtnCoordinates[0],
      resumeBtnCoordinates[1],
      'button-right'
    );
  }
}
