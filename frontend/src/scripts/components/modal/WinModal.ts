import Modal from './Modal';
import Button from '../button/Button';
import langConfig from '../../layouts/langConfig';

export default class WinModal extends Modal {
  window: Phaser.GameObjects.Image;

  textMessage: Phaser.GameObjects.Text;

  continueBtn: Button

  restartBtn: Button

  starsImage: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, starsNumber: 1 | 2 | 3) {
    const config = langConfig[`${window['lang']}`];
    const winText = config.win.toUpperCase();
    super(scene, 'table', winText);

    this.header.setY(this.header.y + 15);

    this.window = scene.add.image(0, 30, 'fail-bg').setOrigin(0.5);
    this.add(this.window);
    this.starsImage = scene.add.image(0, 0, `star-${starsNumber}`);
    this.starsImage.setY(-this.window.y-this.starsImage.height/4);
    this.add(this.starsImage);

    const styles = {
      fontFamily: 'Dimbo',
      fontSize: '60px',
      color: '#dbc899',
      align: 'center'
    };
    this.textMessage = scene.add.text(0, 0, config.congrats, styles).setOrigin(0.5, -0.5);
    this.textMessage.setWordWrapCallback((text: string) => text.split(/\//));
    this.add(this.textMessage);

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

    this.add(this.restartBtn);
    this.add(this.continueBtn);
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
