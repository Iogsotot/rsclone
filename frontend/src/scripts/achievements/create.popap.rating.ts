import createElement from '../auth/utils/createElement';
import whileLoad from '../auth/utils/wait.while.loading';

function popapRatingCreate(stats, players) {
  console.log('rating data:', stats);
  console.log('players:', players);

  const forSort = stats.map((node) => {
    const { gameProgress, achievements } = node;

    const allStatsAchievements = Object.values(achievements || {});
    const gotStatsAchievements = allStatsAchievements.filter((property) => property);

    const reducer = (acc, val) => acc + val;
    const progress = Object.values(gameProgress || {}).reduce(reducer, 0);

    return { ...node, gameProgressSort: progress, achievementsSort: gotStatsAchievements.length };
  });

  forSort.sort((a, b) => a.gameProgressSort - b.gameProgressSort);
  forSort.sort((a, b) => a.achievementsSort - b.achievementsSort);

  players.forEach((player) => {
    const isFind = forSort.find((node) => node.login === player.login);
    if (!isFind) forSort.push(player);
  });

  const readyStats = forSort.map((node) => {
    const { login, gameProgress, achievements } = node;

    const allStatsAchievements = Object.values(achievements || {});
    const gotStatsAchievements = allStatsAchievements.filter((property) => property);

    const reducer = (acc, val) => acc + val;
    const progress = Object.values(gameProgress || {}).reduce(reducer, 0);

    const elemetsPlayersName = login || 'no login';
    const elementsGameProgress = gameProgress ? `${progress}/9` : 'no progress';
    const elementsRatingAchievements = achievements ? `${gotStatsAchievements.length}/${allStatsAchievements.length}` : 'no achievements';

    return `
      <div
        class="data-rating-player"
        data-progress="${progress}"
        data-achievements="${gotStatsAchievements.length}"
      >
        <div class="rating-player's-name">
          ${elemetsPlayersName}
        </div>
        <div class="rating-game-progress">
          ${elementsGameProgress}
        </div>
        <div class="rating-achievements">
          ${elementsRatingAchievements}
        </div>
      </div>
    `
  });

  const popup = createElement('div', {
    classList: ['popup-rating-wrapper'],
    innerHTML: `
      <div class="popup-rating-content">
        <div class="title-rating">Overall rating</div>
        <div class="close-rating-popup"></div>

        <div class="wrapper-table-rating">
          <div class="title-rating-property">
            <div>Player's name</div>
            <div>game progress</div>
            <div>achievements</div>
          </div>
        </div>

        <div class="wrapper-data-table-rating">
          ${readyStats.join(' ')}
        </div>

      </div>
    `,
    onclick: ({ target }) => {
      if (target.classList.contains('popup-rating-wrapper')) {
        popup.remove();
      }
      if (target.classList.contains('close-rating-popup')) {
        popup.remove();
      }
    },
  });

  whileLoad(popup, '../assets/modal-bg/start-modal-bg.png');
}

export default popapRatingCreate;
