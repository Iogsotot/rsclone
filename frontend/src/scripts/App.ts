import '../styles/style.scss';
import Phaser from 'phaser';
import runAuth from './auth/run.auth';
import config from './components/Game';
import createBgGame from './auth/utils/create.bg';
import { getPlayerStatsFromServer, PlayerStatsManager } from './components/stats/PlayerStats';
import { KEY_ID } from './constants/constants';

export async function startApp() {
  createBgGame();
  const playerStatsManager = new PlayerStatsManager();
  try {
    const userId = localStorage.getItem(KEY_ID);
    const data = await getPlayerStatsFromServer(userId);
    playerStatsManager.prepopulateLocalStorage(data['data']);
  } catch {
    console.log('Something gone wrong with getting stats from backend');
  }
  
  if(!startApp.game) {
    startApp.game = new Phaser.Game(config)
  } else {
    (document.querySelector('body') as HTMLBodyElement).style.height = '100%';
    (document.querySelector('canvas') as HTMLElement).style.display = '';
    startApp.game.loop.wake()
    startApp.game.scene.wake('LevelsScene')
  }
}
startApp.game = null;
window.addEventListener('load', () => {
  runAuth(startApp);
  document.querySelector('.fontPreload')?.remove()
});
