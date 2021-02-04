import { MapType } from '../../constants/maps';
import GameScene from '../scenes/GameScene';

export default class Map {
  scene: GameScene;

  mapData: MapType;

  map: Phaser.GameObjects.Image;

  width: number;

  height: number;

  constructor(scene: GameScene, mapData: MapType) {
    this.scene = scene;
    this.mapData = mapData;
    this.width = +scene.game.config.width;
    this.height = +scene.game.config.height;
  }

  create(): void {
    this.map = this.scene.add.image(0, 0, `map_${this.scene.levelSettings.level}`).setOrigin(0, 0);
    this.map.setDisplaySize(this.width, this.height);
  }
}
