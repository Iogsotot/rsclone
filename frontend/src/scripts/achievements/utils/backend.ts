import { KEY_ID, KEY_TOKEN, LOCAL_STORAGE_KEY } from '../../constants/constants';
import { getCurrentPlayerStats, setCurrentPlayerStats } from '../../backend';
// import { PlayerStatsManager } from "../components/stats/PlayerStats";
// const playerStats = new PlayerStatsManager();

async function sendDataToBackend(data) {
  const id = localStorage.getItem(KEY_ID);
  const token = localStorage.getItem(KEY_TOKEN);
  const currentStateFromServer = await getCurrentPlayerStats({ id, token });

  const isUpdate = await setCurrentPlayerStats({
    id,
    token,
    body: {
      ...currentStateFromServer,
      builtTowers: currentStateFromServer.builtTowers + builtTowers,
      soldTowers: currentStateFromServer.soldTowers + soldTowers,
      killedEnemies: currentStateFromServer.killedEnemies + killedEnemies,
    },
  });
  console.log('isUpdate level:',isUpdate);
}

export default sendDataToBackend;
