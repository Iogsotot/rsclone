import { MapType } from '../../constants/maps';

export default class Map {
  /**
  * @param {Phaser.Scene} scene
  */
  scene: Phaser.Scene;

  mapData: MapType;

  map: any;

  width: number;

  height: number;

  constructor(scene: Phaser.Scene, mapData: MapType) {
    this.scene = scene;
    this.mapData = mapData;
    this.map = undefined;
    this.width = window.innerWidth;
    this.height = window.innerWidth / 1.6;
  }

  preload(): void {
    this.scene.load.image('map', this.mapData.url);
  }

  create(): void {
    this.map = this.scene.add.image(0, 0, 'map').setOrigin(0, 0);
    this.map.setDisplaySize(this.width, this.height);
  }
}
