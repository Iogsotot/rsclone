import { map1 } from '../../constants/maps';
import { MapLevel1 } from '../map/MapLevel_1';
import 'phaser'
import Tower from '../tower/Tower';
import Enemy from '../enemies/Enemy';

export default class GameScene extends Phaser.Scene {
  enemy: any;
  animation: any;
  map: MapLevel1;
  points: Array<any>;
  firstPointX: number;
  firstPointY: number;
  towers: any;
  tower: any;
  gatePointX: number;
  gatePointY: number;
  // destroyEnemy: any;

  constructor() {
    super('game-scene');
    this.map = new MapLevel1(this, map1);
    this.firstPointX = this.map.getStartPointX();
    this.firstPointY = this.map.getStartPointY();
    this.towers = undefined;
    this.tower = undefined;
    this.gatePointX = this.map.getFinishPointX();
    this.gatePointY = this.map.getFinishPointY();
  }

  addEnemy(way) {
    this.enemy = new Enemy(way);
  }

  preload(): void {
    this.map.preload();

    this.load.image('tower', './assets/tower.jpg')

    this.load.spritesheet('defaultEnemy', './assets/sprites/mummy37x45.png', {
      frameWidth: 37,
      frameHeight: 45
    });

    this.load.spritesheet('scorpio', './assets/sprites/scorpio.png', {
      frameWidth: 212,
      frameHeight: 246
    });
  }

  create(): void {
    this.map.create();

    this.tower = new Tower(this, 'tower')
    this.towers = this.add.group({ classType: Tower, runChildUpdate: true });
    this.input.on('pointerdown', () => this.map.placeTower(event, this.towers));

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
        end: 20,
      }),
      frameRate: 17,
    });

    for (let i = 0; i < 3; i++) { 
      const way = this.map.createWay();
      const scorpio = this.add.follower(way, this.firstPointX, this.firstPointY, 'scorpio').setScale(0.4);
      const defaultEnemy = this.add.follower(way, this.firstPointX, this.firstPointY, 'defaultEnemy');

      scorpio.play({ key: 'scorpio_walk', repeat: Infinity });
      defaultEnemy.play({ key: 'defaultEnemy_walk', repeat: Infinity });

      scorpio.startFollow({ delay: 2000 * i, duration: 20000, rotateToPath: true });
      defaultEnemy.startFollow({ delay: 1000 * i, duration: 30000, rotateToPath: true });
    }    
  }

  update() {
  }

}



