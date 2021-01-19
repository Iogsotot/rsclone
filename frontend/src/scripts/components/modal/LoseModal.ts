import Modal from './Modal';
import Button from '../button/Button';

export default class LoseModal extends Modal {
  starsImage: Phaser.GameObjects.Image;

  restartBtn: Button

  cancelBtn: Button

  constructor(scene: Phaser.Scene) {
    super(scene, 'failed-modal-bg', 'failed-header');

    this.header.setY(this.sceneCenter[1] - this.bgImage.height / 2 + this.header.height / 2)

    this.starsImage = scene.add.image(
      this.sceneCenter[0],
      this.sceneCenter[1] - this.bgImage.width / 6,
      'star-grey'
    );
    this.add(this.starsImage);

    this.initializeButtons(scene)
  }

  initializeButtons(scene: Phaser.Scene) {
    this.cancelBtn = new Button(scene, 0, 0, 'button-left');
    const cancelBtnCoordinates = [
      this.sceneCenter[0] - this.bgImage.width / 2 + this.cancelBtn.width,
      this.sceneCenter[1] + this.bgImage.height / 2 - this.cancelBtn.width / 4,
    ];
    this.cancelBtn.setPosition(cancelBtnCoordinates[0], cancelBtnCoordinates[1]);

    this.restartBtn = new Button(scene, 0, 0, 'button-restart');
    const restartBtnCoordinates = [
      this.sceneCenter[0] + this.bgImage.width / 2 - this.restartBtn.width,
      this.sceneCenter[1] + this.bgImage.height / 2 - this.restartBtn.width / 4,
    ];
    this.restartBtn.setPosition(restartBtnCoordinates[0], restartBtnCoordinates[1]);
  }
}
