import { map1, map2, map3 } from '../../constants/maps';
import getPlayerStatsFromServer from '../stats/PlayerStats';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }
  
  preload() {
    const userId = localStorage.getItem("userId");
    // this.registry.set("stats", getPlayerStatsFromServer(userId));
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

    this.load.image('modal-bg', './assets/interface/modal-bg.png');
    this.load.image('title-bg', './assets/interface/title-bg.png');
    this.load.image('modal-close-btn', './assets/interface/close-btn.png');
    this.load.image('lose-img', './assets/interface/lose.png');
    this.load.image('btn', './assets/interface/btn.png');
    this.load.image('btn-pressed', './assets/interface/btn-pressed.png');
    this.load.image('star-1', './assets/interface/star-1.png');
    this.load.image('star-2', './assets/interface/star-2.png');
    this.load.image('star-3', './assets/interface/star-3.png');
  }

  create() {
    this.add.text(20, 20, 'Loading game...', {fontFamily: 'Dimbo'});
    // console.log('loading...');
    this.scene.start('LevelsScene');
  }
}
