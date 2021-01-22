import createElement from '../auth/utils/createElement';
import whileLoad from '../auth/utils/wait.while.loading';

function popapProfileCreate(stats) {
  console.log('stat user:', stats);

  const arrayStats = Object.entries(stats.achievements);
  const allStats = Object.values(stats.achievements);
  const gotStats = allStats.filter((property) => property);
  const percent = ((allStats.length - gotStats.length) / allStats.length) * 100;

  const popup = createElement('div', {
    classList: ['popup-profile-wrapper'],
    innerHTML: `
      <div class="popup-profile-content">
        <div class="title-profile">Achievements</div>
        <div class="close-profile-popup"></div>
        <div class="progress-profile-achievements">
          <div class="star-progress-profile"></div>
          <div class="info-progress-profile">
            <div class="progress-profile-text">
              You got ${gotStats.length} achievements out of ${allStats.length}! (${100 - percent}%)
            </div>
            <svg class="progress-profile-bar">
              <g class="progress-profile-line">
                <rect width="${100 - percent}%" height="100%"></rect>
              </g>
            </svg>
          </div>
        </div>
        <div class="icons-profile-achievements">
          <div class="icons-profile">
          ${arrayStats
            .map(([key, value]) => {
              const opacity = value ? 1 : .4;

              return `
                <div class="icon-achievements ${key}" style="opacity: ${opacity};"></div>
              `;
            }).join(' ')}
          <div>
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
