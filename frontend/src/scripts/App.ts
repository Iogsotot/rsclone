import '../styles/style.scss';
import Phaser from 'phaser';
import runAuth from './auth/run.auth';
import config from './components/Game';
import createBgGame from './auth/utils/create.bg';
import generateLevelsMap from './levels-map/generateLevelsMap';

window.addEventListener('load', () => {
  runAuth();
  document.querySelector('.logo-start-button')?.addEventListener('click', () => {
    // createBgGame();
    generateLevelsMap()
    // const game = new Phaser.Game(config);
  });
});
