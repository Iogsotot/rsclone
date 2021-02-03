// import 'phaser';
import Unit from './Unit';

export default class Enemy extends Unit {
  enemyType: string;

  position: {x: number, y: number};

  size: number;

  hp: number;

  damage: number;

  physicalArmor: number;

  magicArmor: number;

  killReward: number;

  sprite: string;

  constructor(scene: Phaser.Scene, way: Phaser.Curves.Path, x: number, y: number, unitType: string) {
    super(scene, way, x, y, unitType);
    this.init();
  }

  init() {
    this.hp = 100;
    this.maxHp = this.hp;
    this.damage = 20;
    this.physicalArmor = 0;
    this.magicArmor = 0;
    this.killReward = 5;
  }
}
