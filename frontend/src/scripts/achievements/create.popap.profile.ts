import createElement from '../auth/utils/createElement';
import whileLoad from '../auth/utils/wait.while.loading';

function popapProfileCreate(stats) {
  console.log('stat user:', stats);

  const arrayStats = Object.entries(stats.achievements);
  const allStats = Object.values(stats.achievements);
  const gotStats = allStats.filter((property) => property);

  const popup = createElement('div', {
    classList: ['popup-profile-wrapper'],
    innerHTML: `
      <div class="popup-profile-content">
        <div class="title-profile">Achievements</div>
        <div class="close-profile-popup"></div>
        <div class="progress-profile-achievements">
          <div class="star-progress-profile"></div>
          <div>
            <div class="progress-profile-text">
              You got ${gotStats.length} achievements out of ${allStats.length}.
            </div>
            <div class="progress-profile-bar">
              <progress
                max="${allStats.length}"
                value="${gotStats.length}"
              >
              </progress>
            </div>
          </div>
        </div>
      </div>
    `,
    onclick: ({ target }) => {
      if (target.classList.contains('popup-profile-wrapper')) {
        popup.remove();
      }
      if (target.classList.contains('close-profile-popup')) {
        popup.remove();
      }
    },
  });

  whileLoad(popup, '../assets/modal-bg/start-modal-bg.png');
}

export default popapProfileCreate;
