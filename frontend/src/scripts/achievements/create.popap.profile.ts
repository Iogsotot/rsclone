import createElement from '../auth/utils/createElement';
import { whileLoad, whileRaise } from '../auth/utils/wait.while.loading';
import popapProfileAllCreate from './create.popap.profile.all';
import langConfig from '../layouts/langConfig';

function popapProfileCreate(stats) {
  const arrayStats = Object.entries(stats.achievements);
  const allStats = Object.values(stats.achievements);
  const gotStats = allStats.filter((property) => property);
  const percent = ((allStats.length - gotStats.length) / allStats.length) * 100;
  const achievement: Array<string> = [];

  const lang = window['lang'] || localStorage.getItem('lang') || 'en';
  const achievementsText = langConfig[`${lang}`].achievements;
  const youGotText = langConfig[`${lang}`].youGot;
  const achievementsOutOfText = langConfig[`${lang}`].achievementsOutOf;
  const allText = langConfig[`${lang}`].all;
  const { achievs } = langConfig[`${lang}`];
  let isAdd: boolean = false;

  const popup = createElement('div', {
    classList: ['popup-profile-wrapper'],
    innerHTML: `
      <div class="popup-profile-content">
        <div class="title-profile">${achievementsText}</div>
        <div class="close-profile-popup"></div>
        <div class="progress-profile-achievements">
          <div class="star-progress-profile"></div>
          <div class="info-progress-profile">
            <div class="progress-profile-text">
              ${youGotText} ${gotStats.length} ${achievementsOutOfText} ${allStats.length}! (${100 - percent}%)
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
          let info;
          switch (key) {
            case 'completeWin':
              info = achievs['completeWin'];
              break;
            case 'firstBlood':
              info = achievs['firstBlood'];
              break;
            case 'greatDefender':
              info = achievs['greatDefender'];
              break;
            case 'ironDefender':
              info = achievs['ironDefender'];
              break;
            case 'killer':
              info = achievs['killer'];
              break;
            case 'seller':
              info = achievs['seller'];
              break;
            case 'builder':
              info = achievs['builder'];
              break;
            case 'firstAsterisk':
              info = achievs['firstAsterisk'];
              break;
            default:
          }

          if (value) {
            achievement.push(
              `
                  <div class="wrapper-icon-achievements-info ${!isAdd ? 'flex-for-achevements' : 'hide'}">
                    <div class="icon-achievements-info ${key}"></div>
                    <div class='icon-achievements-info-descriptions'>${info}</div>
                  </div>
                  `
            );
            isAdd = true;

            return `
                  <div class="icon-achievements ${key}"></div>
                `;
          }
          return '';

        }).join(' ')}
          </div>
          <div class="icon-profile-info">
            ${achievement.join(' ')}
          </div>
        </div>
        <div class="all-achievements-button">${allText}</div>
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
        const [, need] = target.classList;
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
