export default class Button extends Phaser.GameObjects.Container {
  btnImage: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, x: number, y: number, btnTexture: string) {
    super(scene, x, y);
    scene.add.existing(this);

    this.btnImage = scene.add.image(0, 0, btnTexture).setScale(0.8);

    this.add(this.btnImage);

    this.setSize(this.btnImage.width, this.btnImage.height);
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
    this.setScale(1.15).setAlpha(1);
  }

  handleOut() {
    this.setScale(1);
  }

  handleDown() {
    // this.handleOver()
  }

  handleUp() {
    this.handleOut();
  }
}
