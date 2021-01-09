
import { MapType } from "../../constants/maps";
export default class Map {
  /**
   * @param {Phaser.Scene} scene
   */
  scene: any;
  mapData: MapType;
  map: any;
  width: number;
  height: number;

  constructor(scene: any, mapData: MapType) {
    this.scene = scene;
    this.mapData = mapData;
    this.map = undefined;
    this.width = 1280;
    this.height = 700;
  }

  preload(): void {
    this.scene.load.image('map', this.mapData.url); 
  }

  create(): void {
    this.map = this.scene.add.image(0, 0, 'map').setOrigin(0, 0);
    this.map.setDisplaySize(this.width, this.height); 
  }
}
