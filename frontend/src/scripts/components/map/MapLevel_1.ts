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

  sizeCellX: number;

  sizeCellY: number;

  gridHeight: number;
  
  gridWidth: number;


  constructor(scene: Phaser.Scene, mapData: MapType) {
    super(scene, mapData);
    this.curve = undefined;
    this.startPointX = 0 / map1.scaleStartPointX;
    this.startPointY = this.height / map1.scaleStartPointY;
    this.finishPointX = this.width / map1.scaleFinishPointX;
    this.finishPointY = this.height / map1.scaleFinishPointY;
    this.gridHeight = map1.tiles.length;
    this.gridWidth = map1.tiles[0].length;
    this.sizeCellY = Number((this.height / this.gridHeight).toFixed(2));
    this.sizeCellX = this.width / this.gridWidth;
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

  placeTower(pointer: any, towers: Phaser.GameObjects.Group): void {
    let coordinates: any = this.getCoordinateTower(pointer, towers);
    if (coordinates) {
        let x: number = coordinates[0];
        let y: number = coordinates[1];
        let tower: any = towers.get();
        tower.setActive(true);
        tower.setVisible(true);
        tower.place(y, x, this.sizeCellY, this.sizeCellX);
    }
  }

  getCoordinateTower(pointer: any, turrets: any):number[] | void {
    let scaleWindowWidth: number = Number((document.documentElement.clientWidth / this.width).toFixed(2))
    let scaleWindowHeight: number = Number((document.documentElement.clientHeight / this.height).toFixed(2))
    let x: number = Math.floor(( (pointer.layerX / scaleWindowWidth) / this.sizeCellX ) );
    let y: number = Math.floor(( (pointer.layerY / scaleWindowHeight) / this.sizeCellY ) );
    let towerPlace: number = map1.tiles[y][x];
    

 
    for (let i = 1; i <= 11; i += 1) {
        if (i === towerPlace) {
            this.forbiddenPlaceTower(x, y);
            let coordinateX: number = this.width / map1.scaleCoordinateTowers[i - 1][0];
            let coordinateY: number = this.height / map1.scaleCoordinateTowers[i - 1][1];
            return [coordinateX, coordinateY];
        }
    }
  }

  forbiddenPlaceTower(x: number, y: number): void {
    map1.tiles[y][x] = -1;
    map1.tiles[y][x - 1] = -1;  
    map1.tiles[y - 1][x - 1] = -1;  
    map1.tiles[y][x + 1] = -1;
    map1.tiles[y + 1][x] = -1;
    map1.tiles[y - 1][x] = -1;
  }

  createPoint(points: Array<any>, scalePoint: object): void {
    let scaleX: number = Object.values(scalePoint)[0];
    let scaleY: number = Object.values(scalePoint)[1];
    let pointX: number = this.getRandomPointX(scaleX);
    let pointY: number = this.getRandomPointY(scaleY);
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
