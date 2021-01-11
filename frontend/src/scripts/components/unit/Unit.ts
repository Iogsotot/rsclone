// clacc Unit - базовый класс для всех атакующих персонажей:
// как наших защитников, так и врагов

import 'phaser'

export default class Unit extends Phaser.GameObjects.PathFollower {
  hp: number;
  physicalArmor: number;
  magicArmor: number;
  damage: number;
  damageSpeed: number;
  moveSpeed: number;
  position: {x: number, y: number};
  size: number;
  killReward: number;

  constructor(scene: Phaser.Scene, way: Phaser.Curves.Path, x: number, y: number, texture: string, type: string) {
    super(scene, way, x, y, texture);
    scene.add.existing(this);

    this.hp = 100;
    this.physicalArmor = 10;
    this.magicArmor = 5;
    this.damage = 20;
    this.damageSpeed = 5;
    this.moveSpeed = 2;
    this.position = { x: 0, y: 0 };
    this.size = 20;
    this.killReward = 5;
    this.type = type;

    // hitArea
    // texture
  }
}