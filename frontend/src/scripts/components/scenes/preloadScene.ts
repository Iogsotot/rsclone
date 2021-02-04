import { map1, map2, map3 } from '../../constants/maps';
import langConfig from '../../layouts/langConfig'

interface BarConfigs {
  containerCoordinates: number[],
  containerSizes: number[],
  containerBorderRadius: number,
  barCoordinates: number[],
  barSizes: number[],
  barBorderRadius: number,
}
export default class PreloadScene extends Phaser.Scene {
  barContainer: Phaser.GameObjects.Graphics

  progressBar: Phaser.GameObjects.Graphics

  loaderText: Phaser.GameObjects.Text

  constructor() {
    super({ key: 'PreloadScene' });
  }

  async preload() {
    this.load.image('kingdom-rush-bg', './assets/auth/kingdom-rush.png');

    this.barContainer = this.add.graphics();
    this.progressBar = this.add.graphics();
    this.preloader()

    // towers

    this.load.spritesheet('circle', './assets/towers/circle.png', {
      frameWidth: 200,
      frameHeight: 200,
    });

    this.load.spritesheet('sale', './assets/towers/sale.png', {
      frameWidth: 55,
      frameHeight: 55,
    });

    this.load.spritesheet('arrow', './assets/towers/arrow.png', {
      frameWidth: 75,
      frameHeight: 75,
    });

    this.load.spritesheet('bomb', './assets/towers/bomb.png', {
      frameWidth: 75,
      frameHeight: 75,
    });

    this.load.spritesheet('magic', './assets/towers/magic.png', {
      frameWidth: 75,
      frameHeight: 75,
    });

    this.load.spritesheet('close_tower_button', './assets/towers/close_button_tower.png', {
      frameWidth: 75,
      frameHeight: 75,
    });

    this.load.spritesheet('tower', './assets/towers/tower.png', {
      frameWidth: 120,
      frameHeight: 80,
    });

    this.load.spritesheet('missile-arrow', './assets/towers/missile-arrow.png', {
      frameWidth: 30,
      frameHeight: 10,
    });

    this.load.spritesheet('missile-magic', './assets/towers/missile-magic.png', {
      frameWidth: 30,
      frameHeight: 30,
    });

    this.load.spritesheet('missile-bomb', './assets/towers/missile-bomb.png', {
      frameWidth: 30,
      frameHeight: 30,
    });

    //enemies
    this.load.spritesheet('scorpio', './assets/sprites/scorpio_walk.png', {
      frameWidth: 212,
      frameHeight: 246,
    });

    this.load.spritesheet('scorpio_die', './assets/sprites/scorpio_die.png', {
      frameWidth: 212,
      frameHeight: 246,
    });

    this.load.spritesheet('scorpio_hurt', './assets/sprites/scorpio_hurt.png', {
      frameWidth: 212,
      frameHeight: 246,
    });

    this.load.spritesheet('wizardBlack', './assets/sprites/wizard-black_walk.png', {
      frameWidth: 388,
      frameHeight: 338,
    });

    this.load.spritesheet('wizardBlack_die', './assets/sprites/wizard-black_die.png', {
      frameWidth: 388,
      frameHeight: 338,
    });

    this.load.spritesheet('wizardBlack_hurt', './assets/sprites/wizard-black_hurt.png', {
      frameWidth: 388,
      frameHeight: 338,
    });

    this.load.spritesheet('littleOrc', './assets/sprites/little-orc_walk.png', {
      frameWidth: 331,
      frameHeight: 299,
    });

    this.load.spritesheet('littleOrc_die', './assets/sprites/little-orc_die.png', {
      frameWidth: 331,
      frameHeight: 299,
    });

    this.load.spritesheet('littleOrc_hurt', './assets/sprites/little-orc_hurt.png', {
      frameWidth: 331,
      frameHeight: 299,
    });

    this.load.spritesheet('levendor', './assets/sprites/levendor_walk.png', {
      frameWidth: 294,
      frameHeight: 275,
    });

    this.load.spritesheet('levendor_die', './assets/sprites/levendor_die.png', {
      frameWidth: 304,
      frameHeight: 285,
    });

    this.load.spritesheet('levendor_hurt', './assets/sprites/levendor_hurt.png', {
      frameWidth: 304,
      frameHeight: 285,
    });

    //other
    this.load.spritesheet('gate', './assets/imgs/gate-mini.png', {
      frameWidth: 300,
      frameHeight: 300,
    });
    this.load.image('map_1', map1.url);
    this.load.image('map_2', map2.url);
    this.load.image('map_3', map3.url);
    this.load.image('level1Button', './assets/interface/icon_level_1.png');
    this.load.image('level2Button', './assets/interface/icon_level_2.png');
    this.load.image('level3Button', './assets/interface/icon_level_3.png');
    this.load.image('levelsMap', './assets/main-bg.jpg');
    this.load.spritesheet('waveButton', './assets/icons/wave_button.png', {
      frameWidth: 168,
      frameHeight: 108,
    });


    // header
    this.load.image('header-bg', './assets/modal-headers/header.png');
    // star rewards
    this.load.image('star-grey', './assets/interface/star-grey.png');
    this.load.image('star-1', './assets/interface/star-1.png');
    this.load.image('star-2', './assets/interface/star-2.png');
    this.load.image('star-3', './assets/interface/star-3.png');
    // modal backgrounds
    this.load.image('start-modal-bg', './assets/modal-bg/start-modal-bg.png');
    this.load.image('settings-modal-bg', './assets/modal-bg/settings-modal-bg.png');
    this.load.image('audio-set-bg', './assets/modal-bg/audio-set-bg.png');
    this.load.image('table', './assets/modal-bg/table.png');
    this.load.image('fail-bg', './assets/modal-bg/fail-bg.png');
    this.load.image('win-bg', './assets/modal-bg/win-bg.png');
    this.load.image('hotkeys-modal', './assets/modal-bg/hotkeys-modal.png');
    // ropes
    this.load.image('rope-small', './assets/interface/rope_small.png');
    this.load.image('rope-big', './assets/interface/rope_big.png');
    // buttons
    this.load.image('modal-close-btn', './assets/interface/button_close.png');
    this.load.image('button-start', './assets/interface/button_start.png');
    this.load.image('button-menu', './assets/interface/button_menu.png');
    this.load.image('button-restart', './assets/interface/button_restart.png');
    this.load.image('button-right', './assets/interface/button_right.png');
    this.load.image('button-left', './assets/interface/button_left.png');
    this.load.image('pause-btn', './assets/interface/button_pause.png');
    this.load.image('help-btn', './assets/interface/help.png');
    // icons    
    this.load.image('armor-icon', './assets/icons/armor.png');
    this.load.image('arrow-icon', './assets/icons/arrows.png');
    this.load.image('bomb-icon', './assets/icons/bomb.png');
    this.load.image('damage-icon', './assets/icons/damage.png');
    this.load.image('heart-icon', './assets/icons/heart.png');
    this.load.image('magic-icon', './assets/icons/magic.png');
    this.load.image('shoes-icon', './assets/icons/shoes.png');
    this.load.image('hour-glass-icon', './assets/icons/hour-glass.png');
    this.load.image('target-icon', './assets/icons/target.png');
    this.load.image('coins-icon', './assets/icons/coins.png');
    this.load.image('wave-icon', './assets/icons/skull.png');
    this.load.image('easy-btn-bg', './assets/interface/easy-btn-bg.png');
    this.load.image('normal-btn-bg', './assets/interface/normal-btn-bg.png');
    this.load.image('hard-btn-bg', './assets/interface/hard-btn-bg.png');
    this.load.image('plus', './assets/interface/button_plus.png');
    this.load.image('minus', './assets/interface/button_minus.png');
    this.load.image('on', './assets/sign/onNoText.png');
    this.load.image('off', './assets/sign/offNoText.png');

    //ahievements icons
    this.load.spritesheet('icon-builder', './assets/achievements/builder.png', {
      frameWidth: 176,
      frameHeight: 176,
    });
    this.load.spritesheet('icon-complete_win', './assets/achievements/complete_win.png', {
      frameWidth: 175,
      frameHeight: 176,
    });
    this.load.spritesheet('icon-first_asterisk', './assets/achievements/first_asterisk.png', {
      frameWidth: 175,
      frameHeight: 176,
    });
    this.load.spritesheet('icon-first_blood', './assets/achievements/first_blood.png', {
      frameWidth: 175,
      frameHeight: 176,
    });
    this.load.spritesheet('icon-great_defender', './assets/achievements/great_defender.png', {
      frameWidth: 175,
      frameHeight: 176,
    });
    this.load.spritesheet('icon-iron_defender', './assets/achievements/iron_defender.png', {
      frameWidth: 175,
      frameHeight: 176,
    });
    this.load.spritesheet('icon-killer', './assets/achievements/killer.png', {
      frameWidth: 175,
      frameHeight: 176,
    });
    this.load.spritesheet('icon-seller', './assets/achievements/seller.png', {
      frameWidth: 176,
      frameHeight: 176,
    });
    this.load.spritesheet('achievementPopup', './assets/achievements/achievement_popup_3.png', {
      frameWidth: 617,
      frameHeight: 256,
    });

    this.load.image('slider-bar-bg', './assets/interface/slider-bar-bg.png');

    //sounds
    this.load.audio('main-theme', './assets/sounds/themes/Main_Theme.mp3');
    this.load.audio('level-1', './assets/sounds/themes/level_1.mp3');
    this.load.audio('level-1-attack', './assets/sounds/themes/Level_Under_Attack.mp3');
    this.load.audio('start-battle', './assets/sounds/waveIncoming.wav');
    this.load.audio('win', './assets/sounds/levelCompleted.wav');
    this.load.audio('defeat', './assets/sounds/levelFailed.wav');
    this.load.audio('lose-life', './assets/sounds/loseLife.wav');

    this.load.audio('wizardBlack-die', './assets/sounds/enemy_wizard_die.wav');
    this.load.audio('littleOrc-die', './assets/sounds/enemy_orc_die.wav');
    this.load.audio('scorpio-die', './assets/sounds/enemy_scorpio_die.wav');
    this.load.audio('levendor-die', './assets/sounds/enemy_levendor_die.wav');

    this.load.audio('tower-sell', './assets/sounds/tower_sell.wav');
    this.load.audio('tower-building', './assets/sounds/tower_building.wav');
    this.load.audio('tower-choice', './assets/sounds/GUI_MouseOverTowerIcon.wav');
    this.load.audio('missile-arrow', './assets/sounds/tower_arrow_attack.wav');
    this.load.audio('missile-bomb', './assets/sounds/tower_bomb_attack.wav');
    this.load.audio('missile-magic', './assets/sounds/tower_wizard_attack.wav');

    this.load.audio('achievement-unlock', './assets/sounds/achievement_unlock.wav');
  }

