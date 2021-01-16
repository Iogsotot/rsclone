import 'phaser';
import Missile from '../missile/Missile'

export default class Tower extends Phaser.GameObjects.Sprite {
    scene: any;

    tower: any;

    x: number;

    y: number;

    damage: number;

    missiles:  Phaser.GameObjects.Group;

    enemies:  Phaser.GameObjects.Group;

    isTowerBuilt: boolean;

    attackArea: number;

    timeShot: number

    timeForNextShot: number;

    constructor(scene: Phaser.Scene, positionX: number, positionY: number) {
        super(scene, positionX, positionY, 'tower')
        this.x = positionX;
        this.y = positionY;
        this.damage = 20;
        this.tower = undefined;
        this.setInteractive();
        this.isTowerBuilt = false;
        this.attackArea = 200;
        this.timeShot = 0;
        this.timeForNextShot = 1000;
        this.missiles = this.scene.physics.add.group({ classType: Missile, runChildUpdate: true });
    }

    public placeField(): void {
        this.tower = this.scene.add.sprite(this.x, this.y, 'tower');
        this.tower.setOrigin(0.5, 0.5)
    }

    public choiceTower(): void {  
        this.scene.anims.create({
            key: 'tower_choice_anim',
            frames: this.scene.anims.generateFrameNumbers('tower', {
                start: 1,
                end: 1}),
            frameRate: 0,
            repeat: -1
        });
        this.tower.setScale(1.5)
        this.tower.play('tower_choice_anim');
        console.log(this.tower )
        const pointer = this.scene.input.activePointer
        this.on('pointerdown', () => this.placeTower(pointer), this)
    }

    protected placeTower(pointer): void {
        // console.log(pointer)
        this.scene.anims.create({
            key: 'tower_anim',
            frames: this.scene.anims.generateFrameNumbers('tower', {
                start: 3,
                end: 3}),
            frameRate: 0,
            repeat: -1
        });
        this.tower.setScale(1);
        this.tower.play('tower_anim');
        this.isTowerBuilt = true;
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
            if(enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) <= distance) {
                return enemyUnits[i];
            }
        }
    }

    protected addMissile(x: number, y: number, angle: number): void {
        const missile = this.missiles.get();
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
                // this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;
            }
        } 
    }

    public damageEnemy(enemy: any, missile: any) {  
        const damage = 20
        if (enemy.active === true && missile.active === true) {
            missile.setActive(false);
            missile.setVisible(false);    
            enemy.takeDamage(damage);
        }
    }

    update(time: number) {
        if(time > this.timeShot) {
            this.fire();
            this.timeShot = time + this.timeForNextShot;
        }
    }

}
