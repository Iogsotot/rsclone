import '../styles/style.scss';
import Phaser from 'phaser';
import runAuth from './auth/run.auth';
import config from './components/Game';
import createBgGame from './auth/utils/create.bg';

export function startApp() {
  createBgGame();
  new Phaser.Game(config);
}

window.addEventListener('load', () => {
  runAuth(startApp);
});
