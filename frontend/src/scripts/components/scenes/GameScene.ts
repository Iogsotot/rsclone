import 'phaser';
import { MapLevel } from '../map/MapLevel';
import EnemyFactory from '../unit/EnemyFactory';
import { levelsConfig } from '../../constants/constants';
import sendDataToBackend from '../../achievements/utils/backend';

import Tower from '../tower/Tower';
import { AUTO, GameObjects, NONE } from 'phaser';


import GameObjStats from '../interface/GameObjStats'
import Button from '../button/Button';
import Gate from '../Gate';
import createAnims from '../unit/createAnims';
import GameStats from '../interface/GameStats';
import LevelSettings from '../../LevelSettings';
// import {
//   isGreatDefender,
//   isIronDefender,
//   isCompleteWin,
//   isFirstAsterisk,
// } from '../../constants/achievements';
import { PlayerStatsManager } from '../stats/PlayerStats';
import WaveButton from '../button/WaveButton';
import waveBtnConfigs from '../../constants/waveBtnConfigs';
// import Popup from '../events/achievements_popup';


export default class GameScene extends Phaser.Scene {
  map: MapLevel;
  firstPointX: number;
  firstPointY: number;
  gatePointX: number;
  gatePointY: number;
  pointX: number;
  pointY: number;
  gate: Gate;
  waveBtn: WaveButton;
  gameObjStats: any;
  levelSettings: any;
  towers: Array<any>
  enemiesGroup: Phaser.GameObjects.Group;
  gold: number;
  playerLives: number;
  passedEnemies: GameObjects.Group[];
  isDefeat: boolean;
  enemiesProducedCounter: number;
  deathCounter: number;
  gameStats: GameStats;
  // popup: Popup;

  constructor() {
    super('game-scene');
  }

  setScene(data) {
    this.levelSettings = new LevelSettings(data.level, data.gameDifficulty);
    this.map = new MapLevel(this, this.levelSettings.config.map);
    this.passedEnemies = [];
    this.firstPointX = this.map.getStartPointX();
    this.firstPointY = this.map.getStartPointY();
    this.gatePointX = this.map.getFinishPointX();
    this.gatePointY = this.map.getFinishPointY();

    this.isDefeat = false;
    this.gold = this.levelSettings.config.startingGold;
    this.playerLives = this.calculatePlayersLivesForDifficulty();
    this.gameStats.updateLives(this.playerLives)
    this.gameStats.updateGolds(this.gold)
  }

  calculatePlayersLivesForDifficulty() {
    switch (this.levelSettings.gameDifficulty) {
      case 1:
        return 20
      case 2:
        return 10
      case 3:
        return 1
      default:
        return 20
    }
  }

