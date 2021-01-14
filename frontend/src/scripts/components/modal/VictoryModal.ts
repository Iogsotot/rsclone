import CustomModal from './CustomModal';

export default class VictoryModal extends CustomModal {
  starsImage: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, starsNumber: 1 | 2 | 3, bgTexture: string, titleTexture: string) {
    super(scene, 'Victory', bgTexture, titleTexture);

    this.sceneSize = [scene.cameras.main.centerX, scene.cameras.main.centerY];

    this.starsImage = scene.add.image(
      this.sceneSize[0],
      this.sceneSize[1] - this.bgImage.width / 10,
      `star-${starsNumber}`
    );
    this.add(this.starsImage);
  }

}
