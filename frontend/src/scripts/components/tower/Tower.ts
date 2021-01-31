import 'phaser';
import MissileBomb from '../missile/MissileBomb';
import MissileArrow from '../missile/MissileArrow';
import MissileMagic from '../missile/MissileMagic';
import { MapType } from '../../constants/maps';
import { isBuilder, isSeller } from '../../constants/achievements'
import { PlayerStatsManager } from '../stats/PlayerStats';
import GameObjStats from '../interface/GameRoundStats';


export default class Tower extends Phaser.GameObjects.Sprite {
  scene: Phaser.Scene;
  tower: Phaser.GameObjects.Sprite;
  x: number;
  y: number;
  damage: number;
  magicDamage: number;
  physicalDamage: number;
  missiles: Phaser.GameObjects.Group;
  enemies: Phaser.GameObjects.Group;
  isTowerBuilt: boolean;
  attackArea: number;
  timeShot: number
  timeForNextShot: number;
  isEnemyAlive: boolean;
  archersTowerButton: Phaser.GameObjects.Sprite;
  magicTowerButton: Phaser.GameObjects.Sprite;
  artilleryTowerButton: Phaser.GameObjects.Sprite;
  towerButtons: Array<Array<Phaser.GameObjects.Sprite | number>>;
  mapData: MapType;
  cost: number;
  isTowerSold: boolean;
  playerGold: number;
  costArchersTower: number;
  costMagicTower: number;
  costArtilleryTower: number;
  saleMark: Phaser.GameObjects.Sprite;
  canUpdateGold: boolean;
  enemyCost: number;
  isEnemyDead: boolean;


  constructor(scene: Phaser.Scene, positionX: number, positionY: number, mapData: MapType) {
    super(scene, positionX, positionY, 'tower');
    this.x = positionX;
    this.y = positionY;
    this.setInteractive();
    this.isTowerBuilt = false;
    this.timeShot = 0;
    this.type = '';
    this.isEnemyAlive;
    this.timeForNextShot = 1000;
    this.mapData = mapData;
    this.isTowerSold = false;
    this.costArchersTower = 70;
    this.costMagicTower = 100;
    this.costArtilleryTower = 125;
    this.canUpdateGold = false;
  }

  public placeField(): void {
    this.tower = this.scene.add.sprite(this.x, this.y, 'tower');
    this.tower.setOrigin(0.5, 0.5);
    this.tower.setScale(1.2);
    if (this.mapData.level === 3) {
      this.scene.anims.create({
        key: 'tower_place_desert',
        frames: this.scene.anims.generateFrameNumbers('tower', {
          start: 4,
          end: 4
        }),
        frameRate: 0,
        repeat: -1
      });
      this.tower.play('tower_place_desert');
    }
  }

  public choiceTower(): void {
    if (!this.isTowerBuilt) {
      this.archersTowerButton = this.scene.add.sprite(this.x - 58, this.y - 50, 'arrow');
      this.artilleryTowerButton = this.scene.add.sprite(this.x + 50, this.y + 50, 'bomb');
      this.magicTowerButton = this.scene.add.sprite(this.x - 58, this.y + 50, 'magic');
      this.towerButtons = [[this.archersTowerButton, this.costArchersTower],
      [this.artilleryTowerButton, this.costArtilleryTower],
      [this.magicTowerButton, this.costMagicTower]];
      this.towerButtons.forEach((towerButton: Array<any>) => {
        towerButton[0].setInteractive();
      });
      this.archersTowerButton.on('pointerdown', () => this.placeTowerArrow(), this.archersTowerButton);
      this.artilleryTowerButton.on('pointerdown', () => this.placeTowerBomb(), this.artilleryTowerButton);
      this.magicTowerButton.on('pointerdown', () => this.placeTowerMagic(), this.magicTowerButton);
      this.isTowerBuilt = true;
      this.canBuyTower();
    }
  }

  protected canBuyTower(): void {
    this.towerButtons.forEach((towerButton: Array<any>) => {
      this.playerGold < towerButton[1] ?
        towerButton[0].alpha = 0.5 :
        towerButton[0].alpha = 1;
    })
    if (this.playerGold < this.costArtilleryTower && this.playerGold < this.costMagicTower
      && this.playerGold < this.costArchersTower) {
      setTimeout((() => this.hideChoiceTower()), 2000);
      this.isTowerBuilt = false;
    }
  }

  canSale(slideOut: CallableFunction, context: object): void {
    if (this.isTowerBuilt) {
      this.saleMark = this.scene.add.sprite(this.x, this.y + 70, 'sale');
      this.saleMark.setInteractive();
      this.saleMark.on('pointerdown', () => {
        this.scene.sound.play('tower-sell');
        this.sale(slideOut, context);
      });
      setTimeout(() => this.saleMark.destroy(), 3000);
    }
  }

  protected sale(slideOut, context: object): void {
    slideOut.call(context)
    const playerStats = new PlayerStatsManager();
    let soldTowers = playerStats.getFromLocalStorage()['soldTowers'];
    soldTowers += 1;
    isSeller(this.scene);
    playerStats.saveToLocalStorage({ 'soldTowers': soldTowers });
    this.canUpdateGold = true;
    this.isTowerBuilt = false;
    this.type = '';
    this.playerGold += this.cost * 0.8;
    this.tower.destroy();
    this.placeField();
    this.saleMark.setVisible(false);
    this.saleMark.setActive(false);
    this.tower.on('pointerdown', () => this.choiceTower())
  }

