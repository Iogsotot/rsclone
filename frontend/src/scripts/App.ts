import '../styles/style.scss';
import Phaser from 'phaser';
import runAuth from './auth/run.auth';
import config from './components/Game';


window.addEventListener('load', () => {
  runAuth();
  document.querySelector('.logo-start-button')?.addEventListener('click', () => {
    document.body.innerText = '';
    const game = new Phaser.Game(config);
  });
});
