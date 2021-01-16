export default class Modal extends Phaser.GameObjects.Container {
  bgImage: Phaser.GameObjects.Image;

  titleBg: Phaser.GameObjects.Image;

  titleText: Phaser.GameObjects.Text;

  title: Phaser.GameObjects.Container;

  sceneCenter: number[];

  constructor(scene: Phaser.Scene, titleText: string, bgTexture: string, titleTexture: string) {
    super(scene, 0, 0);
    scene.add.existing(this);

    this.sceneCenter = [scene.cameras.main.centerX, scene.cameras.main.centerY];

    this.bgImage = scene.add.image(this.sceneCenter[0], this.sceneCenter[1], bgTexture);

    this.title = new Phaser.GameObjects.Container(scene, scene.cameras.main.centerX, 120);
    this.titleBg = scene.add.image(0, 0, titleTexture);
    this.titleText = scene.add.text(0, 0, titleText, { fontSize: '30px' }).setOrigin(0.5);

    this.init();
  }

  init() {
    this.title.add(this.titleBg);
    this.title.add(this.titleText);
    this.title.setSize(this.titleBg.width, this.titleBg.height);

    this.add(this.bgImage);
    this.add(this.title);

    this.setSize(this.bgImage.width, this.bgImage.height);
  }
}
