import Enemy from './Enemy';

export default class WizardBlack extends Enemy {

  constructor(scene: Phaser.Scene, way: Phaser.Curves.Path, x: number, y: number, difficultyCoeff: number = 1) {
    super(scene, way, x, y, 'wizardBlack');
    this.setPosition(x, y);

    // moveSpeed - За какое время будет пройден way
    this.moveSpeed = 5500;
    this.hp = 135 * difficultyCoeff;
    this.magicArmor = 100 * difficultyCoeff;
    this.killReward = 5;
  }
}