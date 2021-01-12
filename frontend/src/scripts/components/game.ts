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
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
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
