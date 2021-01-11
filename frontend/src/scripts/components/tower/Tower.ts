import 'phaser';


export default class Tower extends Phaser.GameObjects.Image {
    scene: any;
    tower: any;
    x: number;
    y: number;

    constructor(scene: any, tower: any) {
        super(scene, 0, 0, 'tower', 'turret')
        this.x = NaN;
        this.y = NaN;

    }

    place(y:number, x: number, sizeCellY: number, sizeCellX: number): void {     
        this.y = y;
        this.x = x;          
    }
}
