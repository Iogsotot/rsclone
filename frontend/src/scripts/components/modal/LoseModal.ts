import CustomModal from './CustomModal';
import CustomButton from '../button/CustomButton';

export default class LoseModal extends CustomModal {
  continueBtn: CustomButton;

  starsImage: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, bgTexture: string, titleTexture: string) {
    super(scene, 'Lose', bgTexture, titleTexture);

    this.sceneSize = [scene.cameras.main.centerX, scene.cameras.main.centerY];

    this.starsImage = scene.add.image(
      this.sceneSize[0],
      this.sceneSize[1] - this.bgImage.width / 10,
      'lose-img'
    );
    this.add(this.starsImage);

    this.continueButton(scene);
  }

  continueButton(scene: Phaser.Scene) {
    const continueBtnCoordinates = [this.sceneSize[0], this.sceneSize[1] + this.bgImage.height / 4];

    this.continueBtn = new CustomButton(
      scene,
      continueBtnCoordinates[0],
      continueBtnCoordinates[1],
      'Continue',
      'btn',
      'btn-pressed'
    );
  }
}
