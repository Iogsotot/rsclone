import CustomModal from './CustomModal';
import Button from '../button/Button';
import AudioSlider from '../interface/AudioSlider';

export default class PauseModal extends CustomModal {
  menuBtn: Button;

  restartBtn: Button;

  resumeBtn: Button;

  options: Phaser.GameObjects.Container;

  constructor(scene: Phaser.Scene) {
    super(scene, 'settings-modal-bg', 'settings-header');

    this.initializeButtons(scene);
    this.initOptionsContainer(scene);
  }

  initializeButtons(scene: Phaser.Scene) {
    const menuBtnCoordinates = [
      -this.bgImage.width / 3,
      this.bgImage.height / 2,
    ];
    this.menuBtn = new Button(scene, menuBtnCoordinates[0], menuBtnCoordinates[1], 'button-menu');

    const restartBtnCoordinates = [
      0,
      this.bgImage.height / 2,
    ];
    this.restartBtn = new Button(
      scene,
      restartBtnCoordinates[0],
      restartBtnCoordinates[1],
      'button-restart'
    );

    const resumeBtnCoordinates = [
      this.bgImage.width / 3,
      this.bgImage.height / 2,
    ];
    this.resumeBtn = new Button(
      scene,
      resumeBtnCoordinates[0],
      resumeBtnCoordinates[1],
      'button-right'
    );

    this.add(this.restartBtn)
    this.add(this.resumeBtn)
    this.add(this.menuBtn)
  }

  initOptionsContainer(scene: Phaser.Scene) {
    this.options = new Phaser.GameObjects.Container(
      scene,
      0,
      0
    );

    const bgImage = scene.add.image(0, 0, 'audio-set-bg');
    this.options.add(bgImage);
    this.options.setSize(bgImage.width, bgImage.height);

    const musicSlider = new AudioSlider(
      scene,
      -bgImage.width / 3,
      -bgImage.height / 3,
      'music-text'
    );

    const soundSlider = new AudioSlider(
      scene,
      -bgImage.width / 3,
      bgImage.height / 9,
      'sound-text'
    );

    this.options.add(musicSlider);
    this.options.add(soundSlider);
    this.add(this.options);
  }
}
