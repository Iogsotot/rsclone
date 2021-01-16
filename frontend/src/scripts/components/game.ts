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
        // Денис: я не знаю что это, но если это включить, элементы, которые стали физическими,
        // будут обведены прямоугольником.
    //   debug: true,
      gravity: { y: 0 },
    },
  },
};



export default config;
