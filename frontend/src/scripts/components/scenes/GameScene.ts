import 'phaser';
import { MapLevel } from '../map/MapLevel';
import EnemyFactory from '../unit/EnemyFactory';
import { levelsConfig } from '../../constants/constants';
import sendDataToBackend from '../../achievements/utils/backend';

import Tower from '../tower/Tower';
import { GameObjects } from 'phaser';

import GameObjStats from '../interface/GameObjStats';
import Button from '../button/Button';
import Gate from '../Gate';
import createAnims from '../unit/createAnims';
import GameStats from '../interface/GameStats';
import LevelSettings from '../../LevelSettings';
import { PlayerStatsManager } from '../stats/PlayerStats';
import WaveButton from '../button/WaveButton';
import waveBtnConfigs from '../../constants/waveBtnConfigs';

export default class GameScene extends Phaser.Scene {
  map: MapLevel;

  firstPointX: number;

  firstPointY: number;

  gatePointX: number;

  gatePointY: number;

  pointX: number;

  pointY: number;

  gate: Gate;

  fakeGate: Gate;

  waveBtn: WaveButton;

  waveBtnClone: WaveButton;

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

  music:any

  sounds:any

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
    this.gameStats.updateLives(this.playerLives);
    this.gameStats.updateGolds(this.gold);
  }

  calculatePlayersLivesForDifficulty() {
    switch (this.levelSettings.gameDifficulty) {
      case 1:
        return 20;
      case 2:
        return 10;
      case 3:
        return 1;
      default:
        return 20;
    }
  }

  onEnemyCrossing(enemy) {
    if (!this.passedEnemies.includes(enemy)) {
      this.passedEnemies.push(enemy);
      this.playerLives -= 1;
      this.sounds.loseLife.play();
      this.gameStats.updateLives(this.playerLives);
      if (this.gameObjStats.gameObject === enemy) {
        this.gameObjStats.slideOut();
        this.gameObjStats.gameObject = null;
      }
      setTimeout(() => {
        // enemy.texture = this.renderer.setBlendMode;
        enemy.destroy();
      }, 3000);
      if (this.playerLives <= 0) {
        this.defeat();
      }
    }
  }

  defeat() {
    this.sound.stopAll();
    this.sounds.defeat.play();
    this.isDefeat = true;
    this.updateGameStatsInLocalStorage('lose');

    this.scene.pause();
    this.scene.moveAbove('game-scene', 'lose-scene');
    this.scene.launch('lose-scene');
    sendDataToBackend();
  }

  win() {
    this.sound.stopAll();
    this.sounds.win.play();
    this.updateGameStatsInLocalStorage('win');
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
    };
    if (this.levelSettings.gameDifficulty === 3) {
      data['ironModeProgress'] = result == 'win' ? this.calculateLevelStars() : 0;
      console.log(data['ironModeProgress']);
    } else {
      data['gameProgress'] = result == 'win' ? this.calculateLevelStars() : 0;
    }
    const playerStatsManager = new PlayerStatsManager();
    playerStatsManager.saveToLocalStorage(data);
  }

  produceWaveEnemies(factory: EnemyFactory, currentWave: number): number {
    this.gameStats.updateWaves(currentWave);
    let enemiesProduced: number = 0;
    let currentWaveEnemies: { string, number } = levelsConfig[`level_${this.levelSettings.level}`].waves[`wave_${currentWave}`].enemies;
    for (const [enemyType, enemiesNumber] of Object.entries(currentWaveEnemies)) {
      for (let i = 0; i < enemiesNumber; i++) {
        const enemy = factory.create(enemyType, this.map.createWay());
        const delay = i * 600;
        enemy.startFollow({ delay: delay, duration: enemy.moveSpeed, rotateToPath: true });
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
    });
  }

  createWaveTimer(factory: EnemyFactory, wavesCount: number) {
    let currentWave = 1;
    this.time.addEvent({
      delay: 20000,
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
    });
  }

  startBattle() {
    this.sound.stopAll();
    const factory = new EnemyFactory(this, this.firstPointX, this.firstPointY);
    this.enemiesProducedCounter = 0;
    this.enemiesProducedCounter += this.produceWaveEnemies(factory, 1);
    const wavesCount = Object.keys(levelsConfig[`level_${this.levelSettings.level}`].waves).length;
    this.gameStats.updateWaves(1, wavesCount);
    this.createWaveTimer(factory, wavesCount);
  }

  createWaveBtn(data) {
    this.pointY = this.firstPointY + waveBtnConfigs[data.level].startPointY;
    this.pointX = this.firstPointX + waveBtnConfigs[data.level].startPointX;
    const path = new Phaser.Curves.Path();
    path.add(new Phaser.Curves.Line([
      this.pointX,
      this.pointY,
      this.pointX + waveBtnConfigs[data.level].endPointX,
      this.pointY + waveBtnConfigs[data.level].endPointY,
    ]));
    this.waveBtn = this.add.follower(path, this.pointX, this.pointY, 'waveButton');
    if (data.level === 2) {
      this.waveBtnClone = this.add.follower(path, this.pointX - 90, this.pointY - 900, 'waveButton');
      this.waveBtnClone.startFollow({
        positionOnPath: false,
        duration: 500,
        yoyo: true,
        repeat: -1,
        ease: 'Ease',
      });
      this.waveBtnClone.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
        if (this.scene.isPaused()) {
          return;
        }
        this.startBattle();
        this.scene.scene.tweens.add({
          targets: [this.waveBtn, this.waveBtnClone],
          scale: 0,
          ease: 'Linear',
          duration: 300,
        });
        setTimeout(() => {
          this.waveBtn.destroy();
          this.waveBtnClone.destroy();
        }, 310);
        this.sounds.startBattle.play();
        // this.sound.play('level-1-attack', { loop: true });
        this.music.levelAttack.play();
      });
    }

    this.waveBtn.rotation -= waveBtnConfigs[data.level].rotation;
    this.waveBtn.startFollow({
      positionOnPath: true,
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: 'Ease',
    });
    this.waveBtn.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      if (this.scene.isPaused()) {
        return;
      }
      this.startBattle();
      if (this.waveBtnClone) {
        this.scene.scene.tweens.add({
          targets: this.waveBtnClone,
          scale: 0,
          ease: 'Linear',
          duration: 300,
        });
        setTimeout(() => {
          this.waveBtnClone.destroy();
        }, 310);
      }

      this.scene.scene.tweens.add({
        targets: this.waveBtn,
        scale: 0,
        ease: 'Linear',
        duration: 300,
      });
      setTimeout(() => {
        this.waveBtn.destroy();
      }, 310);
      this.sounds.startBattle.play();
      this.music.levelAttack.play();
    });
    // hot key для начала волны
    this.input.keyboard.on('keyup-N', (event) => {
      if (this.scene.isPaused()) {
        return;
      }
      this.startBattle();
      if (this.waveBtnClone) {
        this.scene.scene.tweens.add({
          targets: this.waveBtnClone,
          scale: 0,
          ease: 'Linear',
          duration: 300,
        });
        setTimeout(() => {
          this.waveBtnClone.destroy();
        }, 310);
      }

      this.scene.scene.tweens.add({
        targets: this.waveBtn,
        scale: 0,
        ease: 'Linear',
        duration: 300,
      });
      setTimeout(() => {
        this.waveBtn.destroy();
      }, 310);
      this.sounds.startBattle.play();
      this.music.levelAttack.play();
    });
  }

  soundsManager() {
    this.sound.stopByKey('main-theme');

    this.music = {
      levelTheme: this.sound.add('level-1', { loop: true }),
      levelAttack: this.sound.add('level-1-attack', { loop: true }),
    };
    this.sounds = {
      defeat: this.sound.add('defeat'),
      win: this.sound.add('win'),
      loseLife: this.sound.add('lose-life'),
      startBattle: this.sound.add('start-battle'),
      wizardBlackDie: this.sound.add('wizardBlack-die'),
      littleOrcDie: this.sound.add('littleOrc-die'),
      scorpioDie: this.sound.add('scorpio-die'),
      levendorDie: this.sound.add('levendor-die'),
      towerChoice: this.sound.add('tower-choice'),
      towerSell: this.sound.add('tower-sell'),
      towerBuilding: this.sound.add('tower-building'),
      missileArrow: this.sound.add('missile-arrow'),
      missileMagic: this.sound.add('missile-magic'),
      missileBomb: this.sound.add('missile-bomb'),
    };

    this.music.levelTheme.play();
  }

  create(data: any): void {
    this.soundsManager();
    this.cameras.main.fadeIn(750, 0, 0, 0);
    this.scene.scene.registry.set('deathCounter', 0);
    this.gameStats = new GameStats(this);
    this.setScene(data);
    this.map.create();
    this.towers = this.map.addTowers();
    this.enemiesGroup = this.physics.add.group();
    createAnims(this);
    this.createGate();
    this.createWaveBtn(data);

    // добавляем динамические статы на страницу
    this.gameObjStats = new GameObjStats(this);
    this.input.on('gameobjectdown', (pointer, gameObject, event) => {
      this.gameObjStats.updateStats(gameObject);
    });

    const sceneCenter = [this.cameras.main.centerX, this.cameras.main.centerY];

    const pauseButton = new Button(this, 0, 0, 'pause-btn');
    const pauseBtnCoordinates = [
      sceneCenter[0] * 2 - pauseButton.width / 2,
      pauseButton.height / 2,
    ];
    pauseButton.setPosition(pauseBtnCoordinates[0], pauseBtnCoordinates[1]);
    pauseButton.setInteractive().on('pointerup', () => {
      this.sound.pauseAll();
      this.scene.pause();
      this.scene.moveAbove('game-scene', 'pause-scene');
      this.scene.run('pause-scene');
    });

    this.input.keyboard.on('keydown-SPACE', (event) => {
      if(event.ctrlKey) {
        this.sound.pauseAll();
        this.scene.pause();
        this.scene.moveAbove('game-scene', 'pause-scene');
        this.scene.run('pause-scene');
      }
    });

    // const loseBtn = new Button(this, pauseBtnCoordinates[0] * 0.9, pauseBtnCoordinates[1], 'pause-btn');
    // loseBtn.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
    //   if (this.scene.isPaused()) return;
    //   this.defeat();
    // });

    // const winBtn = new Button(this, pauseBtnCoordinates[0] * 0.8, pauseBtnCoordinates[1], 'pause-btn');
    // winBtn.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
    //   if (this.scene.isPaused()) return;
    //   this.win()
    // });

    // устанавливает взаимодействие пуль и мобов
    this.towers.forEach((tower: Tower) => {
      tower.setEnemies(this.enemiesGroup);
    });

    const gateGroup = this.physics.add.existing(this.gate);
  }

  createGate() {
    this.gate = new Gate(this, this.gatePointX + 60, this.gatePointY + 60, 'gate').setScale(0.5);
    this.fakeGate = new Gate(this, this.gatePointX - 55, this.gatePointY, 'gate').setScale(0.5);
    this.fakeGate.alpha = 0.6;
    this.gate.alpha = 0;
  }

  update(time) {
    this.fakeGate.rotation += 0.003;
    this.towers.forEach((tower: Tower) => {
      tower.update(time);
      tower.setGold(this.gold);
      this.gold = tower.getGold();
    });
    this.gameStats.updateGolds(this.gold);
    this.gameObjStats.updateEnemyHp();
  }
}
