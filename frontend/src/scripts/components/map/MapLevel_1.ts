import Phaser from 'phaser';
import Map from './Map';
import { map1, MapType } from '../../constants/maps';
import getRandomDeviationWay from '../../utils/getRandomDeviationWay';

export interface MapLevel1 {
  new(scene: any, mapData: MapType): Map
}

export class MapLevel1 extends Map {
  /**
   * @param {Phaser.Scene} scene
   */
  curve: any;

  startPointX: number;

  startPointY: number;

  finishPointX: number;

  finishPointY: number;

  constructor(scene: any, mapData: MapType) {
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
    map1.scalePoints.forEach((scalePoint) => {
      this.createPoint(points, scalePoint);
    });
    this.curve = new Phaser.Curves.Spline(points);
    return this.curve;
  }

  createPoint(points: Array<any>, scalePoint: object): void {
    const scaleX = Object.values(scalePoint)[0];
    const scaleY = Object.values(scalePoint)[1];
    const pointX = this.getRandomPointX(scaleX);
    const pointY = this.getRandomPointY(scaleY);
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
