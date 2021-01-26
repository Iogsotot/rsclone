import createElement from '../auth/utils/createElement';
import whileLoad from '../auth/utils/wait.while.loading';

function popapRatingCreate(stats) {
  console.log('rating data:', stats);

  const readyStats = stats.map((node) => {
    const allStatsAchievements = Object.values(node.achievements);
    const gotStatsAchievements = allStatsAchievements.filter((property) => property);
  
    // const allStats = Object.values(node);
    // const gotStats = allStats.filter((property) => property);
    console.log('all, got :', node, node.length);

    const elemetsPlayersName = ``;
    const elementsGameProgress = ``;
    const elementsRatingAchievements = `${gotStatsAchievements.length}/${allStatsAchievements.length}`;

    return `
      <div class="data-rating-values">
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
