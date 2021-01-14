import 'phaser';

export default class Missile extends Phaser.GameObjects.Image {
    dx: number;

    dy: number;

    lifespan: number;

    speed: any;

    constructor(scene) {
        super(scene, 0, 0, 'missile') 
        this.dx = 0;
        this.dy = 0;
        this.lifespan = 0;
        this.speed = Phaser.Math.GetSpeed(600, 1);        
    }

    fire(x: number, y: number, angle: number): void {
        this.setActive(true);
        this.setVisible(true);
        this.setPosition(x, y);

        // вращение пуль
        // this.setRotation(angle);
 
        this.dx = Math.cos(angle);
        this.dy = Math.sin(angle);

        this.lifespan = 300;
    }

    update(time, delta: number) {
        this.lifespan -= delta;
 
        this.x += this.dx * (this.speed * delta);
        this.y += this.dy * (this.speed * delta);
 
        if (this.lifespan <= 0)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}