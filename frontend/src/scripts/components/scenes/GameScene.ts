import { map1 } from '../../constants/maps';
import { MapLevel1 } from '../map/MapLevel_1';

// var turrets

export default class GameScene extends Phaser.Scene {
  map: any;
  points: any;
  firstPointX: any;
  firstPointY: any;

  constructor() {
    super('game-scene');
    this.map = new MapLevel1(this, map1);
    this.firstPointX = this.map.getStartPointX();
    this.firstPointY = this.map.getStartPointY();
  }

  preload() {
    this.map.preload();
    // для примера добавил врага
    this.load.spritesheet('dude',
      './assets/dude.png',
      { frameWidth: 32, frameHeight: 48 });
  }

  create() {
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

  }

  update() {

  }
}
