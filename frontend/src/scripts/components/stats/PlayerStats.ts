import { getCurrentPlayerStats, setCurrentPlayerStats } from '../../backend'

async function getPlayerStatsFromServer(userId): Promise<object> {
  const token = localStorage.getItem('token');
  const response = await getCurrentPlayerStats({ id: userId, token });
  return response
}

async function sendPlayerStatsToServer(userId, data): Promise<object> {
  const token = localStorage.getItem('token');
  const response = await setCurrentPlayerStats({ id: userId, token, body: data });
  return response
}

export {getPlayerStatsFromServer, sendPlayerStatsToServer};
