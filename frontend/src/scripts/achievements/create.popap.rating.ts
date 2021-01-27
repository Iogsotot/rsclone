import createElement from '../auth/utils/createElement';
import { whileLoad, whileRaise } from '../auth/utils/wait.while.loading';

function popapRatingCreate(stats, players) {
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
        data-name="${login}"
        data-progress="${progress === 'no progress' ? 0 : progress}"
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
            <div class="rating-property-name">Player's name</div>
            <div class="rating-property-progress">game progress</div>
            <div class="rating-property-achievements">achievements</div>
          </div>
        </div>

        <div class="wrapper-data-table-rating">
          ${readyStats.join(' ')}
        </div>

      </div>
    `,
    onclick: ({ target }) => {
      if (target.classList.contains('popup-rating-wrapper')) {
        whileRaise(popup);
      }
      if (target.classList.contains('close-rating-popup')) {
        whileRaise(popup);
      }

      const wrapper = document.querySelector('.wrapper-data-table-rating');
      const players = document.querySelectorAll('.data-rating-player');

      if (target.classList.contains('rating-property-name')) {
        const sortHandler = (a, b) => a.getAttribute('data-name').localeCompare(b.getAttribute('data-name'));
        const result = Array.from(players).sort(sortHandler);
        wrapper?.append(...result);
      }

      if (target.classList.contains('rating-property-progress')) {
        const sortHandler = (a, b) => a.getAttribute('data-progress') - b.getAttribute('data-progress');
        const result = Array.from(players).sort(sortHandler);
        wrapper?.append(...result);
      }

      if (target.classList.contains('rating-property-achievements')) {
        const sortHandler = (a, b) => a.getAttribute('data-achievements') - b.getAttribute('data-achievements');
        const result = Array.from(players).sort(sortHandler);
        wrapper?.append(...result);
      }
    },
  });

  whileLoad(popup, '../assets/modal-bg/start-modal-bg.png');
}

export default popapRatingCreate;
