import 'phaser'
import { map1 } from '../../constants/maps';
import { MapLevel1 } from '../map/MapLevel_1';
import Scorpio from '../unit/Scorpio';
import Mummy from '../unit/Mummy';
import Tower from '../tower/Tower';

export default class GameScene extends Phaser.Scene {
  enemy: any;
  animation: any;
  map: MapLevel1;
  points: Array<any>;
  firstPointX: number;
  firstPointY: number;
  gatePointX: number;
  gatePointY: number;

  constructor() {
    super('game-scene');
    this.map = new MapLevel1(this, map1);
    this.firstPointX = this.map.getStartPointX();
    this.firstPointY = this.map.getStartPointY();
    this.gatePointX = this.map.getFinishPointX();
    this.gatePointY = this.map.getFinishPointY();
  }

  create(): void {
    this.map.create();
    this.map.addTowers();

    this.anims.create({
      key: 'defaultEnemy_walk',
      frames: this.anims.generateFrameNumbers('defaultEnemy', {
        start: 0,
        end: 17,
      }),
      frameRate: 18,
    });

    this.anims.create({
      key: 'scorpio_walk',
      frames: this.anims.generateFrameNumbers('scorpio', {
        start: 0,
        end: 19,
      }),
      frameRate: 17,
    });


    for (let i = 0; i < 3; i++) {
      const way = this.map.createWay();
      const scorpio = new Scorpio(this, way, this.firstPointX, this.firstPointY).setScale(0.4);
      console.log(scorpio);
      const defaultEnemy = new Mummy(this, way, this.firstPointX, this.firstPointY)

      scorpio.play({ key: 'scorpio_walk', repeat: Infinity });
      defaultEnemy.play({ key: 'defaultEnemy_walk', repeat: Infinity });

      scorpio.startFollow({ delay: 2000 * i, duration: scorpio.moveSpeed, rotateToPath: true });
      defaultEnemy.startFollow({ delay: 1000 * i, duration: defaultEnemy.moveSpeed, rotateToPath: true }) 
    }

  }   

  update() {
  }

}

