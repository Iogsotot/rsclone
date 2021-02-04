import Tower from '../tower/Tower';
import Unit from '../unit/Unit';
import langConfig from '../../layouts/langConfig';

export default class GameObjStats extends Phaser.GameObjects.Container {
  gameObject: Tower | Unit;

  objNameContainer: Phaser.GameObjects.Graphics;

  objInfoContainer: Phaser.GameObjects.Graphics;

  modalConfigs: any;

  objImg: Phaser.GameObjects.Image;

  nameText: Phaser.GameObjects.Text;

  infoText_1: Phaser.GameObjects.Text;

  infoText_2: Phaser.GameObjects.Text;

  infoText_3: Phaser.GameObjects.Text;

  infoImg_1: Phaser.GameObjects.Image;

  infoImg_2: Phaser.GameObjects.Image;

  infoImg_3: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene) {
    super(scene, scene.cameras.main.centerX, scene.cameras.main.centerY - 80);
    scene.add.existing(this);
    this.objNameContainer = scene.add.graphics();
    this.objInfoContainer = scene.add.graphics();

    this.setSize(+scene.sys.game.config.width / 2, 60);
    this.setPosition(
      scene.cameras.main.centerX - this.width / 2,
      +scene.sys.game.config.height - this.height * 0.7,
    );

    this.drawContainers();
    this.generate();
    this.depth = 1000;
  }

  drawContainers() {
    this.objNameContainer.setPosition(0, -this.height * 0.7);
    const nameContainerWidth = this.width * 0.38;
    const borderColor = 0x593517;
    const bgColor = 0x42250f;
    this.objNameContainer.fillStyle(bgColor);
    this.objNameContainer.fillRoundedRect(0, 0, nameContainerWidth, this.height, 10);
    this.objNameContainer.lineStyle(10, borderColor);
    this.objNameContainer.strokeRoundedRect(0, 0, nameContainerWidth, this.height, 10);
    this.objNameContainer.setAlpha(0.8);

    const circles = this.scene.add.graphics();
    circles.setPosition(0, -this.height * 0.7 + this.height * 0.5);
    circles.fillStyle(0x000000);
    circles.fillCircle(0, 0, this.height * 0.8);
    circles.fillStyle(0xd2cdcc);
    circles.fillCircle(0, 0, this.height * 0.73);
    circles.fillStyle(0x000000);
    circles.fillCircle(0, 0, this.height * 0.62);
    circles.setAlpha(0.9);

    const infoContainerWidth = this.width * 0.58;
    this.objInfoContainer.setPosition(this.width * 0.4, -this.height * 0.7);

    this.objInfoContainer.fillStyle(bgColor);
    this.objInfoContainer.fillRoundedRect(0, 0, infoContainerWidth, this.height, 10);
    this.objInfoContainer.lineStyle(10, borderColor);
    this.objInfoContainer.strokeRoundedRect(0, 0, infoContainerWidth, this.height, 10);
    this.objInfoContainer.setAlpha(0.8);

    this.modalConfigs = {
      nameContainerWidth,
      infoContainerWidth,
      animStart: +this.scene.sys.game.config.height * 1.2,
      animTo: +this.scene.sys.game.config.height - this.height * 0.7,
    };

    this.add(this.objNameContainer);
    this.add(circles);
    this.add(this.objInfoContainer);
  }

  generate() {
    const fontStyles = {
      fontFamily: 'Dimbo',
      fontSize: '40px',
      align: 'center',
    };

    this.objImg = this.scene.add.image(0, 0, '').setOrigin(0.5);
    this.nameText = this.scene.add.text(0, 0, '', fontStyles).setOrigin(0.44, 0.5);

    this.infoImg_1 = this.scene.add.image(0, 0, '').setOrigin(0.5, 0.5);
    this.infoText_1 = this.scene.add.text(0, 0, '', fontStyles).setOrigin(0, 0.5);

    this.infoImg_2 = this.scene.add.image(0, 0, '').setOrigin(0, 0.5);
    this.infoText_2 = this.scene.add.text(0, 0, '', fontStyles).setOrigin(0, 0.5);

    this.infoImg_3 = this.scene.add.image(0, 0, '').setOrigin(0, 0.5);
    this.infoText_3 = this.scene.add.text(0, 0, '', fontStyles).setOrigin(0, 0.5);

    this.add(this.objImg);
    this.add(this.nameText);
    this.add(this.infoImg_1);
    this.add(this.infoText_1);
    this.add(this.infoImg_2);
    this.add(this.infoText_2);
    this.add(this.infoImg_3);
    this.add(this.infoText_3);

    this.slideOut();
  }

  infoConfig(obj: Tower | Unit) {
    const textConfig = langConfig[`${window['lang']}`];
    if (obj instanceof Unit) {
      return {
        avaTexture: obj.unitType,
        name: textConfig.enemy[obj.unitType].toUpperCase(),
        img1: 'heart-icon',
        text1: `${obj.hp}/${obj.maxHp}`,
        img2: 'shoes-icon',
        text2:
          obj.moveSpeed < 30000
            ? textConfig.fast
            : obj.moveSpeed < 45000
              ? textConfig.medium
              : textConfig.slow,
        img3: 'coins-icon',
        text3: `${obj.killReward}`,
      };
    } else if (obj instanceof Tower) {
      if (!obj.isTowerBuilt || !obj.type) return null;
      obj.canSale(this.slideOut, this);
      const missile =        obj.getType() === 'archers' ? 'arrow' : obj.getType() === 'artillery' ? 'bomb' : 'magic';
      return {
        avaTexture: `${missile}-icon`,
        name: `${textConfig.tower[obj.getType()]}`,
        img1: 'damage-icon',
        text1: `${obj.damage}`,
        img2: 'hour-glass-icon',
        text2:
          obj.timeForNextShot > 2400
            ? textConfig.slow
            : obj.timeForNextShot > 1400
              ? textConfig.medium
              : textConfig.fast,
        img3: 'target-icon',
        text3:
          obj.attackArea < 350
            ? textConfig.small
            : obj.attackArea < 400
              ? textConfig.medium
              : textConfig.long,
      };
    }
  }

  updateStats(obj: Tower | Unit) {
    const infoConfig = this.infoConfig(obj);
    if (!infoConfig) return;
    this.gameObject = obj;
    this.slideIn();
    this.objImg.setTexture(infoConfig.avaTexture);
    this.objImg.setPosition(0, -this.height * 0.7 + this.height * 0.5);
    this.objImg.displayHeight = this.height * 1.3;
    this.objImg.scaleX = this.objImg.scaleY;

    const textsY = -this.nameText.height / 4; // because they have identical styles
    this.nameText.setText(infoConfig.name);
    this.nameText.setPosition(this.modalConfigs.nameContainerWidth / 2, textsY);

    this.infoImg_1.setTexture(infoConfig.img1);
    this.infoText_1.setText(infoConfig.text1);
    this.infoImg_1.setPosition(this.objInfoContainer.x + this.infoImg_1.width / 2, textsY);
    this.infoText_1.setPosition(this.infoImg_1.x + this.infoImg_1.width/2, textsY);

    this.infoImg_2.setTexture(infoConfig.img2);
    this.infoText_2.setText(infoConfig.text2);
    const info2_xStart =      this.objInfoContainer.x
      + this.modalConfigs.infoContainerWidth / 2
      - this.infoText_2.width/2;
    this.infoImg_2.setPosition(info2_xStart - this.infoImg_2.width, textsY);
    this.infoText_2.setPosition(info2_xStart, textsY);

    this.infoImg_3.setTexture(infoConfig.img3);
    this.infoText_3.setText(infoConfig.text3);
    const info3_xStart =      this.objInfoContainer.x + this.modalConfigs.infoContainerWidth - this.infoText_3.width-10;
    this.infoImg_3.setPosition(info3_xStart - this.infoImg_3.width, textsY);
    this.infoText_3.setPosition(info3_xStart, textsY);
  }

  slideIn() {
    this.scene.tweens.add({
      targets: this,
      y: { start: this.modalConfigs.animStart, to: this.modalConfigs.animTo },
      ease: 'Cubic.Out',
      repeat: 0,
      duration: 500,
    });
  }

  slideOut() {
    this.scene.tweens.add({
      targets: this,
      y: { start: this.modalConfigs.animTo, to: this.modalConfigs.animStart },
      ease: 'Expo.Out',
      repeat: 0,
      duration: 500,
    });
  }

  updateEnemyHp() {
    if (this.gameObject instanceof Unit) {
      this.infoText_1.setText(`${this.gameObject.hp}/${this.gameObject.maxHp}`);
      if (this.gameObject.hp === 0) this.slideOut();
    }
  }
}
