import createElement from '../auth/utils/createElement';
import { whileLoad, whileRaise } from '../auth/utils/wait.while.loading';
import popapProfileAllCreate from './create.popap.profile.all';

function popapProfileCreate(stats) {
  const arrayStats = Object.entries(stats.achievements);
  const allStats = Object.values(stats.achievements);
  const gotStats = allStats.filter((property) => property);
  const percent = ((allStats.length - gotStats.length) / allStats.length) * 100;
  const achievement: Array<string> = [];

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
              if (value) {
                achievement.push(
                  `
                  <div class="wrapper-icon-achievements-info hide">
                    <div class="icon-achievements-info ${key}"></div>
                    <div class='icon-achievements-info-descriptions'>${key}</div>
                  </div>
                  `
                );
  
                return `
                  <div class="icon-achievements ${key}"></div>
                `;
              } else {
                return '';
              }
            }).join(' ')}
          </div>
          <div class="icon-profile-info">
            ${achievement.join(' ')}
          </div>
        </div>
        <div class="all-achievements-button">all</div>
      </div>
    `,
    onclick: ({ target }) => {
      if (target.classList.contains('popup-profile-wrapper')) {
        whileRaise(popup);
      }
      if (target.classList.contains('close-profile-popup')) {
        whileRaise(popup);
      }
      if (target.classList.contains('icon-achievements')) {
        const [ , need] = target.classList;
        const iconsInfo = document.querySelectorAll('.wrapper-icon-achievements-info');

        iconsInfo.forEach((el) => {
          const needInfo = el.children[0].classList[1];
          if (need === needInfo) {
            el.classList.remove('hide');
            el.classList.add('flex-for-achevements');
          } else {
            el.classList.add('hide');
            el.classList.remove('flex-for-achevements');
          }
        });
      }
      if (target.classList.contains('all-achievements-button')) {
        popup.remove();
        popapProfileAllCreate(arrayStats);
      }
    },
  });

  whileLoad(popup, '../assets/modal-bg/start-modal-bg.png');
}

export default popapProfileCreate;
