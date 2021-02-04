import Modal from './Modal';
import Button from '../button/Button';
import langConfig from '../../layouts/langConfig';

export default class LoseModal extends Modal {
  window: Phaser.GameObjects.Image;

  textMessage: Phaser.GameObjects.Text;

  starsImage: Phaser.GameObjects.Image;

  restartBtn: Button

  cancelBtn: Button

  constructor(scene: Phaser.Scene) {
    const config = langConfig[`${window['lang']}`];
    const failText = config.failed.toUpperCase();
    super(scene, 'table', failText);

    this.header.setY(this.header.y + 15);

    this.window = scene.add.image(0, 30, 'fail-bg').setOrigin(0.5);
    this.add(this.window);
    this.starsImage = scene.add.image(0, 0, 'star-grey');
    this.starsImage.setY(-this.window.y-this.starsImage.height/4);
    this.add(this.starsImage);

    const styles = {
      fontFamily: 'Dimbo',
      fontSize: '60px',
      color: '#dbc899',
      align: 'center',
    };
    this.textMessage = scene.add.text(0, 0, config.sorry, styles).setOrigin(0.5, -0.5);
    this.textMessage.setWordWrapCallback((text: string) => text.split(/\//));
    this.add(this.textMessage);

    this.initializeButtons(scene);
  }

  initializeButtons(scene: Phaser.Scene) {
    this.cancelBtn = new Button(scene, 0, 0, 'button-left');
    const cancelBtnCoordinates = [
      -this.bgImage.width / 2 + this.cancelBtn.width,
      this.bgImage.height / 2 - this.cancelBtn.width / 4,
    ];
    this.cancelBtn.setPosition(cancelBtnCoordinates[0], cancelBtnCoordinates[1]);

    this.restartBtn = new Button(scene, 0, 0, 'button-restart');
    const restartBtnCoordinates = [
      this.bgImage.width / 2 - this.restartBtn.width,
      this.bgImage.height / 2 - this.restartBtn.width / 4,
    ];
    this.restartBtn.setPosition(restartBtnCoordinates[0], restartBtnCoordinates[1]);

    this.add(this.cancelBtn);
    this.add(this.restartBtn);
  }

  disappearance() {
    this.scene.tweens.add({
      targets: this,
      scale: { start: this.scale, to: 0 },
      ease: 'Cubic.Out',
      repeat: 0,
      duration: 1000,
    });
  }
}
