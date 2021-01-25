import 'phaser';
import MissileBomb from '../missile/MissileBomb';
import MissileArrow from '../missile/MissileArrow';
import MissileMagic from '../missile/MissileMagic';
import { MapType } from '../../constants/maps';


export default class Tower extends Phaser.GameObjects.Sprite {
    scene: Phaser.Scene;
    tower: Phaser.GameObjects.Sprite;
    x: number;
    y: number;
    damage: number;
    missiles:  Phaser.GameObjects.Group;
    enemies:  Phaser.GameObjects.Group;
    isTowerBuilt: boolean;
    attackArea: number;
    timeShot: number
    timeForNextShot: number;
    isEnemyAlive: boolean;
    arrow: Phaser.GameObjects.Sprite;
    magic: Phaser.GameObjects.Sprite;
    bomb: Phaser.GameObjects.Sprite;
    mapData: MapType;
    cost: number;
    isTowerSold: boolean;
    playerGold: number;
    costTowerArrow: number;
    costTowerMagic: number;
    costTowerBomb: number;
    saleMark: Phaser.GameObjects.Sprite;
    updateGold: boolean;


    constructor(scene: Phaser.Scene, positionX: number, positionY: number, mapData: MapType) {
        super(scene, positionX, positionY, 'tower')
        this.x = positionX;
        this.y = positionY;
        this.setInteractive();
        this.isTowerBuilt = false;
        this.timeShot = 0;
        this.isEnemyAlive;
        this.timeForNextShot = 1000;
        this.mapData = mapData;
        this.isTowerSold = false;
        this.costTowerArrow = 70;
        this.costTowerMagic = 100;
        this.costTowerBomb = 125;
        this.updateGold = false;
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
                    end: 4}),
                frameRate: 0,
                repeat: -1
            });
            this.tower.play('tower_place_desert');
        }
    }

    public choiceTower(): void { 
        if(!this.isTowerBuilt) {
            this.arrow = this.scene.add.sprite(this.x - 58, this.y - 50, 'arrow');
            this.bomb = this.scene.add.sprite(this.x + 50, this.y + 50, 'bomb');
            this.magic = this.scene.add.sprite(this.x - 58, this.y + 50, 'magic');
            this.arrow.setInteractive();
            this.bomb.setInteractive();
            this.magic.setInteractive();
            this.arrow.on('pointerdown', () => this.placeTowerArrow(), this.arrow);
            this.bomb.on('pointerdown', () => this.placeTowerBomb(), this.bomb);
            this.magic.on('pointerdown', () => this.placeTowerMagic(), this.magic);
            this.isTowerBuilt = true;
            this.canBuyTower();
            
        } 
    }

    protected canBuyTower(): void {
        this.playerGold < this.costTowerArrow ? 
        this.arrow.alpha = 0.5 :
        this.arrow.alpha = 1;
        this.playerGold < this.costTowerMagic ? 
        this.magic.alpha = 0.5 :
        this.magic.alpha = 1;
        this.playerGold < this.costTowerBomb ? 
        this.bomb.alpha = 0.5 :
        this.bomb.alpha = 1;
        if (this.playerGold < this.costTowerBomb && this.playerGold < this.costTowerMagic
            && this.playerGold < this.costTowerArrow) {
                setTimeout((() => this.hideChoiceTower()), 2000);
                this.isTowerBuilt = false;
            }
    }

    protected canSale(): void {
        if(this.isTowerBuilt) {
            this.saleMark = this.scene.add.sprite(this.x, this.y + 70, 'sale');
            this.saleMark.setInteractive();
            this.saleMark.on('pointerdown',() => this.sale());
            setTimeout(() => this.saleMark.destroy(), 3000);
        } 
    }

    protected sale(): void {
        this.updateGold = true;
        this.isTowerBuilt = false;
        this.playerGold += this.cost * 0.8;
        this.tower.destroy();
        this.placeField();
        this.saleMark.setVisible(false);
        this.saleMark.setActive(false);
        this.tower.on('pointerdown',() => this.choiceTower())
    }
 
    protected placeTowerArrow(): void {
        this.cost = this.costTowerArrow;
        if (this.cost <= this.playerGold) {
            this.hideChoiceTower();
            this.scene.anims.create({
                key: 'tower_array_anim',
                frames: this.scene.anims.generateFrameNumbers('tower', {
                    start: 1,
                    end: 1}),
                frameRate: 0,
                repeat: -1
            });
            this.tower.play('tower_array_anim');
            this.createStatsTower(15, 1000, 300);
            this.missiles = this.scene.physics.add.group({ classType: MissileArrow, runChildUpdate: true });
            this.isTowerSold = true;
            this.type = 'Arrow';
            this.tower.setInteractive();
            this.tower.on('pointerdown',() => this.canSale());

        }
    }

    protected placeTowerBomb(): void {
        this.cost = this.costTowerBomb;
        if (this.cost <= this.playerGold) {
            this.hideChoiceTower();
            this.scene.anims.create({
                key: 'tower_bomb_anim',
                frames: this.scene.anims.generateFrameNumbers('tower', {
                    start: 3,
                    end: 3}),
                frameRate: 0,
                repeat: -1
            });
            this.tower.play('tower_bomb_anim');
            this.createStatsTower(25, 2500, 500);
            this.missiles = this.scene.physics.add.group({ classType: MissileBomb, runChildUpdate: true });
            this.isTowerSold = true;
            this.type = 'Bomb';
            this.tower.setInteractive();
            this.tower.on('pointerdown',() => this.canSale());
        }
    }

    protected placeTowerMagic(): void {
        this.cost = this.costTowerMagic;
        if (this.cost <= this.playerGold) {
            this.hideChoiceTower();
            this.scene.anims.create({
                key: 'tower_magic_anim',
                frames: this.scene.anims.generateFrameNumbers('tower', {
                    start: 2,
                    end: 2}),
                frameRate: 0,
                repeat: -1
            });
            this.tower.setScale(1.2);
            this.tower.play('tower_magic_anim');
            this.createStatsTower(20, 1500, 350);
            this.missiles = this.scene.physics.add.group({ classType: MissileMagic, runChildUpdate: true });
            this.isTowerSold = true;
            this.type = 'Magic';
            this.tower.setInteractive();
            this.tower.on('pointerdown',() => this.canSale());
        }   
    }

    public getGold() {
        if(this.isTowerSold) {
            this.isTowerSold = false;
            return this.playerGold -= this.cost;
        } else {
            return this.playerGold;
        }
    }

    public setGold(gold) {
        if (!this.updateGold) {
            this.playerGold = gold;
        } else {
            this.updateGold = false;
        }
    }

    public getType() {
        return this.type;
    }

    protected hideChoiceTower(): void {
        this.arrow.setActive(false);
        this.arrow.setVisible(false);
        this.bomb.setActive(false);
        this.bomb.setVisible(false);
        this.magic.setActive(false);
        this.magic.setVisible(false);
    }

    protected createStatsTower(damage: number, speedFire: number, attackArea: number): void {
        this.damage = damage;
        this.timeForNextShot = speedFire;
        this.attackArea = attackArea;
    }

    public setEnemies(enemies: any) {
        this.enemies = enemies; 
    }

    public getMissiles():  Phaser.GameObjects.Group {
        return this.missiles
    }

    protected getEnemy(x: number, y: number, distance: any): any | void {
        const enemyUnits: Array<any> = this.enemies.getChildren();
        for(let i = 0; i < enemyUnits.length; i += 1) { 
            this.isEnemyAlive = enemyUnits[i].getAlive()
            if(enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) <= distance
             && this.isEnemyAlive) {
                return enemyUnits[i];
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
                enemy.takeDamage(this.damage);
            }
        } 
    }

    update(time: number) {
        if(time > this.timeShot) {
            this.fire();
            this.timeShot = time + this.timeForNextShot;
        }
    }

}
