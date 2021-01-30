import achievementsCreate from '../../achievements/create.achievements';
import { startApp } from '../../App';
import createStartPage from '../../auth/utils/create.start';
import LevelButton from '../../components/button/LevelButton';
import { KEY_ID, KEY_TOKEN } from '../../constants/constants';
import Button from '../button/Button';

export default class LevelsScene extends Phaser.Scene {
  cancelBtn: Button

  constructor() {
    super({ key: 'LevelsScene' });
  }

  create() {
    this.cameras.main.fadeIn(750, 0, 0, 0)
    this.add.image(0, 0, 'levelsMap').setOrigin(0, 0);

    new LevelButton(this, 500, 300, 'level1Button', 1).setAlpha(0.8);
    new LevelButton(this, 500, 520, 'level2Button', 2).setAlpha(0.8);
    new LevelButton(this, 980, 590, 'level3Button', 3).setAlpha(0.8);

    this.events.on('wake', () => this.cameras.main.fadeIn(300, 0, 0, 0))
    
    this.cancelBtn = new Button(this, 50, 50, 'modal-close-btn')
    this.cancelBtn.setInteractive().on('pointerup', () => {
      
      this.cameras.main.fadeOut(500, 0, 0, 0)
      const token = localStorage.getItem(KEY_TOKEN);
      const id = localStorage.getItem(KEY_ID);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.time.delayedCall(300, () => {
          this.scene.sleep()
          this.game.loop.sleep()
          createStartPage();
          achievementsCreate({ id, token });
          document.querySelector('.logo-start-button')?.addEventListener('click', startApp);
        })
	    })

    })
    
  }
}
