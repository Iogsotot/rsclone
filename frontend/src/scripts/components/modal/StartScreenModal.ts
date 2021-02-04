import CustomModal from './CustomModal';
import Button from '../button/Button';
import DiffButton from '../button/DiffButton';
import langConfig from '../../layouts/langConfig';

export default class StartScreenModal extends CustomModal {
  mapImage: Phaser.GameObjects.Image;

  levelText: Phaser.GameObjects.Container;

  towersNumberText: Phaser.GameObjects.Text;

  level: number;

  difficultyBtn: DiffButton

  difficultyImage: Phaser.GameObjects.Image;

  startBtn: Button

  constructor(
    scene: Phaser.Scene,
    towersNumber: number,
    level: number,
  ) {
    const lang = window['lang'];
    const levelText = langConfig[`${lang}`].level.toUpperCase();
    super(scene, 'start-modal-bg', `${levelText} ${level}`);

    this.drawMapImage(scene, level);
    this.addText(scene, level);
    this.gameDifficulty(scene, 'easy');
    this.addStartButton(scene);

    const possibleTowers = langConfig[`${lang}`].towersNumber;
    this.towersNumberText = scene.add.text(
      this.bgImage.width / 5,
      this.bgImage.width / 5,
      `${possibleTowers}: ${towersNumber}`,
      { fontSize: '40px', fontFamily: 'Dimbo', color: '#c0c0c0' },
    ).setOrigin(0.5);

    this.add(this.mapImage);
    this.add(this.levelText);
    this.add(this.towersNumberText);
  }

  drawMapImage(scene: Phaser.Scene, level: number) {
    const mapScale = 0.33;
    const mapImageCoordinates = [
      -this.bgImage.width / 4,
      -this.bgImage.width / 15,
    ];
    this.mapImage = scene.add
      .image(mapImageCoordinates[0], mapImageCoordinates[1], `map_${level}`)
      .setScale(mapScale);

    const graphics = scene.add.graphics();
    graphics.lineStyle(4, 0x000000, 1);
    graphics.strokeRect(
      mapImageCoordinates[0] - (this.mapImage.width / 2) * mapScale,
      mapImageCoordinates[1] - (this.mapImage.height / 2) * mapScale,
      this.mapImage.width * mapScale,
      this.mapImage.height * mapScale,
    );
    graphics.lineStyle(10, 0xc0c0c0, 1);
    graphics.strokeRoundedRect(
      mapImageCoordinates[0] - (this.mapImage.width / 2) * mapScale - 7,
      mapImageCoordinates[1] - (this.mapImage.height / 2) * mapScale - 7,
      this.mapImage.width * mapScale + 14,
      this.mapImage.height * mapScale + 14,
      10,
    );
    this.add(graphics);
  }

  addText(scene: Phaser.Scene, level: number) {
    const lang = window['lang'];
    const levelText = langConfig[`${lang}`].levelTheme[`${level}`];

    const levelTextCoordinates = [
      -30,
      -this.bgImage.width / 2 + this.mapImage.displayHeight+15,
    ];
    this.levelText = new Phaser.GameObjects.Container(
      scene,
      levelTextCoordinates[0],
      levelTextCoordinates[1],
    );
    this.levelText.setSize(this.bgImage.width / 2, this.bgImage.height / 2);
    const levelInfo = scene.add
      .text(0, 0, levelText, {
        fontFamily: 'Dimbo',
        fontSize: '32px',
        align: 'justify',
        wordWrap: { width: this.levelText.width },
      })
      .setOrigin(0, 0);

    this.levelText.add(levelInfo);
  }

  gameDifficulty(scene: Phaser.Scene, difficulty: string) {
    const difficultyImageCoordinates = [
      -this.bgImage.width / 4,
      this.bgImage.width / 4,
    ];
    this.difficultyBtn = new DiffButton(scene, difficultyImageCoordinates[0], difficultyImageCoordinates[1]);
    this.add(this.difficultyBtn);
  }

  addStartButton(scene: Phaser.Scene) {
    this.startBtn = new Button(scene, 0, 0, 'button-start');
    const startBtnCoordinates = [
      this.bgImage.width / 2 - this.startBtn.btnImage.width,
      this.bgImage.height / 2 - this.startBtn.btnImage.height / 5,
    ];
    this.startBtn.setPosition(startBtnCoordinates[0], startBtnCoordinates[1]);
    this.add(this.startBtn);
  }
}
