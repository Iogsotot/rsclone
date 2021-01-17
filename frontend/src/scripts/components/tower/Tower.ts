import 'phaser';
import Missile from '../missile/Missile';

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

    constructor(scene: Phaser.Scene, positionX: number, positionY: number) {
        super(scene, positionX, positionY, 'tower')
        this.x = positionX;
        this.y = positionY;
        this.setInteractive();
        this.isTowerBuilt = false;
        this.timeShot = 0;
        this.missiles = this.scene.physics.add.group({ classType: Missile, runChildUpdate: true });
        this.isEnemyAlive;
        this.timeForNextShot = 1000
    }

    public placeField(): void {
        this.tower = this.scene.add.sprite(this.x, this.y, 'tower');
        this.tower.setOrigin(0.5, 0.5)
        this.tower.setScale(1.2)
    }

    public choiceTower(): void {  
        this.arrow = this.scene.add.sprite(this.x - 58, this.y - 50, 'arrow');
        this.bomb = this.scene.add.sprite(this.x + 50, this.y + 50, 'bomb');
        this.magic = this.scene.add.sprite(this.x - 58, this.y + 50, 'magic');
        this.arrow.setInteractive();
        this.bomb.setInteractive();
        this.magic.setInteractive();
        this.arrow.on('pointerdown', () => this.placeTowerArrow());
        this.bomb.on('pointerdown', () => this.placeTowerBomb());
        this.magic.on('pointerdown', () => this.placeTowerMagic());
    }

    protected placeTowerArrow(): void {
        this.scene.anims.create({
            key: 'tower_array_anim',
            frames: this.scene.anims.generateFrameNumbers('tower', {
                start: 1,
                end: 1}),
            frameRate: 0,
            repeat: -1
        });
        this.tower.play('tower_array_anim');
        this.isTowerBuilt = true;
        this.hideChoiceTower();
        this.createStatsTower(15, 1000, 300);
    }

    protected placeTowerBomb(): void {
        this.scene.anims.create({
            key: 'tower_bomb_anim',
            frames: this.scene.anims.generateFrameNumbers('tower', {
                start: 3,
                end: 3}),
            frameRate: 0,
            repeat: -1
        });
        this.tower.play('tower_bomb_anim');
        this.isTowerBuilt = true;
        this.hideChoiceTower();
        this.createStatsTower(25, 2500, 500);
    }

    protected placeTowerMagic(): void {
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
        this.isTowerBuilt = true;
        this.hideChoiceTower();
        this.createStatsTower(20, 1500, 350);
    }

    protected hideChoiceTower(): void {
        this.arrow.setVisible(false);
        this.arrow.setActive(false);
        this.bomb.setVisible(false);
        this.bomb.setActive(false);
        this.magic.setVisible(false);
        this.magic.setActive(false);
    }

    protected createStatsTower(damage, speedFire, attackArea) {
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
                console.log(this.timeForNextShot, this.damage, this.attackArea)
                enemy.takeDamage(this.damage);
                // this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;
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
