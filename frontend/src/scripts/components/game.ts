import 'phaser';
import MainScene from './scenes/MainScene';
import PreloadScene from './scenes/PreloadScene';
import GameScene from './scenes/GameScene';
import PauseScene from './scenes/PauseScene';
import LoseScene from './scenes/LoseScene';
import StartGameScene from './scenes/StartGameScene';

const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 800;

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#000000',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  },
  scene: [
    PreloadScene, 
    MainScene,
    StartGameScene,
    PauseScene, 
    LoseScene, 
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
