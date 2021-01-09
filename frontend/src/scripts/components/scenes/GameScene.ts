import { map1 } from '../../constants/maps';
import { MapLevel1 } from '../map/MapLevel_1';
import Enemy from '../enemies/Enemy';

export default class GameScene extends Phaser.Scene {
  enemy: any;

  animation: any;

  map: MapLevel1;

  points: Array<any>;

  firstPointX: number;

  firstPointY: number;

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
    // для примера добавил врага
    this.load.spritesheet(
      'dude',
      './assets/imgs/dude.png',
      { frameWidth: 32, frameHeight: 48 },
    );

    this.load.spritesheet(
      'defaultEnemy',
      './assets/sprites/mummy37x45.png',
      { frameWidth: 37, frameHeight: 45 },
    );
  }

  create(): void {
    this.map.create();
    const way = this.map.createWay();
    // const enemy = this.add.follower(way, this.firstPointX, this.firstPointY, 'dude');
    // enemy.startFollow(10000);

    const defaultEnemyAnimation = this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('defaultEnemy',
        {
          start: 0,
          end: 16,
        }),
      frameRate: 16,
    });

    const sprite = this.add.sprite(this.firstPointX, this.firstPointY, 'defaultEnemy');
    sprite.play({ key: 'walk', repeat: Infinity });
    const enemy2 = this.add.follower(way, this.firstPointX, this.firstPointY, 'defaultEnemy');
    enemy2.startFollow(10000);
    this.tweens.add({
      targets: sprite,
      x: 850,
      duration: 50000,
      ease: 'Linear',
    });
  }

  // update() {

  // }
}
