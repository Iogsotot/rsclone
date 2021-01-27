import Enemy from './Enemy';

export default class WizardBlack extends Enemy {

  constructor(scene: Phaser.Scene, way: Phaser.Curves.Path, x: number, y: number, difficultyCoeff: number = 1) {
    super(scene, way, x, y, 'wizardBlack');
    this.setPosition(x, y);

    // moveSpeed - За какое время будет пройден way
    this.moveSpeed = 55000;
    this.hp = 135 * difficultyCoeff;
    this.maxHp = this.hp
    this.magicArmor = 100 * difficultyCoeff;
    this.killReward = 5;
    this.setScale(0.3);
  }
}