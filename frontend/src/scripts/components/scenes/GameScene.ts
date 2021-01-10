import { map1 } from '../../constants/maps';
import { MapLevel1 } from '../map/MapLevel_1';
import 'phaser'
import Tower from '../tower/Tower';

export default class GameScene extends Phaser.Scene {
  map: MapLevel1;
  points: Array<any>;
  firstPointX: number;
  firstPointY: number;
  towers: any;
  tower: any;

  constructor() {
    super('game-scene');
    this.map = new MapLevel1(this, map1);
    this.firstPointX = this.map.getStartPointX();
    this.firstPointY = this.map.getStartPointY();
    this.towers = undefined;
    this.tower = undefined;
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

    this.tower = new Tower(this, 'tower')
    this.towers = this.add.group({ classType: Tower, runChildUpdate: true });
    this.input.on('pointerdown', () => this.map.placeTower(event, this.towers));
  }

  update() {

  }

}



