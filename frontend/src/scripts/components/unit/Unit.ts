// clacc Unit - базовый класс для всех атакующих персонажей:
// как наших защитников, так и врагов

import 'phaser'

export default class Unit extends Phaser.GameObjects.PathFollower {
  hp: number;
  maxHp: number;
  physicalArmor: number;
  magicArmor: number;
  damage: number;
  damageSpeed: number;
  moveSpeed: number;
  killReward: number;
  isAlive: boolean;
  unitType: string;

  constructor(scene: Phaser.Scene, way: Phaser.Curves.Path, x: number, y: number, unitType: string, difficultyCoeff: number = 1) {
    super(scene, way, x, y, unitType);
    scene.add.existing(this);

    this.unitType = unitType;
    this.isAlive = true;
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
    if (this.isAlive) {
      let deathCounter = this.scene.registry.get("deathCounter");
      deathCounter += 1;
      this.scene.registry.set("deathCounter", deathCounter);
      this.isAlive = false;
      this.pauseFollow();
      this.play({ key: `${this.unitType}_die`, repeat: 0});
      this.on('animationcomplete', this.despawn, this)
    }
  }

  despawn() {
    let stats = this.scene.registry.get("stats");
    stats.killedEnemies += 1;
    this.scene.registry.set('stats', stats);
    this.scene.time.delayedCall(5000, this.destroy, [], this)
  }


  // этот метод нужен чтобы утаскивать состояние enemy в tower. 
  getAlive() {
      return this.isAlive
  }
}