import Button from './Button';

export default class CustomButton extends Button {
  btnDownImage: Phaser.GameObjects.Image;

  btnText: Phaser.GameObjects.Text;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    upTexture: string,
    downTexture: string,
  ) {
    super(scene, x, y, upTexture);
    scene.add.existing(this);

    this.btnDownImage = scene.add.image(0, 0, downTexture);
    this.btnDownImage.setPosition(0, this.btnImage.height - this.btnDownImage.height);
    const styles = { fontFamily: 'Dimbo', fontSize: '60px' };
    this.btnText = scene.add.text(0, 0, text, styles).setOrigin(0.5);
    this.btnText.setShadow(3, 3, '#000000');
    this.btnText.setTint(0xfafafa, 0xfafafa, 0x8f8f8f, 0x8f8f8f);
    this.btnDownImage.setVisible(false);

    this.add(this.btnDownImage);
    this.add(this.btnText);

    this.init();
  }

  init() {
    this.setInteractive({ useHandCursor: true })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, this.handleUp, this)
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, this.handleOut, this)
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, this.handleDown, this)
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, this.handleOver, this);
  }

  handleOver() {
    this.btnText.setTint(0x8f8f8f, 0x8f8f8f, 0xfafafa, 0xfafafa);
  }

  handleOut() {
    this.btnDownImage.setVisible(false);
    this.btnImage.setVisible(true);
    this.btnText.setTint(0xfafafa, 0xfafafa, 0x8f8f8f, 0x8f8f8f);
  }

  handleDown() {
    this.handleOver();
    this.btnDownImage.setVisible(true);
    this.btnImage.setVisible(false);
  }

  handleUp() {
    this.handleOut();
  }
}
