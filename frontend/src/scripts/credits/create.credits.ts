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
          <h2 class="credits-title">Our team</h2>
          <div class="wrapper-credits-people">
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
          <h2 class="credits-title">Gratitude</h2>
          <div class="wrapper-gratitude">
            <div class="gratitude-from">
              <ul>
                Особая благодарность от IogSotot:
                <li>моей команде</li>
                <li>за Kingdom Rush и выдежрку!</li>
                <li>моей черепахе</li>
                <li>за снятие стресса и плавучесть</li>
                <li>Артёму <a href="https://github.com/cardamo">Cardamo</a></li>
                <li>за менторство и крепкое плечо</li>
                <li><a href="https://rs.school/">RSS и людям из чатов</a></li>
                <li>за шутки, общение и помощь</li>
                <li>Алексею <a href="https://github.com/lexlem">Lexlem</a></li>
                <li>за всё и даже больше</li>
              </ul>
            </div>
            <div class="gratitude-from">
              <ul>
                Особая благодарность от DenisAfa:
                <li>моей команде</li>
                <li>за Kingdom Rush и выдежрку!</li>
              </ul>
            </div>
            <div class="gratitude-from">
              <ul>
                Особая благодарность от Abdulloh76:
                <li>моей команде</li>
                <li>за Kingdom Rush и выдежрку!</li>
              </ul>
            </div>
            <div class="gratitude-from">
              <ul>
                Особая благодарность от mrINEX:
                <li>моей команде</li>
                <li>за Kingdom Rush и выдежрку!</li>
                <li><a href="https://rs.school/">RSS и людям из чатов</a></li>
              </ul>
            </div>
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