  onEnemyCrossing(enemy) {
    if (!this.passedEnemies.includes(enemy)) {
      this.passedEnemies.push(enemy);
      this.playerLives -= 1;
      this.gameStats.updateLives(this.playerLives)
      if (this.gameObjStats.gameObject === enemy) {
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
    this.updateGameStatsInLocalStorage('lose');

    this.scene.pause();
    this.scene.moveAbove('game-scene', 'lose-scene');
    this.scene.launch('lose-scene');
    sendDataToBackend();
  }

  win() {
    this.updateGameStatsInLocalStorage('win');
    // попапы не видно, надо другую сцену прокидывать?
    this.scene.pause();
    this.scene.moveAbove('game-scene', 'win-scene');
    this.scene.launch('win-scene', { starsNumber: this.calculateLevelStars() });

    sendDataToBackend();
  }

  calculateLevelStars() {
    const playerLivesPercent = this.playerLives * 100 / this.calculatePlayersLivesForDifficulty();
    if (playerLivesPercent == 100) {
      return 3;
    } else if (playerLivesPercent >= 50) {
      return 2;
    }
    return 1;
  }

  updateGameStatsInLocalStorage(result = 'playing') {
    const data = {
      level: this.levelSettings.level,
      levelResult: result,
    }
    if (this.levelSettings.gameDifficulty === 3) {
      data['ironModeProgress'] = result == 'win' ? this.calculateLevelStars() : 0;
      console.log(data['ironModeProgress'])
    } else {
      data['gameProgress'] = result == 'win' ? this.calculateLevelStars() : 0
    }
    const playerStatsManager = new PlayerStatsManager();
    playerStatsManager.saveToLocalStorage(data);
    // console.log('updateGameStatsInLocalStorage [data]:', data);
  }

  produceWaveEnemies(factory: EnemyFactory, currentWave: number): number {
    this.gameStats.updateWaves(currentWave);
    let enemiesProduced: number = 0;
    let currentWaveEnemies: { string, number } = levelsConfig[`level_${this.levelSettings.level}`].waves[`wave_${currentWave}`].enemies;
    for (const [enemyType, enemiesNumber] of Object.entries(currentWaveEnemies)) {
      for (let i = 0; i < enemiesNumber; i++) {
        const enemy = factory.create(enemyType, this.map.createWay());
        const delay = i * 300;
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
        if (this.scene.scene.registry.list['deathCounter'] === this.enemiesProducedCounter - this.passedEnemies.length) {
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

  startBattle() {
    const factory = new EnemyFactory(this, this.firstPointX, this.firstPointY);
    this.enemiesProducedCounter = 0;
    this.enemiesProducedCounter += this.produceWaveEnemies(factory, 1);
    const wavesCount = Object.keys(levelsConfig[`level_${this.levelSettings.level}`].waves).length;
    this.gameStats.updateWaves(1, wavesCount)
    this.createWaveTimer(factory, wavesCount);
  }

  createWaveBtn(data) {
    
    this.pointX = this.firstPointX + waveBtnConfigs[data.level].startPointX;
    this.pointY = this.firstPointY + waveBtnConfigs[data.level].startPointY;
    const path = new Phaser.Curves.Path();
    path.add(new Phaser.Curves.Line([
      this.pointX,
      this.pointY,
      this.pointX + waveBtnConfigs[data.level].endPointX,
      this.pointY + waveBtnConfigs[data.level].endPointY
    ]));
    this.waveBtn = this.add.follower(path, this.pointX, this.pointY, 'waveButton');

    // const graphics = this.add.graphics();
    // graphics.lineStyle(1, 0xffffff, 1);
    // path.draw(graphics);
    this.waveBtn.rotation -= waveBtnConfigs[data.level].rotation;
    this.waveBtn.startFollow({
      positionOnPath: true,
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: 'Ease',
    })
    this.waveBtn.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      if (this.scene.isPaused()) {
        return;
      }
      this.startBattle();
      this.scene.scene.tweens.add({
        targets: this.waveBtn,
        scale: 0,
        ease: 'Linear',
        duration: 300,
      });
      setTimeout(() => {
        this.waveBtn.destroy();
      }, 310);
      //звук начала волны
    });
  }

  create(data: any): void {
    this.cameras.main.fadeIn(750, 0, 0, 0);
    this.scene.scene.registry.set('deathCounter', 0);
    this.gameStats = new GameStats(this)
    this.setScene(data);
    this.map.create();
    this.towers = this.map.addTowers();
    this.enemiesGroup = this.physics.add.group();
    createAnims(this);
    this.createGate();
    this.createWaveBtn(data);

    // debug code
    // const testPopup = new Popup(this, 0, 0, 'achievementPopup');
    // testPopup.init('test');
    // testPopup.startAnimation();

    // добавляем динамические статы на страницу
    this.gameObjStats = new GameObjStats(this);
    this.input.on('gameobjectdown', (pointer, gameObject, event) => {
      this.gameObjStats.updateStats(gameObject);
    });

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
    this.towers.forEach((tower: Tower) => {
      tower.setEnemies(this.enemiesGroup);
    })
    
    const gateGroup = this.physics.add.existing(this.gate);
  }

  createGate() {
    this.gate = new Gate(this, this.gatePointX - 55, this.gatePointY, 'gate').setScale(0.5);
    this.gate.alpha = 0.6;
  }

  update(time) {
    this.gate.rotation += 0.003;
    this.towers.forEach((tower: Tower) => {
      tower.update(time);
      tower.setGold(this.gold);
      this.gold = tower.getGold();
    })
    this.gameStats.updateGolds(this.gold)
    this.gameObjStats.updateEnemyHp()
  }
}
