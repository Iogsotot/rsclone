import 'phaser';
import { map1 } from '../../constants/maps';


export default class Tower extends Phaser.GameObjects.Image {
    scene: any
    tower: any
    constructor(scene: any, tower: any) {
        super(scene, 0, 0, 'tower', 'turret')
    }

   
    place(i:number, j: number): void {        
        this.y = i * 80 + 80 / 2;
        this.x = j * 80 + 80 / 2;
        map1.tiles[i][j] = 1;            
    }
}
