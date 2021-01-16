import Phaser from 'phaser';
import Map from './Map';
import { map1, MapType } from '../../constants/maps';
import getRandomDeviationWay from '../../utils/getRandomDeviationWay';
import Tower from '../tower/Tower';
import GameScene from '../scenes/GameScene';

export interface MapLevel {
  new(scene: any, mapData: MapType): Map
}

export class MapLevel extends Map {
  curve: any;

  startPointX: number;

  startPointY: number;

  finishPointX: number;

  finishPointY: number;


  constructor(scene: GameScene, mapData: MapType) {
    super(scene, mapData);
    this.curve = undefined;
    this.startPointX = 0 / map1.scaleStartPointX;
    this.startPointY = this.height / map1.scaleStartPointY;
    this.finishPointX = this.width / map1.scaleFinishPointX;
    this.finishPointY = this.height / map1.scaleFinishPointY;
  }

  createWay(): any {
    const points: Array<any> = [];
    points.push(new Phaser.Math.Vector2(this.startPointX, this.startPointY));
    map1.scalePointsWay.forEach((scalePoint) => {
      this.createPointWay(points, scalePoint);
    });
    this.curve = new Phaser.Curves.Spline(points);

    // надо подумать как переделать это в мягкие линии, а не ломанные, как сейчас
    // scalePoints находятся в maps.ts (???)
    // this.curve = new Phaser.Curves.Path(0, 0);
    // this.curve.splineTo(points);

    return this.curve;
  }


  addTowers(): void {
      map1.scaleCoordinateTowers.forEach((coordinate) => {
        const tower = this.createTower(coordinate)
        tower.placeField();
        tower.on('pointerdown',() => tower.choiceTower(), this)
      })
      
  }

  createTower(coordinate: object): any {
    const scaleCoordinateX: number = Object.values(coordinate)[0];
    const scaleCoordinateY: number = Object.values(coordinate)[1];
    const x = this.width / scaleCoordinateX;
    const y = this.height / scaleCoordinateY;
    const tower = new Tower(this.scene, x, y);
    return tower
  }

  createPointWay(points: Array<any>, scalePoint: object): void {
    const scaleX: number = Object.values(scalePoint)[0];
    const scaleY: number = Object.values(scalePoint)[1];
    const pointX: number = this.getRandomPointX(scaleX);
    const pointY: number = this.getRandomPointY(scaleY);
    points.push(new Phaser.Math.Vector2(pointX, pointY));
  }

  getRandomPointX(scale: number): number {
    return (this.width / scale) + getRandomDeviationWay();
  }

  getRandomPointY(scale: number): number {
    return (this.height / scale) + getRandomDeviationWay();
  }

  getStartPointX(): number {
    return this.startPointX;
  }

  getStartPointY(): number {
    return this.startPointY;
  }

  getFinishPointX(): number {
    return this.finishPointX;
  }

  getFinishPointY(): number {
    return this.finishPointY;
  }
}
