import Enemy from './Enemy';

export default class Mummy extends Enemy {

  constructor(scene: Phaser.Scene, way: Phaser.Curves.Path, x: number, y: number) {
    super(scene, way, x, y, 'mummy');
    this.setPosition(x, y);

    this.moveSpeed = 30000;
  }
  
}