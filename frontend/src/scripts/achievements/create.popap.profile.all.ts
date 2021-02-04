import createElement from '../auth/utils/createElement';
import { whileLoad, whileRaise } from '../auth/utils/wait.while.loading';
import langConfig from '../layouts/langConfig';

function popapProfileAllCreate(arrayStats) {
  const lang = window['lang'] || localStorage.getItem('lang') || 'en';
  const achievementsText = langConfig[`${lang}`].achievements;
  const { achievs } = langConfig[`${lang}`];

  const popup = createElement('div', {
    classList: ['popup-profile-all-wrapper'],
    innerHTML: `
      <div class="popup-profile-all-content">
        <div class="title-profile-all">${achievementsText}</div>
        <div class="close-profile-all-popup"></div>
        <div class="progress-profile-achievements-all">
        ${arrayStats
        .map(([key, value]) => {
          const opacity = value ? 1 : .4;
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

          return `
              <div class="wrapper-icon-achievements-info" style="opacity: ${opacity};">
                <div class="icon-achievements-info ${key}"></div>
                <div class='icon-achievements-info-descriptions'>${info}</div>
              </div>
              `;
        }).join(' ')}
        </div>
      </div>
    `,
    onclick: ({ target }) => {
      if (target.classList.contains('popup-profile-all-wrapper')) {
        whileRaise(popup);
      }
      if (target.classList.contains('close-profile-all-popup')) {
        whileRaise(popup);
      }
    },
  });

  whileLoad(popup, '../assets/interface/modal-bg.png');
}

export default popapProfileAllCreate;
