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
    downTexture: string
  ) {
    super(scene, x, y, upTexture);
    scene.add.existing(this);

    this.btnDownImage = scene.add.image(0, 0, downTexture);
    this.btnText = scene.add.text(0, 0, text, { fontSize: '30px' }).setOrigin(0.5, 0.6);
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
    this.btnDownImage.setVisible(true);
    this.btnImage.setVisible(false);
  }
  handleOut() {
    this.btnDownImage.setVisible(false);
    this.btnImage.setVisible(true);
  }
  handleDown() {
    this.handleOver();
  }
  handleUp() {
    this.handleOut();
  }
}
