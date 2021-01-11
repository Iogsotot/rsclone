// import 'phaser';
import Unit from './Unit';

export default class Enemy extends Unit {
  enemyType: string;
  position: {x: number, y: number};
  size: number;
  speed: number;
  hp: number;
  damage: number;
  physicalArmor: number;
  magicArmor: number;
  killReward: number;
  sprite: string;

  constructor(scene: Phaser.Scene, way: Phaser.Curves.Path, x: number, y: number, texture: string, type: string) {
    super(scene, way, x, y, texture, type);
    // this.enemyType = enemyType;

    this.init();
  }

  init() {
    // задел на Advance Scope:
    // if (this.enemyType === 'anyEnemyType') {
    // }
    // this.position = { x: 0, y: 0 };
    // this.size = 20;
    this.speed = 2;
    this.hp = 100;
    this.damage = 20;
    this.physicalArmor = 10;
    this.magicArmor = 5;
    this.killReward = 5;
    // this.sprite = '../../assets/sprites/1_enemies_1_walk_000.png';
  }
}
