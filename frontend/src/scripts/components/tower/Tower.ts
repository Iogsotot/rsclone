import 'phaser';

export default class Tower extends Phaser.GameObjects.Sprite {
    scene: any;

    tower: any;

    x: number;

    y: number;


    constructor(scene: Phaser.Scene, positionX: number, positionY: number) {
        super(scene, positionX, positionY, 'tower',)
        this.x = positionX;
        this.y = positionY;
        this.tower = undefined;
        this.setInteractive();
    }

    placeField(): void {
        this.tower = this.scene.add.sprite(this.x, this.y, 'tower');
        this.tower.setOrigin(0.5, 0.5)
    }

    choiceTower(): void {  
        this.scene.anims.create({
            key: 'tower_choice_anim',
            frames: this.scene.anims.generateFrameNumbers('tower', {
                start: 2,
                end: 2}),
            frameRate: 0,
            repeat: -1
        });
        this.tower.setScale(1.5)
        this.tower.play('tower_choice_anim');
        console.log(this)
        this.on('pointerdown', () => this.placeTower(), this)
    }

    placeTower(): void {
        this.scene.anims.create({
            key: 'tower_anim',
            frames: this.scene.anims.generateFrameNumbers('tower', {
                start: 3,
                end: 3}),
            frameRate: 0,
            repeat: -1
        });
        this.tower.setScale(1)
        this.tower.play('tower_anim')
    }

}
