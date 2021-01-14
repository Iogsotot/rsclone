import '../styles/style.scss';
import Phaser from 'phaser';
import runAuth from './auth/run.auth';
import config from './components/Game';
import createBgGame from './auth/utils/create.bg';

window.addEventListener('load', () => {
  runAuth();
  document.querySelector('.logo-start-button')?.addEventListener('click', () => {
    document.body.innerText = '';
    createBgGame();
    const game = new Phaser.Game(config);
  });
});
