import { map1 } from '../../constants/maps';
import { MapLevel1 } from '../map/MapLevel_1';
import Enemy from '../enemies/Enemy';

var follower;
var path;
var graphics;

export default class GameScene extends Phaser.Scene {
  enemy: any;
  animation: any;
  map: MapLevel1;
  points: Array<any>;
  firstPointX: number;
  firstPointY: number;
  // destroyEnemy: any;

  constructor() {
    super('game-scene');
    this.map = new MapLevel1(this, map1);
    this.firstPointX = this.map.getStartPointX();
    this.firstPointY = this.map.getStartPointY();
  }

  addEnemy(way) {
    this.enemy = new Enemy(way);
  }

  preload(): void {
    this.map.preload();

    this.load.spritesheet('dude', './assets/imgs/dude.png', {
      frameWidth: 32,
      frameHeight: 48
    });

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
    const way = this.map.createWay();
    const defaultEnemy = this.add.sprite(this.firstPointX - 50, this.firstPointY, 'defaultEnemy');
    const scorpio = this.add.sprite(this.firstPointX - 100, this.firstPointY, 'scorpio').setScale(0.4);

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
      repeat: -1
    });

    // const enemy2 = this.add.follower(way, this.firstPointX, this.firstPointY, 'defaultEnemy');
    // enemy2.startFollow(10000);
    
    defaultEnemy.play({ key: 'defaultEnemy_walk', repeat: Infinity });
    scorpio.play({ key: 'scorpio_walk', repeat: Infinity });

    scorpio.setInteractive();

    this.tweens.add({
      targets: defaultEnemy,
      x: 1500,
      duration: 25000,
      ease: 'Linear'
    });
    
    this.tweens.add({
      targets: scorpio,
      x: 1500,
      t: 1,
      duration: 30000,
      ease: 'Linear',
      delay: 1000
    });

  }

  update() {
  }
}
