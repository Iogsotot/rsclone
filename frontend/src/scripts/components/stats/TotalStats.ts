// данные по всем игрокам (для таблицы рекордов, графика и тд)
// PlayerName берется из данных при регистрации/авторизации в игру
// при регистрации шаблонный объект (как ниже внутри totalStats) - видимо инстанс PlayerStats
// добавляется в объект totalStats
// при изменении состояния параметка конктреного игрока во время игры(игровой сессии)
// обновленное состояние заливается на LocalStorage и раз в 30 сек на сервер
// player rating в таблице и графике строится по achivements (по умолчанию)
// либо можно остортировать по gameProgress
// либо по IronModeProgress
// (только данные по ачивкам и прогрессу идут в общую табличку)
// объект ниже - лишь пример группировки данных, лучше переделать на класс с методами обновления, чеканья и тд
// сам объект надо в json-формат перевести, видимо (обсудить с Владимиром)
const totalStats = {
  PlayerName1: {
    gameProgress: 0,
    gameLogInCount: 0,
    killedEnemies: 0,
    builtTowers: 0,
    soldTowers: 0,
    ironModeProgress: 0,

    achievements: {
      firstAsterisk: false,
      completeWin: false,
      firstBlood: false,
      greatDefender: false,
      ironDefender: false,
      killer: false,
      seller: false,
      builder: false,
    },
  },
  PlayerName2: {
    gameProgress: 0,
    gameLogInCount: 0,
    killedEnemies: 0,
    builtTowers: 0,
    soldTowers: 0,
    ironModeProgress: 0,

    achievements: {
      firstAsterisk: false,
      completeWin: false,
      firstBlood: false,
      greatDefender: false,
      ironDefender: false,
      killer: false,
      seller: false,
      builder: false,
    },
  },
};
