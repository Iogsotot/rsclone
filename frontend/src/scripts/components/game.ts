import 'phaser';
import MainScene from './scenes/MainScene';
import PreloadScene from './scenes/PreloadScene';
import GameScene from './scenes/GameScene';

const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 800;

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#000000',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    width: window.innerWidth,
    height: window.innerWidth / 1.6,
  },
  scene: [
    PreloadScene, 
    MainScene, 
    GameScene
  ],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 0 },
    },
  },
};



export default config;
