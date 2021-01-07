import Phaser from '../phaser/phaser';
import { map1 } from '../../constants/maps';
import { MapLevel1, Points } from '../map/MapLevel_1';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('game-scene');
    this.map = new MapLevel1(this, map1);
    this.points = new Points();
    this.firstPointX = this.points.getStartPointX();
    this.firstPointY = this.points.getStartPointY();
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
