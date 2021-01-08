import '../styles/style.scss';
import runAuth from './auth/run.auth';

// import 'phaser'
import Phaser from 'phaser';
import config from './components/game'


window.onload = () => {
  runAuth();
};

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})
