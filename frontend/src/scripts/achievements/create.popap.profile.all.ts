import createElement from '../auth/utils/createElement';
import { whileLoad, whileRaise } from '../auth/utils/wait.while.loading';

function popapProfileAllCreate(arrayStats) {
  const popup = createElement('div', {
    classList: ['popup-profile-all-wrapper'],
    innerHTML: `
      <div class="popup-profile-all-content">
        <div class="title-profile-all">Achievements</div>
        <div class="close-profile-all-popup"></div>
        <div class="progress-profile-achievements-all">
        ${arrayStats
          .map(([key, value]) => {
            const opacity = value ? 1 : .4;
            let info;
            switch (key) {
              case 'completeWin':
                info = 'complete win!';
                break;
              case 'firstBlood':
                info = 'First blood';
                break;
              case 'greatDefender':
                info = 'Great Defender!'
                break;
              case 'ironDefender':
                info = 'Iron defender';
                break;
              case 'killer':
                info = 'Killer';
                break;
              case 'seller':
                info = 'Seller';
                break;
              case 'builder':
                info = 'Builder';
                break;
              case 'firstAsterisk':
                info = 'First asterisk';
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
