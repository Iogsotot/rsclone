export default class Popup extends Phaser.GameObjects.Container {
  achievementIcon: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number, achievementTexture: string) {
    super(scene, x, y);
    scene.add.existing(this);
    this.x = (innerWidth / 2) - 326;
    // this.x = 0;
    console.log(this);
    console.log(this.achievementIcon);
    // завязать на размер
    this.y = -170;
    this.achievementIcon = scene.add.sprite(this.x, -2, achievementTexture).setOrigin(0,0);
    this.add(this.achievementIcon);

    this.setSize(this.achievementIcon.width, this.achievementIcon.height);
    setTimeout(() => {
      console.log('I am here')
      this.slideIn();
    }, 1000);

    setTimeout(() => {
      console.log('I am fly away')
      this.slideOut();
    }, 3500);
  }

  startAnimation() {
    // прописать анимация появления (сверху экрана)
    //chaim анимация нахождения (или ту что выше застопить на 3 с)
    // chain анимацию ухода ачивки
  }


  slideIn() {
    this.scene.tweens.add({
      targets: this,
      y: { start: this.y, to: -2 },
      ease: 'Cubic.Out',
      repeat: 0,
      duration: 800,
    });
  }

  slideOut() {
    this.scene.tweens.add({
      targets: this,
      y: { start: -2, to: this.y - 170 },
      ease: 'Cubic.Out',
      repeat: 0,
      duration: 800,
    });
  }
}