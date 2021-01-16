import CustomModal from './CustomModal';
import Button from '../button/Button';

export default class PauseModal extends CustomModal {
  closeBtn: Button;

  constructor(scene: Phaser.Scene, bgTexture: string, titleTexture: string) {
    super(scene, 'Paused', bgTexture, titleTexture);

    this.closeButton(scene);
  }

  closeButton(scene: Phaser.Scene) {
    this.closeBtn = new Button(scene, 0, 0, 'modal-close-btn');
    const closeBtnCoordinates = [
      this.sceneCenter[0] + this.bgImage.width / 2 - this.closeBtn.btnImage.width / 2,
      this.sceneCenter[1] - this.bgImage.height / 2 + this.closeBtn.btnImage.height / 2,
    ];
    this.closeBtn.setPosition(closeBtnCoordinates[0], closeBtnCoordinates[1]);
  }
}
