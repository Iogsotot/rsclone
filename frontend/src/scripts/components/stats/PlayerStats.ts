// IMPORTANT TO IMPLEMENT
export default function getPlayerStatsFromServer(userId) {
  // await fetch bla bla
  // getStat() {
  //   // went to do backend answers
  // }
  return {
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
      GreatDefender: false,
      IronDefender: false,
      killer: false,
      seller: false,
      builder: false,
    }
  }
}