  create() {
    this.add.text(20, 20, 'Loading game...', { fontFamily: 'Dimbo' });
    this.scene.start('LevelsScene');
    // this.scene.start('game-scene', {  level: 1, difficulty: 1 });
  }

  preloader() {
    const containerCoordinates = [this.cameras.main.centerX / 4, this.cameras.main.centerY * 1.7]
    const barCoordinates = [containerCoordinates[0] + 10, containerCoordinates[1] + 10]
    const containerSizes = [this.cameras.main.centerX * 1.5, 60]
    const barSizes = [containerSizes[0] - 20, containerSizes[1] - 20]
    // чтобы каждый раз не считать ...
    const barConfig: BarConfigs = {
      containerCoordinates,
      containerSizes,
      containerBorderRadius: containerSizes[1] / 2,
      barCoordinates,
      barSizes,
      barBorderRadius: barSizes[1] / 2,
    }

    const loading = langConfig[`${window['lang']}`].loading
    this.loaderText = this.add.text(
      this.cameras.main.centerX,
      containerCoordinates[1] - containerSizes[1],
      `${loading} 0%`,
      { fontFamily: 'Dimbo', fontSize: '100px', color: '#42250F' },
    ).setOrigin(0.5)
    this.add.existing(this.loaderText)

    // border 0x593517 bg 0x42250F
    this.barContainer.fillStyle(0x42250F)
    this.barContainer.fillRoundedRect(
      barConfig.containerCoordinates[0],
      barConfig.containerCoordinates[1],
      barConfig.containerSizes[0],
      barConfig.containerSizes[1],
      barConfig.containerBorderRadius,
    )

    this.barContainer.lineStyle(10, 0x593517)
    this.barContainer.strokeRoundedRect(
      barConfig.containerCoordinates[0],
      barConfig.containerCoordinates[1],
      barConfig.containerSizes[0],
      barConfig.containerSizes[1],
      barConfig.containerBorderRadius,
    )

    this.load.on('filecomplete-image-kingdom-rush-bg', () => {
      const bg = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'kingdom-rush-bg')
      bg.displayHeight = +this.sys.game.config.height
      bg.scaleX = bg.scaleY
      bg.depth = -10
    });

