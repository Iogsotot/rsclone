import Enemy from './Enemy';

export default class LittleOrc extends Enemy {
  constructor(scene: Phaser.Scene, way: Phaser.Curves.Path, x: number, y: number, difficultyCoeff = 1) {
    super(scene, way, x, y, 'littleOrc');
    this.setPosition(x, y);

    // moveSpeed - За какое время будет пройден way
    this.moveSpeed = 25000;
    this.hp = 25 * difficultyCoeff;
    this.maxHp = this.hp;
    this.physicalArmor = 5 * difficultyCoeff;
    this.killReward = 5;
    this.setScale(0.25);
  }
}
