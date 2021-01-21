import Enemy from './Enemy';

export default class Scorpio extends Enemy {

  constructor(scene: Phaser.Scene, way: Phaser.Curves.Path, x: number, y: number, difficultyCoeff: number = 1) {
    super(scene, way, x, y, 'scorpio');
    this.setPosition(x, y);
    
    // moveSpeed - За какое время будет пройден way
    this.moveSpeed = 3000;
    this.hp = 200 * difficultyCoeff;
    this.physicalArmor = 50 * difficultyCoeff;
    this.killReward = 15;
  }
}