export default class Map {
  /**
   * @param {Phaser.Scene} scene
   */
  scene: any;
  mapData: any;
  map: any;
  width: any;
  height: any;

  constructor(scene: any, mapData: any) {
    this.scene = scene;
    this.mapData = mapData;
    this.map = undefined;
    this.width = 1280;
    this.height = 700;
  }

  preload() {
    this.scene.load.image('map', this.mapData.url);
  }

  create() {
    this.map = this.scene.add.image(0, 0, 'map').setOrigin(0, 0);
    this.map.setDisplaySize(this.width, this.height);
  }

  // update() {

  // }
}