    this.load.on('progress', (value: number) => this.drawProgressBar(barConfig, value));
  }

  drawProgressBar(barConfig: BarConfigs, value: number) {
    const yellowLight = 0xf4d133
    const yellowDark = 0xde9b26
    const redLight = 0xe65540
    const redDark = 0xc63f31

    const coefficient = value < 0.03 ? 0.03 : value
    let color = coefficient > 0.85 ? redLight : yellowLight;
    this.progressBar.clear()
    this.progressBar.fillStyle(color)
    this.progressBar.fillRoundedRect(
      barConfig.barCoordinates[0],
      barConfig.barCoordinates[1],
      barConfig.barSizes[0] * coefficient,
      barConfig.barSizes[1],
      barConfig.barBorderRadius,
    )

    color = coefficient > 0.85 ? redDark : yellowDark;
    this.progressBar.fillStyle(color)
    this.progressBar.fillRoundedRect(
      barConfig.barCoordinates[0],
      barConfig.barCoordinates[1] + 20,
      barConfig.barSizes[0] * coefficient,
      barConfig.barSizes[1] / 2,
      {
        tl: 0,
        tr: 0,
        bl: barConfig.barBorderRadius,
        br: barConfig.barBorderRadius,
      },
    )
    const loading = langConfig[`${window['lang']}`].loading
    this.loaderText.setText(`${loading} ${(coefficient * 100).toFixed()}%`)
  }
}
