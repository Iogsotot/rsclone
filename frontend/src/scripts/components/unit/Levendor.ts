import Enemy from './Enemy';

export default class Levendor extends Enemy {
  constructor(scene: Phaser.Scene, way: Phaser.Curves.Path, x: number, y: number, difficultyCoeff = 1) {
    super(scene, way, x, y, 'levendor');
    this.setPosition(x, y);

    // moveSpeed - За какое время будет пройден way
    this.moveSpeed = 55000;
    this.hp = 150 * difficultyCoeff;
    this.maxHp = this.hp;
    this.physicalArmor = 15 * difficultyCoeff;
    this.magicArmor = 20 * difficultyCoeff;
    this.killReward = 25;
    this.setScale(0.5);
  }
}
