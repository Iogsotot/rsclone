import { map1, map2, map3 } from '../../constants/maps';
import { getPlayerStatsFromServer } from '../stats/PlayerStats';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  async preload() {

    const userId = localStorage.getItem("id");
    this.registry.set("stats", getPlayerStatsFromServer(userId));
    // towers
    this.load.spritesheet('arrow', './assets/towers/arrow.png', {
      frameWidth: 108,
      frameHeight: 104
    });

    this.load.spritesheet('bomb', './assets/towers/bomb.png', {
      frameWidth: 108,
      frameHeight: 104
    });

    this.load.spritesheet('magic', './assets/towers/magic.png', {
      frameWidth: 108,
      frameHeight: 104
    });

    this.load.spritesheet('tower', './assets/towers/tower.png', {
      frameWidth: 120,
      frameHeight: 80
    });

    this.load.spritesheet('missile-arrow', './assets/towers/missile-arrow.png', {
      frameWidth: 30,
      frameHeight: 10
    });

    this.load.spritesheet('missile-magic', './assets/towers/missile-magic.png', {
      frameWidth: 30,
      frameHeight: 30
    });

    this.load.spritesheet('missile-bomb', './assets/towers/missile-bomb.png', {
      frameWidth: 30,
      frameHeight: 30
    });

    //enemies    
    this.load.spritesheet('scorpio', './assets/sprites/scorpio_walk.png', {
      frameWidth: 212,
      frameHeight: 246
    });

    this.load.spritesheet('scorpio_die', './assets/sprites/scorpio_die.png', {
      frameWidth: 212,
      frameHeight: 246
    });

    this.load.spritesheet('scorpio_hurt', './assets/sprites/scorpio_hurt.png', {
      frameWidth: 212,
      frameHeight: 246
    });


    this.load.spritesheet('wizardBlack', './assets/sprites/wizard-black_walk.png', {
      frameWidth: 388,
      frameHeight: 338
    });

    this.load.spritesheet('wizardBlack_die', './assets/sprites/wizard-black_die.png', {
      frameWidth: 388,
      frameHeight: 338
    });

    this.load.spritesheet('wizardBlack_hurt', './assets/sprites/wizard-black_hurt.png', {
      frameWidth: 388,
      frameHeight: 338
    });

    this.load.spritesheet('littleOrc', './assets/sprites/little-orc_walk.png', {
      frameWidth: 331,
      frameHeight: 299
    });

    this.load.spritesheet('littleOrc_die', './assets/sprites/little-orc_die.png', {
      frameWidth: 331,
      frameHeight: 299
    });

    this.load.spritesheet('littleOrc_hurt', './assets/sprites/little-orc_hurt.png', {
      frameWidth: 331,
      frameHeight: 299
    });



    //other
    this.load.image('gate', './assets/imgs/gate-mini.png');
    this.load.image('map_1', map1.url);
    this.load.image('map_2', map2.url);
    this.load.image('map_3', map3.url);
    this.load.image('level1Button', './assets/level_1_title_mini.png')
    this.load.image('level2Button', './assets/level_2_title_mini.png')
    this.load.image('level3Button', './assets/level_3_title_mini.png')

    this.load.image('levelsMap', './assets/main-bg.jpg')

    this.load.image('settings-btn', './assets/interface/settings-icon.png');

    // modal headers
    this.load.image('level1-title', './assets/modal-headers/level1-header.png');
    this.load.image('level2-title', './assets/modal-headers/level2-header.png');
    this.load.image('level3-title', './assets/modal-headers/level3-header.png');
    this.load.image('settings-header', './assets/modal-headers/header_settings.png');
    this.load.image('failed-header', './assets/modal-headers/header_failed.png');
    this.load.image('win-header', './assets/modal-headers/header_win.png');
    // star rewards
    this.load.image('star-grey', './assets/interface/star-grey.png');
    this.load.image('star-1', './assets/interface/star-1.png');
    this.load.image('star-2', './assets/interface/star-2.png');
    this.load.image('star-3', './assets/interface/star-3.png');
    // modal backgrounds
    this.load.image('start-modal-bg', './assets/modal-bg/start-modal-bg.png');
    this.load.image('failed-modal-bg', './assets/modal-bg/failed-modal-bg.png');
    this.load.image('win-modal-bg', './assets/modal-bg/win-modal-bg.png');
    this.load.image('settings-modal-bg', './assets/modal-bg/settings-modal-bg.png');
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
    this.load.image('easy-btn', './assets/interface/easy_btn.png');
    this.load.image('normal-btn', './assets/interface/normal_btn.png');
    this.load.image('hard-btn', './assets/interface/hard_btn.png');
    // icons    
    this.load.image('armor-icon', './assets/icons/armor.png');
    this.load.image('arrow-icon', './assets/icons/arrows.png');
    this.load.image('bomb-icon', './assets/icons/bomb.png');
    this.load.image('damage-icon', './assets/icons/damage.png');
    this.load.image('heart-icon', './assets/icons/heart.png');
    this.load.image('magic-icon', './assets/icons/magic.png');
    this.load.image('speed-icon', './assets/icons/speed.png');
    this.load.image('speed2-icon', './assets/icons/speed2.png');

    try {
      const userId = localStorage.getItem("id");
      this.registry.set("stats", await getPlayerStatsFromServer(userId));
    } catch {
      console.log("Something gone wrong with getting stats from backend")
    }
  }

  create() {
    this.add.text(20, 20, 'Loading game...', { fontFamily: 'Dimbo' });
    // console.log('loading...');
    this.scene.start('LevelsScene');
  }
}
