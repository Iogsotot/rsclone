import { KEY_ID, KEY_TOKEN, LOCAL_STORAGE_KEY } from '../../constants/constants';
import { getCurrentPlayerStats, setCurrentPlayerStats } from '../../backend';

async function sendDataToBackend() {
  const id = localStorage.getItem(KEY_ID);
  const token = localStorage.getItem(KEY_TOKEN);
  const currentStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "");
  const { data } = await getCurrentPlayerStats({ id, token });
  const {
    userId, login, builtTowers, soldTowers, killedEnemies
  } = data;

  const update = await setCurrentPlayerStats({
    id,
    token,
    body: {
      ...data,
      userId,
      login,
      builtTowers: builtTowers + currentStorage.builtTowers,
      soldTowers: soldTowers + currentStorage.soldTowers,
      killedEnemies: killedEnemies + currentStorage.killedEnemies,
      achievements: currentStorage.achievements,
      gameProgress: currentStorage.gameProgress,
      ironModeProgress: currentStorage.ironModeProgress,
    },
  });
  return update;
}

export default sendDataToBackend;
