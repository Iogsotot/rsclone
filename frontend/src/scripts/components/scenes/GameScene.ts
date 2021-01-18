import 'phaser';
import { map1 } from '../../constants/maps';
import { MapLevel } from '../map/MapLevel';
import Scorpio from '../unit/Scorpio';
import WizardBlack from "../unit/WizardBlack";
import LittleOrc  from "../unit/LittleOrc";
import Tower from '../tower/Tower';
import { AUTO, GameObjects } from 'phaser';
import GameObjStats from '../interface/GameObjStats'
import Button from '../button/Button';
import VictoryModal from '../modal/VictoryModal';
import Gate from '../Gate';
import createAnims from '../unit/createAnims';
import State from '../../State';
import Enemy from '../unit/Enemy';

export default class GameScene extends Phaser.Scene {
  map: MapLevel;
  points: Array<any>;
  firstPointX: number;
  firstPointY: number;
  gatePointX: number;
  gatePointY: number;
  gate: Gate;
  // gate2: Phaser.GameObjects.Sprite;
  gameObjStats: any;
  state: any;
  enemiesGroup: Phaser.GameObjects.Group;

  constructor() {
    super('game-scene');
  }

  setScene(data) {
    this.state = new State(data.level, data.difficulty);
    this.map = new MapLevel(this, this.state.config.map);
    this.firstPointX = this.map.getStartPointX();
    this.firstPointY = this.map.getStartPointY();
    this.gatePointX = this.map.getFinishPointX();
    this.gatePointY = this.map.getFinishPointY();
    // console.log(this.state);
  }

  create(data: any): void {
    this.setScene(data);
    this.map.create();
    this.map.addTowers();
    createAnims(this);
    this.createGate();

    let enemies: Enemy[] = [];

    for (let i = 0; i < 3; i++) {
      const way = this.map.createWay();
      const scorpio = new Scorpio(this, way, this.firstPointX, this.firstPointY).setScale(0.75);
      const wizardBlack = new WizardBlack(this, way, this.firstPointX, this.firstPointY).setScale(0.3);
      const littleOrc = new LittleOrc(this, way, this.firstPointX, this.firstPointY).setScale(0.25);

      wizardBlack.startFollow({ delay: 1000 * i, duration: wizardBlack.moveSpeed, rotateToPath: true })
      scorpio.startFollow({ delay: 2000 * i, duration: scorpio.moveSpeed, rotateToPath: true });
      littleOrc.startFollow({ delay: 4000 * i, duration: littleOrc.moveSpeed, rotateToPath: true });
      // enemies.push(scorpio, wizardBlack, littleOrc)
      this.physics.add.existing(scorpio);
      this.physics.add.existing(wizardBlack);
      this.physics.add.existing(littleOrc);
      this.physics.add.overlap(scorpio, this.gate, this.gate.onEnemyCrossing);
      this.physics.add.overlap(wizardBlack, this.gate, this.gate.onEnemyCrossing);
      this.physics.add.overlap(littleOrc, this.gate, this.gate.onEnemyCrossing);
    }

    // добавляем динамические статы на страницу
    this.gameObjStats = new GameObjStats(this);
    this.input.on('gameobjectdown', (pointer, gameObject, event) => { 
      this.gameObjStats.updateText(gameObject);
    });

    // переделать координаты с хардкода на динамические
    const settingButton = new Button(this, 1990, 50, 'settings-btn');
    settingButton.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      if (this.scene.isPaused()) return;
      this.scene.pause();
      this.scene.moveAbove('game-scene', 'pause-scene');
      this.scene.launch('pause-scene');
    });

    const loseBtn = new Button(this, 1890, 50, 'settings-btn');
    loseBtn.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      if (this.scene.isPaused()) return;
      this.scene.pause();
      this.scene.moveAbove('game-scene', 'lose-scene');
      this.scene.launch('lose-scene');
    });

    const victoryBtn = new Button(this, 1790, 50, 'settings-btn');
    victoryBtn.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      if (this.scene.isPaused()) return;
      const victoryModal = new VictoryModal(this, 2, 'modal-bg', 'title-bg');
      this.scene.pause();
      victoryModal.startNewBtn
        .setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
          this.scene.start('game-scene');
        });
    });

    const gateGroup = this.physics.add.existing(this.gate);

    // console.log(this.physics.add.overlap);
    // this.physics.add.overlap(this.gate, this.enemiesGroup, this.loseEvent, undefined, this);
    // this.physics.add.overlap(this.enemiesGroup, this.gate, this.loseEvent);
    // console.log(this.gate, this.enemiesGroup, this.loseEvent());
    // this.physics.add.overlap(this.gate, this.enemiesGroup, this.gate.onEnemyCrossing);
    // Array(this.enemiesGroup).forEach(enemy => {
    //     this.physics.add.overlap(this.gate, enemy, this.gate.onEnemyCrossing, undefined, enemy);
    // });
  }

  // loseEvent(): void { 
  //   return console.log('lose');
  // }

  createGate() {
    this.gate = new Gate(this, this.gatePointX - 55, this.gatePointY, 'gate').setScale(0.5);
    // console.log(this.gate);
    this.gate.alpha = 0.6;
  }

  update() {
    this.gate.rotation += 0.003;
  }
}