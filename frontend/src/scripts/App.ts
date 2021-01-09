import '../styles/style.scss';
import runAuth from './auth/run.auth';

import 'phaser'
import { Game } from 'phaser'
import MainScene from './components/scenes/mainScene'
import PreloadScene from './components/scenes/preloadScene'

const DEFAULT_WIDTH = 1280
const DEFAULT_HEIGHT = 720

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [PreloadScene, MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 400 }
    }
  }
}

window.addEventListener('load', () => {
  const isAuthorization = runAuth();
  // if (isAuthorization) {
  //   const game = new Phaser.Game(config);
  // }
})
