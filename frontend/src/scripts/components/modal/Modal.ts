export default class Modal extends Phaser.GameObjects.Container {
  bgImage: Phaser.GameObjects.Image;

  header: Phaser.GameObjects.Container;

  headerBg: Phaser.GameObjects.Image;

  headerText: Phaser.GameObjects.Text

  constructor(scene: Phaser.Scene, bgTexture: string, title: string) {
    super(scene, scene.cameras.main.centerX, scene.cameras.main.centerY);
    scene.add.existing(this);

    this.bgImage = scene.add.image(0,0, bgTexture);

    this.header = scene.add.container();
    this.headerBg = scene.add.image(0, 0, 'header-bg').setOrigin(0.5);
    const styles = {
      fontFamily: 'Dimbo',
      fontSize: '60px',
    };
    this.headerText = scene.add.text(0, 0, title, styles).setOrigin(0.5, 0.65);
    this.headerText.setShadow(3, 3, '#000');
    this.headerText.setTint(0xFAE90F, 0xFAE90F, 0xF7BB1F, 0xF7BB1F);

    this.init();
  }

  init() {
    const headerCoordinates = [
      0,
      -this.bgImage.height / 2 + (2 * this.headerBg.height) / 5,
    ];
    this.header.setPosition(headerCoordinates[0], headerCoordinates[1]);
    this.header.add(this.headerBg);
    this.header.add(this.headerText);

    this.add(this.bgImage);
    this.add(this.header);

    this.setSize(this.bgImage.width, this.bgImage.height);
  }
}
