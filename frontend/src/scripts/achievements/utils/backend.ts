import { KEY_ID, KEY_TOKEN, LOCAL_STORAGE_KEY } from '../../constants/constants';
import { getCurrentPlayerStats, setCurrentPlayerStats } from '../../backend';

async function sendDataToBackend() {
  const id = localStorage.getItem(KEY_ID);
  const token = localStorage.getItem(KEY_TOKEN);
  const currentStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "");
  const { data } = await getCurrentPlayerStats({ id, token });
  const { userId, login } = data;

  const objectWillSend = {
    id,
    token,
    body: {
      ...data,
      userId,
      login,
      builtTowers: currentStorage.builtTowers,
      soldTowers: currentStorage.soldTowers,
      killedEnemies: currentStorage.killedEnemies,
      achievements: currentStorage.achievements,
      gameProgress: currentStorage.gameProgress,
      ironModeProgress: currentStorage.ironModeProgress,
    },
  };

  const update = await setCurrentPlayerStats(objectWillSend);
  return update;
}

export default sendDataToBackend;
