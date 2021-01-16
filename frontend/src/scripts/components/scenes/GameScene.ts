import 'phaser'
import { map1 } from '../../constants/maps';
import { MapLevel } from '../map/MapLevel';
import Scorpio from '../unit/Scorpio';
import WizardBlack from "../unit/WizardBlack";
import LittleOrc  from "../unit/LittleOrc";
import { AUTO } from 'phaser';
import GameObjStats from '../interface/GameObjStats';


export default class GameScene extends Phaser.Scene {
  map: MapLevel;

  points: Array<any>;

  firstPointX: number;

  firstPointY: number;

  gatePointX: number;

  gatePointY: number;

  gate: any;

  gameObjStats: any;

  towers: Array<any>

  enemiesGroup: Phaser.GameObjects.Group;

  constructor() {
    super('game-scene');
    this.map = new MapLevel(this, map1);
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
    this.towers = this.map.addTowers();
    this.enemiesGroup = this.physics.add.group();
    
    this.anims.create({
      key: 'scorpio_walk',
      frames: this.anims.generateFrameNumbers('scorpio', {
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

    this.anims.create({
      key: 'scorpio_hurt',
      frames: this.anims.generateFrameNumbers('scorpio_hurt', {
        start: 0,
        end: 19,
      }),
      frameRate: 70,
    });

    this.anims.create({
      key: 'wizardBlack_walk',
      frames: this.anims.generateFrameNumbers('wizardBlack', {
        start: 0,
        end: 19,
      }),
      frameRate: 15,
    });

    this.anims.create({
      key: 'wizardBlack_die',
      frames: this.anims.generateFrameNumbers('wizardBlack_die', {
        start: 0,
        end: 19,
      }),
      frameRate: 15,
    });

    this.anims.create({
      key: 'wizardBlack_hurt',
      frames: this.anims.generateFrameNumbers('wizardBlack_hurt', {
        start: 0,
        end: 19,
      }),
      frameRate: 15,
    });

    this.anims.create({
      key: 'littleOrc_walk',
      frames: this.anims.generateFrameNumbers('littleOrc', {
        start: 0,
        end: 19,
      }),
      frameRate: 15,
    });

    this.anims.create({
      key: 'littleOrc_die',
      frames: this.anims.generateFrameNumbers('littleOrc_die', {
        start: 0,
        end: 19,
      }),
      frameRate: 15,
    });

    this.anims.create({
      key: 'littleOrc_hurt',
      frames: this.anims.generateFrameNumbers('littleOrc_hurt', {
        start: 0,
        end: 19,
      }),
      frameRate: 15,
    });

    this.gate = this.add.sprite(this.gatePointX - 45, this.gatePointY, 'gate').setScale(0.35)
    this.gate.alpha = 0.5;

    for (let i = 0; i < 3; i++) {
      const way = this.map.createWay();
      const scorpio = new Scorpio(this, way, this.firstPointX, this.firstPointY).setScale(0.4);
      const wizardBlack = new WizardBlack(this, way, this.firstPointX, this.firstPointY).setScale(0.3);
      const littleOrc = new LittleOrc(this, way, this.firstPointX, this.firstPointY).setScale(0.3);

      wizardBlack.startFollow({ delay: 1000 * i, duration: wizardBlack.moveSpeed, rotateToPath: true });
      scorpio.startFollow({ delay: 2000 * i, duration: scorpio.moveSpeed, rotateToPath: true });
      littleOrc.startFollow({ delay: 4000 * i, duration: littleOrc.moveSpeed, rotateToPath: true });

      this.enemiesGroup.add(scorpio);
      this.enemiesGroup.add(wizardBlack);
      this.enemiesGroup.add(littleOrc);
    }

    // добавляем раные динамические статы на страницу
    this.gameObjStats = new GameObjStats(this);
    this.input.on('gameobjectdown', (pointer, gameObject, event) => { 
      this.gameObjStats.updateText(gameObject);
    });


    for(let i = 0; i < this.towers.length; i += 1) {
        this.towers[i].setEnemies(this.enemiesGroup);
        this.physics.add.overlap(this.enemiesGroup, this.towers[i].getMissiles(), this.towers[i].damageEnemy);
    }

  }

  update(time) {
    this.gate.rotation += 0.003;
    this.towers.forEach((tower: any) => {
        tower.update(time)
    })
    
  }
}
