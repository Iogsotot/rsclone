import Enemy from './Enemy';

export default class Scorpio extends Enemy {
  // alive: boolean;

  constructor(scene: Phaser.Scene, way: Phaser.Curves.Path, x: number, y: number) {
    super(scene, way, x, y, 'scorpio', 'enemy');
    this.setPosition(x, y);

    // this.alive = true;
    // moveSpeed - За какое время будет пройден way
    this.moveSpeed = 20000;
    this.hp = 200;
  }

  // preUpdate(time, delta) {
  //   super.preUpdate(time, delta);
  // }
}