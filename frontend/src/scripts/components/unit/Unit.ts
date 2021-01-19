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

// Этот метод вообще не нужен, как я понимаю. У меня все проверка происходит в tower.
//   onEnemyClicked(damage) {
//     if(this.alive === false) {
//       return false;
//     }
//     else if(this.alive === true) {
//       this.takeDamage(damage);
//     } 
//   }

  takeDamage(damage) {
    if(this.hp - damage < damage) {
      this.hp = 0;
      this.die();
    } else if(this.hp >= damage) {
      this.hp -= damage; 
      this.play({ key: `${this.unitType}_hurt`, repeat: 0})
      this.chain([{key: `${this.unitType}_walk`, repeat: Infinity}]);
      
    }
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
    this.scene.time.delayedCall(5000, this.destroy, [], this)
  }


  // этот метод нужен чтобы утаскивать состояние enemy в tower. 
  getAlive() {
      return this.alive
  }
}