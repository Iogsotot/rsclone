export default class Popup extends Phaser.GameObjects.Container {
  achievementIcon: Phaser.GameObjects.Sprite;
  popupHeight: number;

  constructor(scene: Phaser.Scene, x: number, y: number, achievementTexture: string) {
    super(scene, x, y);
    scene.add.existing(this);
    this.x = scene.cameras.main.centerX / 2;
    this.popupHeight = 250;
    this.y = this.popupHeight / 2;
    this.achievementIcon = scene.add.sprite(this.x, -this.popupHeight, achievementTexture);
    this.add(this.achievementIcon);
  }

  init(type) {
    let iconTexture = '';
    let text = '';
    const styles = {
      fontFamily: 'Dimbo',
      fontSize: '80px',
      color: '#dbc899'
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
        text = 'Hurray!';
        iconTexture = 'icon-first_asterisk';
    }
    const icon = this.scene.add.sprite(this.x, -this.popupHeight, iconTexture).setOrigin(1.4, 0.5);
    const title = this.scene.add.text(this.x, -this.popupHeight, text, styles).setOrigin(0.4, 0.5);
    this.add([icon, title]);
  }

  startAnimation() {
    this.setSize(this.achievementIcon.width, this.achievementIcon.height);
    this.slideIn();

    setTimeout(() => {
      console.log('I am fly away')
      this.slideOut();
    }, 3500);
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