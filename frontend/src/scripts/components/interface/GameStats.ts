import langConfig from "../../layouts/langConfig";

export default class GameStats extends Phaser.GameObjects.Container {
  livesInfo: Phaser.GameObjects.Text

  goldsInfo: Phaser.GameObjects.Text

  wavesInfo: Phaser.GameObjects.Text

  wavesCount: number;

  constructor(scene: Phaser.Scene) {
    super(scene);
    scene.add.existing(this);

    this.setSize(+scene.sys.game.config.width / 6, 120);
    this.setPosition(20, 20);

    this.depth = 1000;

    this.drawContainers();
    this.generate();

    scene.tweens.add({
      targets: this,
      y: { start: this.y - this.height, to: this.y },
      ease: 'Cubic.Out',
      repeat: 0,
      duration: 1000,
    });
  }

  drawContainers() {
    const borderColor = 0x593517;
    const bgColor = 0x42250f;

    const livesContainer = this.scene.add.graphics();
    livesContainer.fillStyle(bgColor);
    livesContainer.fillRoundedRect(0, 0, this.width*0.35, 50, 10);
    livesContainer.lineStyle(10, borderColor);
    livesContainer.strokeRoundedRect(0, 0, this.width*0.35, 50, 10);
    livesContainer.setAlpha(0.8);
    const heart = this.scene.add.image(0, 0, 'heart-icon').setScale(1.2).setOrigin(0.3, 0.1);

    const goldsContainer = this.scene.add.graphics();
    goldsContainer.fillStyle(bgColor);
    goldsContainer.fillRoundedRect(this.width*0.42, 0, this.width*0.58, 50, 10);
    goldsContainer.lineStyle(10, borderColor);
    goldsContainer.strokeRoundedRect(this.width*0.42, 0, this.width*0.58, 50, 10);
    goldsContainer.setAlpha(0.8);
    const coins = this.scene.add.image(this.width*0.42, 0, 'coins-icon').setScale(1.2).setOrigin(0.3, 0.1);

    const wavesContainer = this.scene.add.graphics();
    wavesContainer.fillStyle(bgColor);
    wavesContainer.fillRoundedRect(0, 70, this.width, 50, 10);
    wavesContainer.lineStyle(10, borderColor);
    wavesContainer.strokeRoundedRect(0, 70, this.width, 50, 10);
    wavesContainer.setAlpha(0.8);
    const skull = this.scene.add.image(0, 70, 'wave-icon').setScale(1.2).setOrigin(0.3, 0.1);

    this.add(livesContainer);
    this.add(goldsContainer);
    this.add(wavesContainer);
    this.add(heart);
    this.add(coins);
    this.add(skull);
  }

  generate() {
    const styles = { fontFamily: 'Dimbo', fontSize: '40px' };
    this.livesInfo = this.scene.add.text(this.width*0.2, 25, '', styles).setOrigin(0.5);
    this.goldsInfo = this.scene.add.text(this.width*0.75, 25, '', styles).setOrigin(0.5);
    this.wavesInfo = this.scene.add.text(this.width*0.5, 95, '', styles).setOrigin(0.5);

    this.add(this.livesInfo);
    this.add(this.goldsInfo);
    this.add(this.wavesInfo);
  }

  updateLives(playerLives: number) {
    this.livesInfo.setText(playerLives.toString());
  }

  updateGolds(golds: number) {
    this.goldsInfo.setText(golds.toString());
  }

  updateWaves(currentWave: number, maxWaves?: number) {
    if (maxWaves) this.wavesCount = maxWaves;
    const waveText = langConfig[`${window['lang']}`].wave.toUpperCase();
    this.wavesInfo.setText(`${waveText} ${currentWave}/${this.wavesCount}`);
  }
}