import createElement from '../auth/utils/createElement';
import { whileLoad, whileRaise } from '../auth/utils/wait.while.loading';

function createCredits() {
  const popup = createElement('div', {
    classList: ['credits-wrapper'],
    innerHTML: `
      <div class="credits-content">
        <div class="title-credits">Credits</div>
        <div class="close-credits-popup"></div>
      </div>
    `,
    onclick: ({ target }) => {
      if (target.classList.contains('credits-wrapper')) {
        whileRaise(popup);
      }
      if (target.classList.contains('close-credits-popup')) {
        whileRaise(popup);
      }
    },
  }, {
    height: `${window.innerHeight}`,
    width: `${window.innerWidth}`,
  });

  whileLoad(popup, '../assets/credits/wood_2.png');
}

export default createCredits;
