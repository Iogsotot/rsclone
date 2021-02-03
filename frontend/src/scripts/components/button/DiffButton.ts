import CustomButton from './CustomButton';
import langConfig from '../../layouts/langConfig';
export default class DiffButton extends CustomButton {
  easyBtn: Phaser.GameObjects.Image

  hardBtn: Phaser.GameObjects.Image

  diffBtns: string[][]

  constructor(scene: Phaser.Scene, x: number, y: number) {
    const lang = window['lang'];
    const normal = langConfig[`${lang}`].normal.toUpperCase();

    super(scene, x, y, `${normal}`, 'normal-btn-bg', 'normal-btn-bg');

    this.diffBtns = [
      ['easy', langConfig[`${lang}`].easy],
      ['normal', langConfig[`${lang}`].normal],
      ['hard', langConfig[`${lang}`].hard],
    ];

    this.setInteractive({ useHandCursor: true })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, this.handleClick, this);

    this.scene.input.keyboard.on('keydown-D', (event) => {
      this.handleDown();
      this.handleClick();
    });
    this.scene.input.keyboard.on('keyup-D', (event) => {
      this.handleUp();
    });
  }

  handleClick() {
    const visibleBtnIndex = this.diffBtns.findIndex((el) => el[1].toUpperCase() === this.btnText.text);
    const index = (visibleBtnIndex + 1) % this.diffBtns.length;
    this.btnImage.setTexture(`${this.diffBtns[index][0]}-btn-bg`);
    this.btnDownImage.setTexture(`${this.diffBtns[index][0]}-btn-bg`);
    this.btnText.setText(`${this.diffBtns[index][1].toUpperCase()}`);
  }

  getDifficulty() {
    return this.diffBtns.findIndex((el) => el[1].toUpperCase() === this.btnText.text) + 1;
  }
}
