import Modal from './Modal';
import Button from '../button/Button';

export default class CustomModal extends Modal {
  closeModalBtn: Button;

  ropeLeft: Phaser.GameObjects.Image;

  ropeRight: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, bgTexture: string, title: string) {
    super(scene, bgTexture, title);

    this.addRopes(scene);
    this.initializeCloseBtn(scene);

    this.add(this.ropeLeft);
    this.add(this.ropeRight);
  }

  initializeCloseBtn(scene: Phaser.Scene) {
    this.closeModalBtn = new Button(scene, 0, 0, 'modal-close-btn');
    const closeBtnCoordinates = [
      this.bgImage.width / 2 - this.closeModalBtn.btnImage.width / 4,
      -this.bgImage.height / 2 + this.closeModalBtn.btnImage.height / 4,
    ];
    this.closeModalBtn.setPosition(closeBtnCoordinates[0], closeBtnCoordinates[1]);
    this.add(this.closeModalBtn);
  }

  addRopes(scene: Phaser.Scene) {
    const ropeLeftCoordinates = [
      -this.bgImage.width / 3,
      -(3 * this.bgImage.height) / 8,
    ];
    this.ropeLeft = scene.add
      .image(ropeLeftCoordinates[0], ropeLeftCoordinates[1], 'rope-big')
      .setOrigin(0, 1);

    const ropeRightX = this.bgImage.width / 3 - this.ropeLeft.width;
    this.ropeRight = scene.add
      .image(ropeRightX, ropeLeftCoordinates[1], 'rope-big')
      .setOrigin(0, 1);
  }

  slideIn() {
    this.scene.tweens.add({
      targets: this,
      y: { start: -this.scene.cameras.main.centerY, to: +this.scene.cameras.main.centerY },
      ease: 'Cubic.Out',
      repeat: 0,
      duration: 500,
    });
  }

  slideOut() {
    this.scene.tweens.add({
      targets: this,
      y: { start: this.scene.cameras.main.centerY, to: -this.scene.cameras.main.centerY },
      ease: 'Expo.Out',
      repeat: 0,
      duration: 500,
    });
  }
}
