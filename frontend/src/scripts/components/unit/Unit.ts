// clacc Unit - базовый класс для всех атакующих персонажей:
// как наших защитников, так и врагов

import 'phaser'
import { isKiller, isFirstBlood } from '../../constants/achievments';
import { PlayerStatsManager } from '../stats/PlayerStats';

export default class Unit extends Phaser.GameObjects.PathFollower {
  hp: number;
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
    this.physicalArmor = 0 * difficultyCoeff;
    this.magicArmor = 0 * difficultyCoeff;
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

  takeDamage(damage, physicalDamage, magicDamage) {
      // Денис: понимаю зачем делать проверку на this.hp - damage? 
      // Пример: у моба 30 хп, башня стреляет уроном 20, 30 - 20 = 10 < damage
      // получается проверку проходит и моб умирает, хотя у него 10 хп еще
    // if(this.hp - damage < damage) {
    if(this.hp <= damage) {
      this.hp = 0;
      this.die();
    } else if(this.hp > damage) {
      if (this.physicalArmor !== 0 && physicalDamage !== 0 && this.physicalArmor >= physicalDamage) {
        this.physicalArmor -= physicalDamage;
        this.play({ key: `${this.unitType}_hurt`, repeat: 0})
        this.chain([{key: `${this.unitType}_walk`, repeat: Infinity}]);
      } else if (this.magicArmor !== 0 && magicDamage !== 0 && this.magicArmor >= magicDamage) {
        this.magicArmor -= magicDamage;            
        this.play({ key: `${this.unitType}_hurt`, repeat: 0})
        this.chain([{key: `${this.unitType}_walk`, repeat: Infinity}]);
      } else {
        this.hp -= damage; 
        this.play({ key: `${this.unitType}_hurt`, repeat: 0})
        this.chain([{key: `${this.unitType}_walk`, repeat: Infinity}]);
      }
    }
  }

  die() {
    if (this.isAlive) {  
      this.isAlive = false;
      this.pauseFollow();
      this.play({ key: `${this.unitType}_die`, repeat: 0});
      this.on('animationcomplete', this.despawn, this)
    }
  }
  
  despawn() {
    const playerStats = new PlayerStatsManager();
    let killedEnemies = playerStats.getFromLocalStorage()['killedEnemies'];
    killedEnemies += 1;
    isFirstBlood();
    isKiller();
    playerStats.saveToLocalStorage({'killedEnemies': killedEnemies});
    let deathCounter = this.scene.registry.get("deathCounter");
    deathCounter += 1;
    this.scene.registry.set("deathCounter", deathCounter);

    this.scene.time.delayedCall(5000, this.destroy, [], this)
  }

  getEnemyCost() {
      return this.killReward
  }

  // этот метод нужен чтобы утаскивать состояние enemy в tower. 
  getAlive() {
      return this.isAlive
  }
}