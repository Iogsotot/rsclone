import Button from '../button/Button';

interface BarConfigs {
  border: number;
  containerCoordinates: number[];
  barCoordinates: number[];
  barSizes: number[];
  borderRadius: number;
  maxValue: number;
}

export default class AudioSlider extends Phaser.GameObjects.Container {
  title: Phaser.GameObjects.Text;

  checkbox: Phaser.GameObjects.Image;

  increase: Button;

  decrease: Button;

  barContainer: Phaser.GameObjects.Image;

  progressBar: Phaser.GameObjects.Graphics;

  audioValue: number;

  barConfigs: BarConfigs;

  constructor(scene: Phaser.Scene, x: number, y: number, titleTexture: string) {
    super(scene, x, y);

    // this.title = scene.add.image(0, 0, titleTexture);
    const styles = {
      fontFamily: 'Dimbo',
      fontSize: '80px',
      color: '#dbc899'
    }
    this.title = scene.add.text(0, 0, titleTexture, styles).setOrigin(0.4, 0.5)
    this.add(this.title);

    this.audioValue = 0;

    this.initCheckbox(scene);
    this.initProgressBar(scene);

    this.increase.setInteractive().on('pointerup', () =>  this.drawProgressBar(1));
    this.decrease.setInteractive().on('pointerup', () => this.drawProgressBar(-1));
  }

  initCheckbox(scene: Phaser.Scene) {
    this.checkbox = scene.add.image(0, 0, 'on').setOrigin(0.5);
    this.checkbox.setX(this.title.width+this.checkbox.width/4);
    this.add(this.checkbox);
    this.checkbox
      .setInteractive({ useHandCursor: true })
      .on('pointerup', this.handleCheckboxClick, this);
  }

  handleCheckboxClick() {
    if (this.checkbox.texture.key === 'on') this.checkbox.setTexture('off');
    else this.checkbox.setTexture('on');
  }

  initProgressBar(scene: Phaser.Scene) {
    this.decrease = new Button(scene, -this.title.width / 4, this.title.height, 'minus');

    this.barContainer = scene.add.image(0, this.title.height, 'slider-bar-bg');

    this.barContainer.setX(this.barContainer.width / 2);

    this.progressBar = scene.add.graphics();
    this.initBarConfigs();
    this.drawProgressBar(0);

    this.increase = new Button(
      scene,
      -this.title.width / 4 + this.barContainer.width + this.decrease.width,
      this.title.height,
      'plus'
    );

    this.add(this.decrease);
    this.add(this.increase);
    this.add(this.barContainer);
    this.add(this.progressBar);
  }

  initBarConfigs() {
    const border = 10;
    const containerCoordinates = [
      this.barContainer.x - this.barContainer.width / 2 + border,
      this.barContainer.y - this.barContainer.height / 2 + border,
    ];
    const barCoordinates = [
      containerCoordinates[0],
      containerCoordinates[1] + (this.barContainer.height - 2 * border) / 2,
    ];
    const barSizes = [this.barContainer.width - 2 * border, this.barContainer.height - 2 * border];
    const borderRadius = this.barContainer.height / 4;

    this.barConfigs = {
      border,
      containerCoordinates,
      barCoordinates,
      barSizes,
      borderRadius,
      maxValue: barSizes[0],
    };
    this.barConfigs.barSizes[0] -= 50;
  }

  drawProgressBar(change: -1 | 0 | 1) {
    if (this.barConfigs.barSizes[0] === 20 && change === -1) return;
    else if (this.barConfigs.barSizes[0] === this.barConfigs.maxValue && change === 1) return;

    this.barConfigs.barSizes[0] += 50 * change;

    if (this.barConfigs.barSizes[0] < 20) {
      this.barConfigs.barSizes[0] = 20;
    } else if (this.barConfigs.barSizes[0] > this.barConfigs.maxValue) {
      this.barConfigs.barSizes[0] = this.barConfigs.maxValue;
    }

    this.progressBar.clear();
    // bar
    let color = this.barConfigs.barSizes[0] > this.barConfigs.maxValue * 0.8 ? 0xe65540 : 0xf4d133;
    this.progressBar.fillStyle(color, 1);
    this.progressBar.fillRoundedRect(
      this.barConfigs.containerCoordinates[0],
      this.barConfigs.containerCoordinates[1],
      this.barConfigs.barSizes[0],
      this.barConfigs.barSizes[1],
      this.barConfigs.borderRadius
    );
    // shadow
    color = this.barConfigs.barSizes[0] > this.barConfigs.maxValue * 0.8 ? 0xc63f31 : 0xde9b26;
    this.progressBar.fillStyle(color, 1);
    this.progressBar.fillRoundedRect(
      this.barConfigs.barCoordinates[0],
      this.barConfigs.barCoordinates[1],
      this.barConfigs.barSizes[0],
      this.barConfigs.barSizes[1] / 2,
      {
        tl: 0,
        tr: 0,
        bl: this.barConfigs.borderRadius,
        br: this.barConfigs.borderRadius,
      }
    );

    // yellow
    // 0xf4d133 0xde9b26
    // red
    // 0xe65540 0xc63f31
  }
}
