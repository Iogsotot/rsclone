import Enemy from './Enemy';

export default class Scorpio extends Enemy {
  alive: boolean;

  constructor(scene: Phaser.Scene, way: Phaser.Curves.Path, x: number, y: number) {
    super(scene, way, x, y, 'mummy', 'enemy');
    this.setPosition(x, y);

    this.alive = true;
  }
  
}