import 'phaser';
import { map1 } from '../../constants/maps';
import { MapLevel } from '../map/MapLevel';
import Scorpio from '../unit/Scorpio';
import WizardBlack from "../unit/WizardBlack";
import LittleOrc from "../unit/LittleOrc";

import Tower from '../tower/Tower';
import { AUTO, GameObjects, NONE } from 'phaser';

// import { AUTO } from 'phaser';

import GameObjStats from '../interface/GameObjStats'
import Button from '../button/Button';
import WinModal from '../modal/WinModal';
import Gate from '../Gate';
import createAnims from '../unit/createAnims';
import State from '../../State';
import Enemy from '../unit/Enemy';


export default class GameScene extends Phaser.Scene {
  map: MapLevel;
  firstPointX: number;
  firstPointY: number;
  gatePointX: number;
  gatePointY: number;
  gate: Gate;
  gameObjStats: any;
  state: any;
  towers: Array<any>
  enemiesGroup: Phaser.GameObjects.Group;
  gold: number;
  playerLives: number;
  passedEnemies: GameObjects.Group[];

  constructor() {
    super('game-scene');
  }

  setScene(data) {
    this.state = new State(data.level, data.difficulty);
    this.state.saveToLocalStorage(this.registry.get("stats").data)
    this.map = new MapLevel(this, this.state.config.map);
    this.passedEnemies = [];
    this.firstPointX = this.map.getStartPointX();
    this.firstPointY = this.map.getStartPointY();
    this.gatePointX = this.map.getFinishPointX();
    this.gatePointY = this.map.getFinishPointY();
    // console.log(this.state);
    this.gold = this.state.config.startingGold;
    this.setPlayersLives();
    console.log(this.playerLives);
    // this.playerLives 
    // console.log(this.gold);

    this.setLevelStateText();
  }

  setPlayersLives() {
    switch (this.state.difficulty) {
      case 1:
        this.playerLives = 20;
        return;
      case 2:
        this.playerLives = 10;
        return;
      case 3:
        this.playerLives = 1;
        return;
      default:
        this.playerLives = 20;
        return;
    }
  }

  onEnemyCrossing(enemy) {
    if (!this.passedEnemies.includes(enemy)) {
      this.passedEnemies.push(enemy);
      this.playerLives -= 1;
      if (this.playerLives <= 0) {
        this.defeat()
      }
    }
  }

  setLevelStateText() {

  }

  defeat() {
    this.updateGameStatsInLocalStorage("lose");

    this.scene.pause();
    this.scene.moveAbove('game-scene', 'lose-scene');
    this.scene.launch('lose-scene');
    // TODO нужно зарезолвить промис
    // await this.state.sendDataToBackend()
  }

  win() {
    this.updateGameStatsInLocalStorage("win");
    this.scene.pause();
    this.scene.moveAbove('game-scene', 'win-scene');
    this.scene.launch('win-scene');
    // TODO нужно зарезолвить промис
    // await this.state.sendDataToBackend()
  }

  calculateLevelStars() {
    const playerLivesPercent = this.playerLives * 100 / 20;
    if (playerLivesPercent == 100) {
      return 3;
    } else if (playerLivesPercent >= 50) {
      return 2;
    }
    return 1;
  }

  updateGameStatsInLocalStorage(result = "playing") {
    this.state.updateCurrentGameStats({ 
      levelResult: result, 
      levelProgress: result == 'win' ? this.calculateLevelStars() : 0, 
      builtTowers: 0,  // сюда должно передаваться кол-во построенных башен 
      soldTowers: 0,  // сюда должно передаваться кол-во проданных башен
      killedEnemies: 0,  // сюда должно передаваться кол-во убитых врагов
    })
    this.state.saveToLocalStorage();
  }

  create(data: any): void {
    this.setScene(data);
    this.map.create();
    this.towers = this.map.addTowers();
    this.enemiesGroup = this.physics.add.group();
    createAnims(this);
    this.createGate();

    let enemies: Enemy[] = [];

    for (let i = 0; i < 20; i++) {
      const way = this.map.createWay();
      const scorpio = new Scorpio(this, way, this.firstPointX, this.firstPointY).setScale(0.75);
      const wizardBlack = new WizardBlack(this, way, this.firstPointX, this.firstPointY).setScale(0.3);
      const littleOrc = new LittleOrc(this, way, this.firstPointX, this.firstPointY).setScale(0.25);

      wizardBlack.startFollow({ delay: 1000 * i, duration: wizardBlack.moveSpeed, rotateToPath: true });
      scorpio.startFollow({ delay: 2000 * i, duration: scorpio.moveSpeed, rotateToPath: true });
      littleOrc.startFollow({ delay: 4000 * i, duration: littleOrc.moveSpeed, rotateToPath: true });

      // enemies.push(scorpio, wizardBlack, littleOrc)
      this.physics.add.existing(scorpio);
      this.physics.add.existing(wizardBlack);
      this.physics.add.existing(littleOrc);
      this.physics.add.overlap(scorpio, this.gate, this.onEnemyCrossing, undefined, this);
      this.physics.add.overlap(wizardBlack, this.gate, this.onEnemyCrossing, undefined, this);
      this.physics.add.overlap(littleOrc, this.gate, this.onEnemyCrossing, undefined, this);

      this.enemiesGroup.add(scorpio);
      this.enemiesGroup.add(wizardBlack);
      this.enemiesGroup.add(littleOrc);
    }

    // добавляем динамические статы на страницу
    this.gameObjStats = new GameObjStats(this);
    this.input.on('gameobjectdown', (pointer, gameObject, event) => {
      this.gameObjStats.updateText(gameObject);
    });

    // переделать координаты с хардкода на динамические
    const sceneCenter = [this.cameras.main.centerX, this.cameras.main.centerY];

    const pauseButton = new Button(this, 0, 0, 'pause-btn')
    const pauseBtnCoordinates = [
      sceneCenter[0] * 2 - pauseButton.width / 2,
      pauseButton.height / 2,
    ]
    pauseButton.setPosition(pauseBtnCoordinates[0], pauseBtnCoordinates[1])
    pauseButton.setInteractive().on('pointerup', () => {
      this.scene.pause();
      this.scene.moveAbove('game-scene', 'pause-scene');
      this.scene.run('pause-scene');
      
    });

    const loseBtn = new Button(this, pauseBtnCoordinates[0] * 0.9, pauseBtnCoordinates[1], 'pause-btn');
    loseBtn.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      if (this.scene.isPaused()) return;
      this.defeat();
    });

    const winBtn = new Button(this, pauseBtnCoordinates[0] * 0.8, pauseBtnCoordinates[1], 'pause-btn');
    winBtn.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      if (this.scene.isPaused()) return;
      this.win()
    });

    // устанавливает взаимодействие пуль и мобов
    for (let i = 0; i < this.towers.length; i += 1) {
      this.towers[i].setEnemies(this.enemiesGroup);
      this.physics.add.overlap(this.enemiesGroup, this.towers[i].getMissiles(), this.towers[i].fire());
    }
    const gateGroup = this.physics.add.existing(this.gate);
  }

  createGate() {
    this.gate = new Gate(this, this.gatePointX - 55, this.gatePointY, 'gate').setScale(0.5);
    this.gate.alpha = 0.6;
  }

  update(time) {
    this.gate.rotation += 0.003;
    this.towers.forEach((tower: any) => {
      tower.update(time)
    })
  }
}
