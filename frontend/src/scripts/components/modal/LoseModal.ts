import CustomModal from './CustomModal';
import CustomButton from '../button/CustomButton';

export default class LoseModal extends CustomModal {
  continueBtn: CustomButton;

  starsImage: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, bgTexture: string, titleTexture: string) {
    super(scene, 'Lose', bgTexture, titleTexture);

    this.starsImage = scene.add.image(
      this.sceneCenter[0],
      this.sceneCenter[1] - this.bgImage.width / 10,
      'lose-img'
    );
    this.add(this.starsImage);

    this.continueButton(scene);
  }

  continueButton(scene: Phaser.Scene) {
    const continueBtnCoordinates = [
      this.sceneCenter[0],
      this.sceneCenter[1] + this.bgImage.height / 4,
    ];

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
