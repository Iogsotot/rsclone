import 'phaser'
import { map1 } from '../../constants/maps';
import { MapLevel1 } from '../map/MapLevel_1';
import Scorpio from '../unit/Scorpio';
import Mummy from '../unit/Mummy';
import Tower from '../tower/Tower';
import { AUTO } from 'phaser';

export default class GameScene extends Phaser.Scene {
  enemy: any;
  animation: any;
  map: MapLevel1;
  points: Array<any>;
  firstPointX: number;
  firstPointY: number;
  gatePointX: number;
  gatePointY: number;
  gate: any;
  // gateHealth: number;

  constructor() {
    super('game-scene');
    this.map = new MapLevel1(this, map1);
    this.firstPointX = this.map.getStartPointX();
    this.firstPointY = this.map.getStartPointY();
    this.gatePointX = this.map.getFinishPointX();
    this.gatePointY = this.map.getFinishPointY();
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

    this.load.image('gate', './assets/imgs/gate-mini.png');
  }

  create(): void {
    this.map.create();
    this.map.addTowers();

    // this.

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

    this.gate = this.add.sprite(this.gatePointX - 70, this.gatePointY, 'gate').setScale(0.5)
    this.gate.alpha = 0.5;

    for (let i = 0; i < 3; i++) {
      const way = this.map.createWay();
      const scorpio = new Scorpio(this, way, this.firstPointX, this.firstPointY).setScale(0.4);
      // console.log(scorpio);
      const defaultEnemy = new Mummy(this, way, this.firstPointX, this.firstPointY)

      scorpio.play({ key: 'scorpio_walk', repeat: Infinity });
      defaultEnemy.play({ key: 'defaultEnemy_walk', repeat: Infinity });

      scorpio.startFollow({ delay: 2000 * i, duration: scorpio.moveSpeed, rotateToPath: true });
      defaultEnemy.startFollow({ delay: 1000 * i, duration: defaultEnemy.moveSpeed, rotateToPath: true })

      // рисуем way (отладочный код)
      // const graphic2 = this.add.graphics();
      // way.draw(graphic2);
    }

    // Рисуем сетку (отладочный код)
    // const graphics = this.add.graphics();
    // drawGrid(graphics);
  }

  update() {
    this.gate.rotation += 0.003;
  }
}


// функция отрисовки сетки
function drawGrid(graphics) {
  const dimension = window.innerWidth / 30;
  graphics.lineStyle(1, 0x0000ff, 0.8);
  for (let i = 0; i < 200; i++) {
    graphics.moveTo(0, i * dimension);
    graphics.lineTo(window.innerWidth, i * dimension);
  }
  for (let j = 0; j < 200; j++) {
    graphics.moveTo(j * dimension, 0);
    graphics.lineTo(j * dimension, window.innerHeight);
  }
  graphics.strokePath();
}
