import CustomModal from './CustomModal';

export default class StartScreenModal extends CustomModal {
  mapImage: Phaser.GameObjects.Image;
  towersNumberText: Phaser.GameObjects.Text;
  level: number;

  constructor(scene: Phaser.Scene, towersNumber: number, bgTexture: string, titleTexture: string, level: number) {
    super(scene, `Level ${level}`, bgTexture, titleTexture);

    this.sceneCenter = [scene.cameras.main.centerX, scene.cameras.main.centerY];

    this.startNewBtn.btnText.setText('Start Game');

    this.mapImage = scene.add
      .image(
        this.sceneCenter[0] - this.bgImage.width / 4,
        this.sceneCenter[1] - this.bgImage.width / 10,
        `map_${level}`
      )
      .setScale(0.25);

    this.towersNumberText = scene.add.text(
      this.sceneCenter[0] - this.bgImage.width / 10,
      this.sceneCenter[1] - this.bgImage.width / 10,
      `Possible towers number: ${towersNumber}`,
      { fontSize: '30px', fontFamily: 'Dimbo' }
    );

    this.add(this.mapImage);
    this.add(this.towersNumberText);
  }
}
