import '../styles/style.scss';

import Phaser from './components/phaser/phaser';
import GameScene from './components/game/GameScene';

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.NONE,
    parent: 'phaser-example',
    width: 1280,
    height: 700,
  },
  backgroundColor: '#FFFFFF',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [GameScene],
};

export default new Phaser.Game(config);
