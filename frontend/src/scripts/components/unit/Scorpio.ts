import Enemy from './Enemy';

export default class Scorpio extends Enemy {

  constructor(scene: Phaser.Scene, way: Phaser.Curves.Path, x: number, y: number) {
    super(scene, way, x, y, 'scorpio');
    this.setPosition(x, y);

    // moveSpeed - За какое время будет пройден way
    this.moveSpeed = 20000;
    this.hp = 200;
    this.physicalArmor = 50;
    this.killReward = 15;
  }
}