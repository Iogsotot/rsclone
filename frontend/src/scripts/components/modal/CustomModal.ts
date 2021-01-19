import Modal from './Modal';
import Button from '../button/Button';

export default class CustomModal extends Modal {
  closeModalBtn: Button;

  ropeLeft: Phaser.GameObjects.Image;

  ropeRight: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, bgTexture: string, headerTexture: string) {
    super(scene, bgTexture, headerTexture);

    this.addRopes(scene)
    this.initializeCloseBtn(scene);
    
    this.add(this.ropeLeft);
    this.add(this.ropeRight);
  }

  initializeCloseBtn(scene: Phaser.Scene) {
    this.closeModalBtn = new Button(scene, 0, 0, 'modal-close-btn')
    const closeBtnCoordinates = [
      this.sceneCenter[0] + this.bgImage.width / 2 - this.closeModalBtn.btnImage.width / 4,
      this.sceneCenter[1] - this.bgImage.height / 2 + this.closeModalBtn.btnImage.height / 4,
    ]
    this.closeModalBtn.setPosition(closeBtnCoordinates[0], closeBtnCoordinates[1])
  }

  addRopes(scene: Phaser.Scene) {
    const ropeLeftCoordinates = [
      this.sceneCenter[0] - this.bgImage.width / 3,
      this.sceneCenter[1] - (3 * this.bgImage.height) / 8,
    ];
    this.ropeLeft = scene.add
      .image(ropeLeftCoordinates[0], ropeLeftCoordinates[1], 'rope-big')
      .setOrigin(0, 1);

    const ropeRightX = this.sceneCenter[0] + this.bgImage.width / 3 - this.ropeLeft.width;
    this.ropeRight = scene.add
      .image(ropeRightX, ropeLeftCoordinates[1], 'rope-big')
      .setOrigin(0, 1);
  }
}
