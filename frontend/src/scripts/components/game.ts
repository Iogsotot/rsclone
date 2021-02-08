import 'phaser';
import LevelsScene from './scenes/LevelsScene';
import PreloadScene from './scenes/PreloadScene';
import GameScene from './scenes/GameScene';
import PauseScene from './scenes/PauseScene';
import LoseScene from './scenes/LoseScene';
import WinScene from './scenes/WinScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.CANVAS,
  backgroundColor: '#000000',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    width: 2048,
    height: 1210,
  },
  scene: [
    PreloadScene,
    LevelsScene,
    PauseScene,
    WinScene,
    LoseScene,
    GameScene,
  ],
  physics: {
    default: 'arcade',
    arcade: {
    //   debug: true,
      gravity: { y: 0 },
    },
  },
};

export default config;
