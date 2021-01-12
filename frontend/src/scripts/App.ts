import '../styles/style.scss';
import Phaser from 'phaser';
import runAuth from './auth/run.auth';
import config from './components/Game';

window.addEventListener('load', () => {
  const isAuthorization = runAuth();
  if (isAuthorization) {
    const game = new Phaser.Game(config);
    // console.log(game);
  }
});
