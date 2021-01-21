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
  mapData: any;
  startPointX: number;
  startPointY: number;
  finishPointX: number;
  finishPointY: number;
  scalePointsWay: Array<object>;
  scaleCoordinateTowers: Array<object>;

  constructor(scene: GameScene, mapData: MapType) {
    super(scene, mapData);
    this.curve = undefined;
    this.mapData = mapData;
    this.startPointX = this.mapData.scaleStartPointX;
    this.startPointY = this.height / this.mapData.scaleStartPointY;
    this.finishPointX = this.width / this.mapData.scaleFinishPointX;
    this.finishPointY = this.height / this.mapData.scaleFinishPointY;
    this.scalePointsWay = this.mapData.scalePointsWay;
    this.scaleCoordinateTowers = this.mapData.scaleCoordinateTowers;
  }

  createWay(): any {
    const points: Array<any> = [];
    const randomWay = Math.round(Math.random());
    this.scalePointsWay.forEach((scalePoint: any) => {
      if(scalePoint instanceof Array) {
        this.createPointWay(points, scalePoint[randomWay]);
      } else {
        this.createPointWay(points, scalePoint);
      }
    });
    this.curve = new Phaser.Curves.Path(this.startPointX, this.startPointY);
    this.curve.splineTo(points);
    return this.curve;
  }

  addTowers(): Array<any> {
    const towers: Array<any> = [];
      this.mapData.scaleCoordinateTowers.forEach((coordinate) => {
        const tower = this.createTower(coordinate)
        tower.placeField();
        towers.push(tower);
        tower.on('pointerdown',() => tower.choiceTower(), this);
        tower.setActive(false);
      })
      return towers;
  }
  createTower(coordinate: object): any {
    const scaleCoordinateX: number = Object.values(coordinate)[0];
    const scaleCoordinateY: number = Object.values(coordinate)[1];
    const x = this.width / scaleCoordinateX;
    const y = this.height / scaleCoordinateY;
    const tower = new Tower(this.scene, x, y, this.mapData);
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
