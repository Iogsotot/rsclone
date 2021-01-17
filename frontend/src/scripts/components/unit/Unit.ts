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
  killReward: number;
  alive: boolean;
  unitType: string;

  constructor(scene: Phaser.Scene, way: Phaser.Curves.Path, x: number, y: number, unitType: string, difficultyCoeff: number = 1) {
    super(scene, way, x, y, unitType);
    scene.add.existing(this);

    this.unitType = unitType;
    this.alive = true;
    this.hp = 100 * difficultyCoeff;
    this.physicalArmor = 10 * difficultyCoeff;
    this.magicArmor = 5 * difficultyCoeff;
    this.damage = 20;
    this.damageSpeed = 5;
    this.moveSpeed = 10000;
    this.killReward = 5;
    
    this.play({ key: `${this.unitType}_walk`, repeat:  Infinity});
    this.setInteractive();
    this.on("pointerdown", this.takeDamage, this)
  }

  create() {
    console.log(`${this.unitType}_walk`);
  }

  onEnemyClicked() {
    if(this.alive === false) {
      return false;
    }
    else if(this.alive === true) {
      this.takeDamage();
    } 
  }

  takeDamage() {
    if(this.hp - 15 <= 15) {
      this.hp = 0;
      this.die();
    } else if(this.hp >= 15) {
      this.hp -= 15;

      if (this.anims.getName() === `${this.unitType}_walk`) {
        this.play(`${this.unitType}_hurt`);
        this.chain([{ key: `${this.unitType}_walk`, repeat:  Infinity}]);
      }
    }
    console.log(this.scene.registry.get('stats'));
  }

  die() {
    if (this.alive) {
      this.alive = false;
      this.pauseFollow();
      this.play({ key: `${this.unitType}_die`, repeat: 0});
      this.on('animationcomplete', this.despawn, this)
    }
  }

  despawn() {
    let stats = this.scene.registry.get("stats");
    stats.killedEnemies += 1;
    this.scene.registry.set('stats', stats)
    this.scene.time.delayedCall(5000, this.destroy, [], this)
  }
}