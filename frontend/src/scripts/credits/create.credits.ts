import createElement from '../auth/utils/createElement';
import { whileLoad, whileRaise } from '../auth/utils/wait.while.loading';

function createCredits() {
  const popup = createElement('div', {
    classList: ['credits-wrapper'],
    innerHTML: `
      <div class="credits-content">
        <div class="title-credits">Credits</div>
        <div class="close-credits-popup"></div>
        <div class="credits-data">
          <div class="credits-people">
            <div class="avatar Iogsotot"></div>
            <a href="https://github.com/Iogsotot">Iogsotot</a>
          </div>
          <div class="credits-people">
            <div class="avatar DenisAfa"></div>
            <a href="https://github.com/DenisAfa">DenisAfa</a>
          </div>
          <div class="credits-people">
            <div class="avatar Abdulloh76"></div>
            <a href="https://github.com/Abdulloh76">Abdulloh76</a>
          </div>
          <div class="credits-people">
            <div class="avatar mrINEX"></div>
            <a href="https://github.com/mrINEX">mrINEX</a>
          </div>
        </div>
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
