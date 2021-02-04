import Enemy from './Enemy';

export default class WizardBlack extends Enemy {
  constructor(scene: Phaser.Scene, way: Phaser.Curves.Path, x: number, y: number, difficultyCoeff = 1) {
    super(scene, way, x, y, 'wizardBlack');
    this.setPosition(x, y);

    // moveSpeed - За какое время будет пройден way
    this.moveSpeed = 50000;
    this.hp = 65 * difficultyCoeff;
    this.maxHp = this.hp;
    this.magicArmor = 20 * difficultyCoeff;
    this.killReward = 10;
    this.setScale(0.3);
  }
}
