export default class Popup extends Phaser.GameObjects.Container {
  achievementBg: Phaser.GameObjects.Sprite;
  popupHeight: number;

  constructor(scene: Phaser.Scene, x: number, y: number, achievementTexture: string) {
    super(scene, x, y);
    scene.add.existing(this);
    this.x = scene.cameras.main.centerX / 2;
    this.popupHeight = 250;
    this.y = this.popupHeight / 2;
    this.achievementBg = scene.add.sprite(this.x, -this.popupHeight, achievementTexture);
    this.setSize(this.achievementBg.width, this.achievementBg.height);
    this.y = this.height / 2;
    this.achievementBg.setY(-this.height)
    this.add(this.achievementBg);
  }

  init(type) {
    let iconTexture = '';
    let text = '';
    const styles = {
      fontFamily: 'Dimbo',
      fontSize: '60px',
      color: '#d2a252',
    };
    switch (type) {
      case 'builder':
        text = 'Builder';
        iconTexture = 'icon-builder';
        break;
      case 'completeWin':
        text = 'complete win!';
        iconTexture = 'icon-complete_win';
        break;
      case 'firstAsterisk':
        text = 'First asterisk';
        iconTexture = 'icon-first_asterisk';
        break;
      case 'firstBlood':
        text = 'First blood';
        iconTexture = 'icon-first_blood';
        break;
      case 'greatDefender':
        text = 'Great defender!';
        iconTexture = 'icon-great_defender';
        break;
      case 'killer':
        text = 'Killer';
        iconTexture = 'icon-killer';
        break;
      case 'ironDefender':
        text = 'Iron defender';
        iconTexture = 'icon-iron_defender';
        break;
      case 'seller':
        text = 'Seller';
        iconTexture = 'icon-seller';
        break;
      default:
        text = 'Great defender';
        iconTexture = 'icon-first_asterisk';
    }
    const icon = this.scene.add.sprite(this.x, -this.popupHeight, iconTexture).setOrigin(0.5, 0.8).setScale(0.7);
    const title = this.scene.add.text(this.x, -this.popupHeight, text, styles).setOrigin(0.5, -0.4);
    this.add([icon, title]);
  }

  startAnimation() {
    this.scene.sound.play('achievement-unlock');
    this.slideIn();

    setTimeout(() => {
      this.slideOut();
    }, 3000);
  }

  slideIn() {
    this.scene.tweens.add({
      targets: this,
      y: { start: 0, to: this.popupHeight * 1.5 },
      ease: 'Cubic.Out',
      repeat: 0,
      duration: 800,
    });
  }

  slideOut() {
    this.scene.tweens.add({
      targets: this,
      y: { start: this.popupHeight * 1.5, to: 0 },
      ease: 'Cubic.Out',
      repeat: 0,
      duration: 800,
    });
  }
}