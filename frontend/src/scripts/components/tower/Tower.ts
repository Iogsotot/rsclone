import 'phaser';
import MissileBomb from '../missile/MissileBomb';
import MissileArrow from '../missile/MissileArrow';
import MissileMagic from '../missile/MissileMagic';
import { MapType } from '../../constants/maps';
import { isBuilder, isSeller } from '../../constants/achievements'
import { PlayerStatsManager } from '../stats/PlayerStats';
import Unit from '../unit/Unit';
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
  enemies: Array<Unit>;
  isTowerBuilt: boolean;
  attackArea: number;
  timeShot: number
  timeForNextShot: number;
  isEnemyAlive: boolean;
  archersTowerButton: Phaser.GameObjects.Sprite;
  magicTowerButton: Phaser.GameObjects.Sprite;
  artilleryTowerButton: Phaser.GameObjects.Sprite;
  towerSelectionCircle: Phaser.GameObjects.Sprite;
  towersInfo: Array<Array<any>>;
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
  infoWindow: Phaser.GameObjects.Image;
  textInfo: Phaser.GameObjects.Text;
  damageArchersTower: number;
  damageArtilleryTower: number;
  damageMagicTower: number;
  speedFireArchersTower: number;
  speedFireArtilleryTower: number;
  speedFireMagicTower: number;
  attackAreaArchersTower: number;
  attackAreaArtilleryTower: number;
  attackAreaMagicTower: number;
  typeArchersTower: string;
  typeArtilleryTower: string;
  typeMagicTower: string;
  graphics: Phaser.GameObjects.Graphics;

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
    this.damageArchersTower = 15;
    this.damageArtilleryTower = 25;
    this.damageMagicTower = 20;
    this.speedFireArchersTower = 2000;
    this.speedFireArtilleryTower = 3000;
    this.speedFireMagicTower = 1500;
    this.attackAreaArchersTower = 300;
    this.attackAreaArtilleryTower = 500;
    this.attackAreaMagicTower = 350;
    this.typeArchersTower = 'Archers';
    this.typeArtilleryTower = 'Artillery';
    this.typeMagicTower = 'Magic';
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
      this.towerSelectionCircle = this.scene.add.sprite(this.x, this.y, 'circle').setDepth(1);
      this.archersTowerButton = this.scene.add.sprite(this.x - 65, this.y - 65, 'arrow').setDepth(1);
      this.artilleryTowerButton = this.scene.add.sprite(this.x, this.y + 75, 'bomb').setDepth(1);
      this.magicTowerButton = this.scene.add.sprite(this.x + 65, this.y - 65, 'magic').setDepth(1);
      this.towersInfo = [[this.archersTowerButton, this.costArchersTower, this.damageArchersTower,
         this.speedFireArchersTower, this.attackAreaArchersTower, this.typeArchersTower],
      [this.artilleryTowerButton, this.costArtilleryTower, this.damageArtilleryTower, 
        this.speedFireArtilleryTower, this.attackAreaArtilleryTower, this.typeArtilleryTower],
      [this.magicTowerButton, this.costMagicTower, this.damageMagicTower, 
        this.speedFireMagicTower, this.attackAreaMagicTower, this.typeMagicTower]];
      this.towersInfo.forEach((towerButton: Array<any>) => {
        towerButton[0].setInteractive({ useHandCursor: true });
      });
      this.towerInformation()
      this.archersTowerButton.on('pointerdown', () => this.placeTowerArrow(), this.archersTowerButton);
      this.artilleryTowerButton.on('pointerdown', () => this.placeTowerBomb(), this.artilleryTowerButton);
      this.magicTowerButton.on('pointerdown', () => this.placeTowerMagic(), this.magicTowerButton);
      this.isTowerBuilt = true;
      this.canBuyTower();
    }
  }

  towerInformation(): void {
      let hasInfo: boolean = false;
      this.towersInfo.forEach((towerInfo: Array<any>) => {
        towerInfo[0].on('pointermove', () => {
            towerInfo[0].setScale(1.2);
            if (!hasInfo) {
                hasInfo = true;
                let infoWindowWidth = +this.scene.game.config.width / 10;
                let infoWindowHeight = +this.scene.game.config.height / 12;
                this.infoWindow = this.scene.add.image((this.x), (this.y - 150), 'settings-modal-bg').setDepth(1);
                this.infoWindow.setDisplaySize(infoWindowWidth, infoWindowHeight);
                const styles = {
                    fontFamily: 'Dimbo',
                    fontSize: '24px',
                    color: '#dbc899',
                    align: 'left',
                  }
                let text = `${towerInfo[5]} Tower/Price: ${towerInfo[1]}/Damage: ${towerInfo[2]}`;
                
                this.textInfo = this.scene.add.text((this.x - infoWindowWidth / 2) + 10, 
                    (this.y - infoWindowHeight * 2) + 10, text, styles).setDepth(1);
                this.textInfo.setWordWrapCallback((text: string) => text.split(/\//));
                this.graphics = this.scene.add.graphics({ fillStyle: { color: 0x00ff00, alpha: 0.3 } });
                let circle = new Phaser.Geom.Circle(this.x, this.y, towerInfo[4]);
                this.graphics.fillCircleShape(circle).setDepth(0);
            }
          });
          towerInfo[0].on('pointerout', () => {
            towerInfo[0].setScale(1);
            this.infoWindow.destroy();
            this.textInfo.destroy();
            hasInfo = false;
            this.graphics.destroy();
          });
      })
  }

  protected canBuyTower(): void {
    this.towersInfo.forEach((towerButton: Array<any>) => {
      this.playerGold < towerButton[1] ?
        towerButton[0].alpha = 0.5 :
        towerButton[0].alpha = 1;
    })
    if (this.playerGold < this.costArtilleryTower && this.playerGold < this.costMagicTower
      && this.playerGold < this.costArchersTower) {
      setTimeout((() => {
        this.isTowerBuilt = false;
        this.hideChoiceTower()}), 2000);
    }
  }

 canSale(slideOut: CallableFunction, context: object): void {
    if (this.isTowerBuilt) {
      this.saleMark = this.scene.add.sprite(this.x, this.y + 70, 'sale');
      this.saleMark.setInteractive({ useHandCursor: true });
      this.saleMark.on('pointerdown', () => this.sale(slideOut, context));
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
    this.cost = this.costArchersTower;
    if (this.cost <= this.playerGold) {
      const playerStats = new PlayerStatsManager();
      let builtTowers = playerStats.getFromLocalStorage()['builtTowers'];
      builtTowers += 1;
      isBuilder(this.scene);
      playerStats.saveToLocalStorage({ 'builtTowers': builtTowers });
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
      this.createStatsTower(this.damageArchersTower, this.speedFireArchersTower, 
        this.attackAreaArchersTower, 10);
      this.missiles = this.scene.physics.add.group({ classType: MissileArrow, runChildUpdate: true });
      this.isTowerSold = true;
      this.type = this.typeArchersTower;
    }
  }

  protected placeTowerBomb(): void {
    this.cost = this.costArtilleryTower;
    if (this.cost <= this.playerGold) {
      const playerStats = new PlayerStatsManager();
      let builtTowers = playerStats.getFromLocalStorage()['builtTowers'];
      builtTowers += 1;
      isBuilder(this.scene);
      playerStats.saveToLocalStorage({ 'builtTowers': builtTowers });
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
      this.createStatsTower(this.damageArtilleryTower, this.speedFireArtilleryTower, 
        this.attackAreaArtilleryTower, 20, 20);
      this.missiles = this.scene.physics.add.group({ classType: MissileBomb, runChildUpdate: true });
      this.isTowerSold = true;
      this.type = this.typeArtilleryTower;
    }
  }

  protected placeTowerMagic(): void {
    this.cost = this.costMagicTower;
    if (this.cost <= this.playerGold) {
      const playerStats = new PlayerStatsManager();
      let builtTowers = playerStats.getFromLocalStorage()['builtTowers'];
      builtTowers += 1;
      isBuilder(this.scene);
      playerStats.saveToLocalStorage({ 'builtTowers': builtTowers });
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
      this.createStatsTower(this.damageMagicTower, this.speedFireMagicTower, 
        this.attackAreaMagicTower, 0, 25);
      this.missiles = this.scene.physics.add.group({ classType: MissileMagic, runChildUpdate: true });
      this.isTowerSold = true;
      this.type = this.typeMagicTower;
    }
  }

  public getGold() {
    if (this.isTowerSold) {
      this.isTowerSold = false;
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
    this.towersInfo.forEach((towerButton: Array<any>) => {
      towerButton[0].destroy();
    });
    this.towerSelectionCircle.destroy();
    this.infoWindow.destroy();
    this.textInfo.destroy();
    this.graphics.destroy();
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
    this.enemies = enemies.getChildren();
  }

  public getMissiles(): Phaser.GameObjects.Group {
    return this.missiles
  }

  protected getEnemy(): any | void {
      for (let i = 0; i < this.enemies.length; i += 1) {
        this.isEnemyAlive = this.enemies[i].getAlive();
        const enemyDistance = Phaser.Math.Distance.Between(this.x, this.y, this.enemies[i].x, this.enemies[i].y);
        if (this.enemies[i].active && this.isEnemyAlive && enemyDistance <= this.attackArea) {
            return this.enemies[i];
        } 
        else if (!this.isEnemyAlive && !this.isEnemyDead) {
            this.isEnemyDead = true;
            this.enemyCost = this.enemies[i].getEnemyCost();
            this.enemies.splice(i, 1);
        } 
    }  
  }

  protected addMissile(angle: number): void {
    const missile = this.missiles.get();
    this.scene.tweens.add({
      targets: this.missiles,
      x: this.x,
      ease: 'Linear',
      duration: 500,
      onComplete: function (tween, targets) {
        targets[0].setVisible(false);
      }
    });
    if (missile) {
      missile.fire(this.x, this.y, angle);
    }
  }

  public fire() {
    if (this.isTowerBuilt) {  
    const enemy = this.getEnemy();
      if (enemy) {
        const enemyPositionX = enemy.x;
        const enemyPositionY = enemy.y
        const angle = Phaser.Math.Angle.Between(this.x, this.y, enemyPositionX, enemyPositionY);
        this.addMissile(angle);
        enemy.takeDamage(this.damage, this.physicalDamage, this.magicDamage);
      } 
    }
  }

  update(time: number) {
        if (time > this.timeShot && this.isTowerBuilt) {  
          this.fire();
          this.timeShot = time + this.timeForNextShot;
        }
    }
}
