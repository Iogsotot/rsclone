import createElement from '../auth/utils/createElement';
import { whileLoad, whileRaise } from '../auth/utils/wait.while.loading';
import langConfig from '../layouts/langConfig';

function popapRatingCreate(stats, players) {
  const forSort = stats.map((node) => {
    const { gameProgress, achievements } = node;

    const allStatsAchievements = Object.values(achievements || {});
    const gotStatsAchievements = allStatsAchievements.filter((property) => property);

    const reducer = (acc, val) => acc + val;
    const progress = Object.values(gameProgress || {}).reduce(reducer, 0);

    return { ...node, gameProgressSort: progress, achievementsSort: gotStatsAchievements.length };
  });

  forSort.sort((a, b) => a.gameProgressSort - b.gameProgressSort).reverse();
  forSort.sort((a, b) => a.achievementsSort - b.achievementsSort).reverse();

  players.forEach((player) => {
    const isFind = forSort.find((node) => node.login === player.login);
    if (!isFind) forSort.push(player);
  });

  const readyStats = forSort.map((node) => {
    const { login, gameProgressSort, achievementsSort } = node;
    const resultProgress = gameProgressSort === undefined ? '0' : gameProgressSort;
    const resultAchievements = achievementsSort === undefined ? '0' : achievementsSort;

    return `
      <div
        class="data-rating-player"
        data-name="${login}"
        data-progress="${resultProgress}"
        data-achievements="${resultAchievements}"
      >
        <div class="rating-player's-name">
          ${login}
        </div>
        <div class="rating-game-progress">
          ${resultProgress}/9
        </div>
        <div class="rating-achievements">
          ${resultAchievements}/8
        </div>
      </div>
    `
  });

  const lang = window['lang'] || localStorage.getItem('lang') || 'en';
  const overallRatingText = langConfig[`${lang}`].overallRating;
  const playerNameText = langConfig[`${lang}`].playerName;
  const gameProgressText = langConfig[`${lang}`].gameProgress;
  const achievementsText = langConfig[`${lang}`].achievements;

  const popup = createElement('div', {
    classList: ['popup-rating-wrapper'],
    innerHTML: `
      <div class="popup-rating-content">
        <div class="title-rating">${overallRatingText}</div>
        <div class="close-rating-popup"></div>

        <div class="wrapper-table-rating">
          <div class="title-rating-property">
            <input type="checkbox" id="name" name="name" checked>
            <label for="name" class="rating-property-name">${playerNameText}</label>

            <input type="checkbox" id="progress" name="progress" checked>
            <label for="progress" class="rating-property-progress">${gameProgressText}</label>

            <input type="checkbox" id="achievements" name="achievements" checked>
            <label for="achievements" class="rating-property-achievements">${achievementsText}</label>
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
      const players = Array.from(document.querySelectorAll('.data-rating-player'));
      const [name, progress, achievements] = Array.from(document.querySelectorAll('input[type="checkbox"]'));

      if (target.classList.contains('rating-property-name')) {
        const sortHandler = (a, b) => a.getAttribute('data-name').localeCompare(b.getAttribute('data-name'));

        if (name.checked) {
          players.sort(sortHandler);
        } else {
          players.sort(sortHandler).reverse();
        }
        players.forEach((el) => {
          wrapper?.append(el);
        });
      }

      if (target.classList.contains('rating-property-progress')) {
        const sortHandler = (a, b) => a.getAttribute('data-progress') - b.getAttribute('data-progress');

        if (progress.checked) {
          players.sort(sortHandler).reverse();
        } else {
          players.sort(sortHandler);
        }
        players.forEach((el) => {
          wrapper?.append(el);
        });
      }

      if (target.classList.contains('rating-property-achievements')) {
        const sortHandler = (a, b) => a.getAttribute('data-achievements') - b.getAttribute('data-achievements');

        if (achievements.checked) {
          players.sort(sortHandler).reverse();
        } else {
          players.sort(sortHandler);
        }
        players.forEach((el) => {
          wrapper?.append(el);
        });
      }
    },
  });

  whileLoad(popup, '../assets/modal-bg/start-modal-bg.png');
}

export default popapRatingCreate;
