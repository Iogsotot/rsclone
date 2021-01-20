export default class Modal extends Phaser.GameObjects.Container {
  bgImage: Phaser.GameObjects.Image;

  header: Phaser.GameObjects.Image;

  sceneCenter: number[];

  constructor(scene: Phaser.Scene, bgTexture: string, headerTexture: string) {
    super(scene, 0, 0);
    scene.add.existing(this);

    this.sceneCenter = [scene.cameras.main.centerX, scene.cameras.main.centerY];

    this.bgImage = scene.add.image(this.sceneCenter[0], this.sceneCenter[1], bgTexture);

    this.header = scene.add.image(0, 0, headerTexture);

    this.init();
  }

  init() {
    const headerCoordinates = [
      this.sceneCenter[0],
      this.sceneCenter[1] - this.bgImage.height / 2 + (2 * this.header.height) / 5,
    ];
    this.header.setPosition(headerCoordinates[0], headerCoordinates[1]);
    
    this.add(this.bgImage);
    this.add(this.header);

    this.setSize(this.bgImage.width, this.bgImage.height);
  }
}
