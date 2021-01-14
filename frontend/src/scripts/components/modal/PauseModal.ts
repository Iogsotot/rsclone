import CustomModal from './CustomModal';
import Button from '../button/Button';

export default class PauseModal extends CustomModal {
  closeBtn: Button;

  sceneSize: number[];

  constructor(scene: Phaser.Scene, bgTexture: string, titleTexture: string) {
    super(scene, 'Paused', bgTexture, titleTexture);

    this.sceneSize = [scene.cameras.main.centerX, scene.cameras.main.centerY];

    this.closeButton(scene);
  }

  closeButton(scene: Phaser.Scene) {
    this.closeBtn = new Button(
      scene,
      this.sceneSize[0] + this.bgImage.width / 2,
      135,
      'modal-close-btn'
    );
  }

}
