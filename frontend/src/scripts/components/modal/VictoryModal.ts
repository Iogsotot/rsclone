import Modal from './Modal';
import Button from '../button/Button';

export default class VictoryModal extends Modal {
  continueBtn: Button
  
  restartBtn: Button

  starsImage: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, starsNumber: 1 | 2 | 3) {
    super(scene, 'win-modal-bg', 'win-header');

    this.header.setY(-this.bgImage.height / 2 + this.header.height / 2)

    this.starsImage = scene.add.image(
      0,
      -this.bgImage.width / 6,
      `star-${starsNumber}`
    );
    this.add(this.starsImage);

    this.initializeButtons(scene);
  }

  initializeButtons(scene: Phaser.Scene) {
    this.restartBtn = new Button(scene, 0, 0, 'button-restart');
    const restartBtnCoordinates = [
      -this.bgImage.width / 2 + this.restartBtn.width,
      this.bgImage.height / 2 - this.restartBtn.width / 4,
    ];
    this.restartBtn.setPosition(restartBtnCoordinates[0], restartBtnCoordinates[1]);

    this.continueBtn = new Button(scene, 0, 0, 'button-right');
    const continueBtnCoordinates = [
      this.bgImage.width / 2 - this.continueBtn.width,
      this.bgImage.height / 2 - this.continueBtn.width / 4,
    ];
    this.continueBtn.setPosition(continueBtnCoordinates[0], continueBtnCoordinates[1]);

    this.add(this.restartBtn)
    this.add(this.continueBtn)
  }

}
