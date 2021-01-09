import { map1 } from '../../constants/maps';
import { MapLevel1 } from '../map/MapLevel_1';
import 'phaser'


import Tower from './Tower';

export default class GameScene extends Phaser.Scene {
  map: MapLevel1;
  points: Array<any>;
  firstPointX: number;
  firstPointY: number;
  turrets: any;

  constructor() {
    super('game-scene');
    this.map = new MapLevel1(this, map1);
    this.firstPointX = this.map.getStartPointX();
    this.firstPointY = this.map.getStartPointY();
    this.turrets = undefined;
  }

  preload(): void {
    this.map.preload();
    // для примера добавил врага
    this.load.spritesheet('dude',
      './assets/dude.png',
      { frameWidth: 32, frameHeight: 48 });
    this.load.image('tower', './assets/tower.jpg')
  }

  create(): void {
    this.map.create();
    // для примера пустил врага по пути. Для каждого врага необходимо создавать свой путь, так как путь рандомный, что позволяет врагам идти немного хаотично.
    const way = this.map.createWay();
    const way2 = this.map.createWay();
    const way3 = this.map.createWay();
    
    const enemy = this.add.follower(way, this.firstPointX, this.firstPointY, 'dude');
    const enemy2 = this.add.follower(way2, this.firstPointX, this.firstPointY, 'dude');
    const enemy3 = this.add.follower(way3, this.firstPointX, this.firstPointY, 'dude');
    enemy.startFollow(10000);
    enemy2.startFollow(12000);
    enemy3.startFollow(15000);


    const graphics = this.add.graphics();    
    drawGrid(graphics);

    const turret = new Tower(this, 'tower')
    this.turrets = this.add.group({ classType: Tower, runChildUpdate: true });
    this.input.on('pointerdown', (pointer) => {
        let i = Math.floor( pointer.y / 80 );
        let j = Math.floor( pointer.x / 80 );
        if( map1.tiles[i][j] === 0 ) {
            let turret = this.turrets.get();
            if (turret) {
                turret.setActive(true);
                turret.setVisible(true);
                turret.place(i, j);
            }   
        }
    });
    
  }

  update() {

  }

}


// вспомогательная функция для построения сетки, нам она не нужна
function drawGrid(graphics) {
    graphics.lineStyle(1, 0x0000ff, 0.8);
    for(let i = 0; i < 160; i++) {
        graphics.moveTo(0, i * 80);
        graphics.lineTo(1280, i * 80);
    }
    for(let j = 0; j < 200; j++) {
        graphics.moveTo(j * 80, 0);
        graphics.lineTo(j * 80, 700);
    }
    graphics.strokePath();
}
