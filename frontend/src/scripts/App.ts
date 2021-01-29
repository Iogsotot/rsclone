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
  new Phaser.Game(config);
}
window['lang'] = 'ru';
window.addEventListener('load', () => {
  runAuth(startApp);
});
