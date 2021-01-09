import '../styles/style.scss';
import runAuth from './auth/run.auth';

// import 'phaser'
import Phaser from 'phaser';
import config from './components/game'

window.addEventListener('load', () => {
  const isAuthorization = runAuth();
  if (isAuthorization) {
    const game = new Phaser.Game(config);
  }
})
