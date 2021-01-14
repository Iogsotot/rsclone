import 'phaser'
import { map1 } from '../../constants/maps';
import { MapLevel1 } from '../map/MapLevel_1';
import Scorpio from '../unit/Scorpio';
import Mummy from '../unit/Mummy';
import Tower from '../tower/Tower';
import { AUTO } from 'phaser';
import GameObjStats from '../interface/GameObjStats'

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
  gameObjStats: any;
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
      // key: 'scorpio',
      frames: this.anims.generateFrameNumbers('scorpio', {
        // frames: this.anims.generateFrameNumbers('scorpio_walk', {
        start: 0,
        end: 19,
      }),
      frameRate: 70,
    });

    this.anims.create({
      key: 'scorpio_die',
      frames: this.anims.generateFrameNumbers('scorpio_die', {
        start: 0,
        end: 19,
      }),
      frameRate: 70,
    });

    this.gate = this.add.sprite(this.gatePointX - 45, this.gatePointY, 'gate').setScale(0.35)
    this.gate.alpha = 0.5;

    for (let i = 0; i < 3; i++) {
      const way = this.map.createWay();
      const scorpio = new Scorpio(this, way, this.firstPointX, this.firstPointY).setScale(0.4);
      const defaultEnemy = new Mummy(this, way, this.firstPointX, this.firstPointY)

      scorpio.play({ key: 'scorpio_walk', repeat: Infinity });
      // scorpio.play({ key: 'scorpio', repeat: Infinity });
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

    // добавляем раные динамические статы на страницу
    this.gameObjStats = new GameObjStats(this);
    this.input.on('gameobjectdown', (pointer, gameObject, event) => { 
      this.gameObjStats.updateText(gameObject);
    });
  }

  update() {
    this.gate.rotation += 0.003;
  }
}


// функция отрисовки сетки (отладочный код)
// function drawGrid(graphics) {
//   const dimension = window.innerWidth / 30;
//   graphics.lineStyle(1, 0x0000ff, 0.8);
//   for (let i = 0; i < 200; i++) {
//     graphics.moveTo(0, i * dimension);
//     graphics.lineTo(window.innerWidth, i * dimension);
//   }
//   for (let j = 0; j < 200; j++) {
//     graphics.moveTo(j * dimension, 0);
//     graphics.lineTo(j * dimension, window.innerHeight);
//   }
//   graphics.strokePath();
// }
