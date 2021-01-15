import Enemy from './Enemy';

export default class LittleOrc extends Enemy {

  constructor(scene: Phaser.Scene, way: Phaser.Curves.Path, x: number, y: number) {
    super(scene, way, x, y, 'littleOrc');
    this.setPosition(x, y);

    // moveSpeed - За какое время будет пройден way
    this.moveSpeed = 85000;
    this.hp = 50;
    this.physicalArmor = 5;
    this.killReward = 5;
  }
}