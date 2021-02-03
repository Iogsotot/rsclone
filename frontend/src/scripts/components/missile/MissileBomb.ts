import Missile from './Missile';

export default class MissileBomb extends Missile {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'missile-bomb');
  }
}
