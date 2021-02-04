import { startApp } from '../../App';
import createStartPage from '../../auth/utils/create.start';
import LevelButton from '../../components/button/LevelButton';
import { KEY_ID, KEY_TOKEN } from '../../constants/constants';
import Button from '../button/Button';
import HotKeysModal from '../modal/HotKeysModal';

export default class LevelsScene extends Phaser.Scene {
  cancelBtn: Button

  helpBtn: Button

  hotKeysModal: HotKeysModal

  sounds: { [key: string]: Phaser.Sound.BaseSound | any } = {};

  constructor() {
    super({ key: 'LevelsScene' });
  }

  createSounds() {
    this.sounds = {
      mainTheme: this.sound.add('main-theme', {
        loop: true,
        volume: 1,
      }),
      levelTheme: this.sound.add('level-1', {
        loop: true,
        volume: 1,
      }),
      levelAttack: this.sound.add('level-1-attack', {
        loop: true,
        volume: 1,
      }),

      win: this.sound.add('win', {
        volume: 1,
      }),
      defeat: this.sound.add('defeat', {
        volume: 1,
      }),
    };

    this.sounds.mainTheme.setVolume(0.5);

    if (!this.sounds.mainTheme.isPlaying) {
      this.sounds.mainTheme.play();
    }
  }

  create() {
    this.createSounds();
    this.cameras.main.fadeIn(750, 0, 0, 0);
    this.add.image(0, 0, 'levelsMap').setOrigin(0, 0);

    new LevelButton(this, 500, 300, 'level1Button', 1).setAlpha(0.8);
    new LevelButton(this, 500, 520, 'level2Button', 2).setAlpha(0.8);
    new LevelButton(this, 980, 590, 'level3Button', 3).setAlpha(0.8);

    this.events.on('wake', () => {
      this.cameras.main.fadeIn(600, 0, 0, 0);
      if (!this.sounds.mainTheme.isPlaying) {
        this.sounds.mainTheme.play();
      }
    });

    this.cancelBtn = new Button(this, 50, 50, 'modal-close-btn');
    this.cancelBtn.setInteractive().on('pointerup', () => {
      this.cancel();
    });

    this.input.keyboard.on('keydown-Q', (event) => {
      if (event.ctrlKey) {
        this.cancel();
      }
    });

    this.helpBtn = new Button(this, 50, 50, 'help-btn');
    this.helpBtn.setX(this.cameras.main.centerX * 2 - 50);
    this.hotKeysModal = new HotKeysModal(this);
    this.helpBtn.setInteractive().on('pointerup', () => {
      if (window['lang'] === this.hotKeysModal.lang) {
        this.hotKeysModal.slideIn();
      } else {
        this.hotKeysModal = new HotKeysModal(this);
        this.hotKeysModal.slideIn();
      }
    });

    this.input.keyboard.on('keydown-ESC', (event) => {
      this.hotKeysModal.slideOut();
    });
  }

  cancel() {
    this.cameras.main.fadeOut(500, 0, 0, 0);
    const token = localStorage.getItem(KEY_TOKEN);
    const id = localStorage.getItem(KEY_ID);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.time.delayedCall(100, () => {
        (document.querySelector('body') as HTMLBodyElement).style.height = '';
        (document.querySelector('canvas') as HTMLElement).style.display = 'none';
        this.sound.stopAll();
        this.scene.sleep();
        this.game.loop.sleep();
        createStartPage({ id, token });
        document.querySelector('.logo-start-button')?.addEventListener('click', startApp);
      });
    });
  }
}
