import Enemy from './Enemy';

export default class Scorpio extends Enemy {
  alive: boolean;

  constructor(scene: Phaser.Scene, way: Phaser.Curves.Path, x: number, y: number) {
    super(scene, way, x, y, 'scorpio', 'enemy');
    // this.setTexture('scorpio');
    this.setPosition(x, y);

    this.alive = true;
  }

  // preUpdate(time, delta) {
  //   super.preUpdate(time, delta);
  // }
  
}