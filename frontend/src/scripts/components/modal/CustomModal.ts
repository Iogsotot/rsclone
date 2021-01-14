import Modal from './Modal';
import CustomButton from '../button/CustomButton';

export default class CustomModal extends Modal {
  quitBtn: CustomButton;

  startNewBtn: CustomButton;

  sceneSize: number[];

  constructor(scene: Phaser.Scene, titleText:string, bgTexture: string, titleTexture: string) {
    super(scene, titleText, bgTexture, titleTexture);

    this.sceneSize = [scene.cameras.main.centerX, scene.cameras.main.centerY];

    this.initializeButtons(scene);
  }

  initializeButtons(scene: Phaser.Scene) {
    const startNewBtnCoordinates = [
      this.sceneSize[0] - this.bgImage.width / 4,
      this.sceneSize[1] + this.bgImage.height / 2,
    ];
    const quitBtnCoordinates = [
      this.sceneSize[0] + this.bgImage.width / 4,
      this.sceneSize[1] + this.bgImage.height / 2,
    ];

    this.startNewBtn = new CustomButton(
      scene,
      startNewBtnCoordinates[0],
      startNewBtnCoordinates[1],
      'Start New',
      'btn',
      'btn-pressed'
    );

    this.quitBtn = new CustomButton(
      scene,
      quitBtnCoordinates[0],
      quitBtnCoordinates[1],
      'Quit',
      'btn',
      'btn-pressed'
    );
  }
}
