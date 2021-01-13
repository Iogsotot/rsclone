import 'phaser'
import { map1 } from '../../constants/maps';
import { MapLevel1 } from '../map/MapLevel_1';
import Scorpio from '../unit/Scorpio';
import Mummy from '../unit/Mummy';
import Tower from '../tower/Tower';
import Button from "../button/Button";

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

    this.load.image('settings-btn', './assets/interface/settings-icon.png')
  }

  create(): void {
    this.map.create();

    this.tower = new Tower(this, 'tower')
    this.towers = this.add.group({ classType: Tower, runChildUpdate: true });
    this.input.on('pointerdown', () => this.map.placeTower(event, this.towers));
    
    const button = new Button(this, 1230, 50, 'settings-btn')
    button.setInteractive()
			.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
        if (this.scene.isPaused()) return
        this.scene.pause()
        this.scene.moveAbove('game-scene', 'pause-scene')
        this.scene.launch('pause-scene');
      })

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
      defaultEnemy.startFollow({ delay: 1000 * i, duration: defaultEnemy.moveSpeed, rotateToPath: true });
      
    }
  }   

  update() {
  }

}