  protected placeTowerArrow(): void {
    const playerStats = new PlayerStatsManager();
    let builtTowers = playerStats.getFromLocalStorage()['builtTowers'];
    // счетчик сломан и звук тоже ломается из-за этого
    // this.scene.sound.play('tower-building');
    builtTowers += 1;
    isBuilder(this.scene);
    playerStats.saveToLocalStorage({ 'builtTowers': builtTowers });
    this.cost = this.costArchersTower;
    if (this.cost <= this.playerGold) {
      this.hideChoiceTower();
      this.scene.anims.create({
        key: 'tower_array_anim',
        frames: this.scene.anims.generateFrameNumbers('tower', {
          start: 1,
          end: 1
        }),
        frameRate: 0,
        repeat: -1
      });
      this.tower.play('tower_array_anim');
      this.createStatsTower(15, 1000, 300, 10);
      this.missiles = this.scene.physics.add.group({ classType: MissileArrow, runChildUpdate: true });
      this.isTowerSold = true;
      this.type = 'archers';
    }
  }

  protected placeTowerBomb(): void {
    const playerStats = new PlayerStatsManager();
    let builtTowers = playerStats.getFromLocalStorage()['builtTowers'];
    builtTowers += 1;
    isBuilder(this.scene);
    playerStats.saveToLocalStorage({ 'builtTowers': builtTowers });
    this.cost = this.costArtilleryTower;
    if (this.cost <= this.playerGold) {
      this.hideChoiceTower();
      this.scene.anims.create({
        key: 'tower_bomb_anim',
        frames: this.scene.anims.generateFrameNumbers('tower', {
          start: 3,
          end: 3
        }),
        frameRate: 0,
        repeat: -1
      });
      this.tower.play('tower_bomb_anim');
      this.createStatsTower(25, 2500, 500, 20, 20);
      this.missiles = this.scene.physics.add.group({ classType: MissileBomb, runChildUpdate: true });
      this.isTowerSold = true;
      this.type = 'artillery';
    }
  }

  protected placeTowerMagic(): void {
    const playerStats = new PlayerStatsManager();
    let builtTowers = playerStats.getFromLocalStorage()['builtTowers'];
    builtTowers += 1;
    isBuilder(this.scene);
    playerStats.saveToLocalStorage({ 'builtTowers': builtTowers });
    this.cost = this.costMagicTower;
    if (this.cost <= this.playerGold) {
      this.hideChoiceTower();
      this.scene.anims.create({
        key: 'tower_magic_anim',
        frames: this.scene.anims.generateFrameNumbers('tower', {
          start: 2,
          end: 2
        }),
        frameRate: 0,
        repeat: -1
      });
      this.tower.setScale(1.2);
      this.tower.play('tower_magic_anim');
      this.createStatsTower(200, 1500, 350, 0, 25);
      this.missiles = this.scene.physics.add.group({ classType: MissileMagic, runChildUpdate: true });
      this.isTowerSold = true;
      this.type = 'magic';
    }
  }

  public getGold() {
    if (this.isTowerSold) {
      this.isTowerSold = false;
      this.scene.sound.play('tower-building');
      return this.playerGold -= this.cost;
    } else if (this.isEnemyDead) {
      this.isEnemyDead = false;
      return this.playerGold += this.enemyCost;
    } else {
      return this.playerGold;
    }
  }

  public setGold(gold) {
    if (!this.canUpdateGold) {
      this.playerGold = gold;
    } else {
      this.canUpdateGold = false;
    }
  }

  public getType() {
    return this.type;
  }

  protected hideChoiceTower(): void {
    this.towerButtons.forEach((towerButton: Array<any>) => {
      towerButton[0].setActive(false);
      towerButton[0].setVisible(false);
    });
  }

  protected createStatsTower(damage: number, speedFire: number, attackArea: number,
    physicalDamage: number = 0, magicDamage: number = 0): void {
    this.damage = damage;
    this.timeForNextShot = speedFire;
    this.attackArea = attackArea;
    this.physicalDamage = physicalDamage;
    this.magicDamage = magicDamage;
  }

  public setEnemies(enemies: any) {
    this.enemies = enemies;
  }

  public getMissiles(): Phaser.GameObjects.Group {
    return this.missiles
  }

  protected getEnemy(x: number, y: number, distance: any): any | void {
    const enemyUnits: Array<any> = this.enemies.getChildren();
    for (let i = 0; i < enemyUnits.length; i += 1) {
      this.isEnemyAlive = enemyUnits[i].getAlive();
      if (enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) <= distance
        && this.isEnemyAlive) {
        return enemyUnits[i];
      } else if (!this.isEnemyAlive && !this.isEnemyDead) {
        this.isEnemyDead = true;
        this.enemyCost = enemyUnits[i].getEnemyCost();
        enemyUnits.splice(i, 1);
      }
    }
  }

  protected addMissile(x: number, y: number, angle: number): void {
    const missile = this.missiles.get();
    this.scene.tweens.add({
      targets: this.missiles,
      x: x,
      ease: 'Linear',
      duration: 500,
      onComplete: function (tween, targets) {
        targets[0].setVisible(false);
      }
    });
    if (missile) {
      missile.fire(x, y, angle);
    }
  }

  public fire() {
    if (this.isTowerBuilt) {
      const enemy = this.getEnemy(this.x, this.y, this.attackArea);
      if (enemy) {
        const enemyPositionX = enemy.x;
        const enemyPositionY = enemy.y
        const angle = Phaser.Math.Angle.Between(this.x, this.y, enemyPositionX, enemyPositionY);
        this.addMissile(this.x, this.y, angle);
        enemy.takeDamage(this.damage, this.physicalDamage, this.magicDamage);
      }
    }
  }

  update(time: number) {
    if (time > this.timeShot) {
      this.fire();
      this.timeShot = time + this.timeForNextShot;
    }
  }

}
