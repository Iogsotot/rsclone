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
            
              return `
                <div class="wrapper-icon-achievements-info" style="opacity: ${opacity};">
                  <div class="icon-achievements-info ${key}"></div>
                  <div class='icon-achievements-info-descriptions'>${key}</div>
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
