import 'phaser';
import { MapLevel } from '../map/MapLevel';
import EnemyFactory from '../unit/EnemyFactory';
import { levelsConfig } from '../../constants/constants'

import Tower from '../tower/Tower';
import { AUTO, GameObjects, NONE } from 'phaser';


import GameObjStats from '../interface/GameObjStats'
import Button from '../button/Button';
// import WinModal from '../modal/WinModal';
import Gate from '../Gate';
import createAnims from '../unit/createAnims';
import State from '../../State';


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
  isDefeat: boolean;
  enemiesProducedCounter: number;
  deathCounter: number;

  constructor() {
    super('game-scene');
  }

  setScene(data) {
    this.state = new State(data.level, data.difficulty);
    this.state.saveToLocalStorage(this.registry.get("stats").data);
    
    this.map = new MapLevel(this, this.state.config.map);
    this.passedEnemies = [];
    this.firstPointX = this.map.getStartPointX();
    this.firstPointY = this.map.getStartPointY();
    this.gatePointX = this.map.getFinishPointX();
    this.gatePointY = this.map.getFinishPointY();

    this.isDefeat = false;
    this.deathCounter = 0;
    this.gold = this.state.config.startingGold;
    this.setPlayersLives();
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
      // this.passedEnemies - количество врагов, прошедших через ворота
      this.playerLives -= 1;
      if(this.gameObjStats.gameObject === enemy) {
        this.gameObjStats.slideOut()
        this.gameObjStats.gameObject = null
      }
      setTimeout(() => {
        enemy.destroy();
      }, 3000);
      if (this.playerLives <= 0) {
        this.defeat()
      }
    }
  }

  defeat() {
    this.isDefeat = true;
    this.updateGameStatsInLocalStorage("lose");

    this.scene.pause();
    this.scene.moveAbove('game-scene', 'lose-scene');
    this.scene.launch('lose-scene');
  }

  win() {
    this.updateGameStatsInLocalStorage("win");
    this.scene.pause();
    this.scene.moveAbove('game-scene', 'win-scene');
    this.scene.launch('win-scene', { starsNumber: this.calculateLevelStars()});
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
      builtTowers: this.scene.scene.registry.list["builtCounter"], 
      soldTowers: this.scene.scene.registry.list["soldCounter"], 
      killedEnemies: this.scene.scene.registry.list["deathCounter"],
    })
    this.state.saveToLocalStorage();
  }

  produceWaveEnemies(factory: EnemyFactory, currentWave: number): number {
    let enemiesProduced: number = 0;
    let currentWaveEnemies: {string, number} = levelsConfig[`level_${this.state.level}`].waves[`wave_${currentWave}`].enemies;
    for (const [enemyType, enemiesNumber] of Object.entries(currentWaveEnemies)) {
      for (let i = 0; i < enemiesNumber; i++) {
        const enemy = factory.create(enemyType, this.map.createWay());
        const delay = i*300;
        enemy.startFollow({ delay: delay, duration: enemy.moveSpeed, rotateToPath: true })
        this.physics.add.existing(enemy);
        this.physics.add.overlap(enemy, this.gate, this.onEnemyCrossing, undefined, this);
        this.enemiesGroup.add(enemy);
      }
      enemiesProduced += enemiesNumber;
    }
    return enemiesProduced;
  }



  createWinTimerChecker() {
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        if (this.scene.scene.registry.list["deathCounter"] === this.enemiesProducedCounter - this.passedEnemies.length) {
          this.win();
        }
      },
      loop: true,
      callbackScope: this,
    })
  }

  createWaveTimer(factory: EnemyFactory, wavesCount: number) {
    let currentWave = 1;
    this.time.addEvent({
      delay: 10000,
      callback: () => {
        currentWave += 1;
        if (currentWave <= wavesCount) {
          this.enemiesProducedCounter += this.produceWaveEnemies(factory, currentWave);
        }
        if (currentWave === wavesCount) {
          this.createWinTimerChecker();
        }
      },
      repeat: wavesCount - 1,
      callbackScope: this,
    })
  }

  create(data: any): void {
    this.scene.scene.registry.set("deathCounter", 0);
    this.scene.scene.registry.set("builtCounter", 0);
    this.scene.scene.registry.set("soldCounter", 0);
    this.setScene(data);
    this.map.create();
    this.towers = this.map.addTowers();
    this.enemiesGroup = this.physics.add.group();
    createAnims(this);
    this.createGate();
    
    const factory = new EnemyFactory(this, this.firstPointX, this.firstPointY);

    // запуск первой волны (надо сделать кнопку-триггер)
    this.enemiesProducedCounter = 0;
    this.enemiesProducedCounter += this.produceWaveEnemies(factory, 1);
    const wavesCount = Object.keys(levelsConfig[`level_${this.state.level}`].waves).length;
    // console.log(wavesCount);
    this.createWaveTimer(factory, wavesCount);

    // добавляем динамические статы на страницу
    this.gameObjStats = new GameObjStats(this);
    this.input.on('gameobjectdown', (pointer, gameObject, event) => {
      console.log('asdfsdf')
      this.gameObjStats.updateStats(gameObject);
    });

    const sceneCenter = [this.cameras.main.centerX, this.cameras.main.centerY];

    const pauseButton = new Button(this, 0, 0, 'pause-btn')
    const pauseBtnCoordinates = [
      sceneCenter[0] * 2 - pauseButton.width / 2,
      pauseButton.height / 2,
    ]
    pauseButton.setPosition(pauseBtnCoordinates[0], pauseBtnCoordinates[1])
    pauseButton.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      if (this.scene.isPaused()) return;
      this.scene.pause();
      this.scene.moveAbove('game-scene', 'pause-scene');
      this.scene.launch('pause-scene');
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
    this.towers.forEach((tower: Tower) => {
        tower.setEnemies(this.enemiesGroup);
        this.physics.add.overlap(this.enemiesGroup, tower.getMissiles(), tower.fire);
        
    })
    const gateGroup = this.physics.add.existing(this.gate);
  }

  createGate() {
    this.gate = new Gate(this, this.gatePointX - 55, this.gatePointY, 'gate').setScale(0.5);
    this.gate.alpha = 0.6;
  }

  update(time) {
    this.gate.rotation += 0.003;
    this.towers.forEach((tower: any) => {
      tower.update(time);
      tower.setGold(this.gold);
      this.gold = tower.getGold();
    })
    this.gameObjStats.update()
    console.log(this.gold)
  }
}