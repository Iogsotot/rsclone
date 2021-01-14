import 'phaser';
import MainScene from './scenes/MainScene';
import PreloadScene from './scenes/PreloadScene';
import GameScene from './scenes/GameScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#000000',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    // width: window.innerWidth,
    // height: window.innerWidth / 1.6,
    width: 1280,
    height: 800,
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
