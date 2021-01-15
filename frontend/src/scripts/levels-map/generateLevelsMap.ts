import create from '../utils/create';
import Phaser from 'phaser';
import config from '../components/game';

export default function generateLevelsMap() {
  const body = document.querySelector('body')
  
  if (body) {
    body.innerHTML = '';
  }
  
  const wrapper = create('div', 'map-wrapper', null, body)
  const button = create('button', 'level-1', 'level 1', wrapper)
  
  button.addEventListener('click', () => {
    (body as HTMLBodyElement).innerHTML = '';
    body?.classList.remove('map-wrapper')
    const game = new Phaser.Game(config);
  })

}