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
  // position: {x: number, y: number};
  // size: number;
  killReward: number;
  alive: boolean;
  unitType: string;

  constructor(scene: Phaser.Scene, way: Phaser.Curves.Path, x: number, y: number, unitType: string) {
    super(scene, way, x, y, unitType);
    scene.add.existing(this);

    this.unitType = unitType;
    this.alive = true;
    this.hp = 100;
    this.physicalArmor = 10;
    this.magicArmor = 5;
    this.damage = 20;
    this.damageSpeed = 5;
    this.moveSpeed = 10000;
    this.killReward = 5;
    
    // this.create(texture);
    // console.log(this);
    this.play({ key: `${unitType}_walk`, repeat:  Infinity});
    this.setInteractive();
    this.on("pointerdown", this.takeDamage, this)
    // hitArea
    // texture
  }

  create() {
    console.log(`${this.unitType}_walk`);
  }

  takeDamage(damage) {
    this.hp -= damage;                
    if(this.hp <= 0) {
        this.setActive(false);
        this.setVisible(false);      
    }

    // if(this.hp - damage <= damage) {
    //   this.hp = 0;
    //   this.die();
    // } else if(this.hp >= damage) {
    //   this.hp -= damage;
    //   this.play({ key: `${this.unitType}_hurt`, repeat: 0});
    //   this.on('animationcomplete', () => {this.play({ key: `${this.unitType}_walk`, repeat:  Infinity})}, this)
    // }
    // console.log(this.hp)
  }

  die() {
    if (this.alive) {
      this.alive = false;
      this.pauseFollow();
      //может как-нибудь запретить другие анимации при die() ?
      this.play({ key: `${this.unitType}_die`, repeat: 0});
      this.on('animationcomplete', this.despawn, this)
    }
  }

  despawn() {
    this.scene.time.delayedCall(5000, this.destroy, [], this)
  }
}