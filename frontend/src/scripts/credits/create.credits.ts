import createElement from '../auth/utils/createElement';
import { whileLoad, whileRaise } from '../auth/utils/wait.while.loading';

function createCredits() {
  const popup = createElement('div', {
    classList: ['credits-wrapper'],
    innerHTML: `
    <div class="credits-bg">

    <div class="credits-content">
    
      <div class="close-credits-popup"></div>
      <div class="credits-data">
        <h2 class="credits-title">Credits</h2>
        <h3 class="credits-subtitle">Our team</h3>
        <div class="team">
          <div class="team-people">
            <div class="avatar Iogsotot"></div>
            <a class="credits-link" href="https://github.com/Iogsotot">Iogsotot</a>
          </div>
          <div class="team-people">
            <div class="avatar DenisAfa"></div>
            <a class="credits-link" href="https://github.com/DenisAfa">DenisAfa</a>
          </div>
          <div class="team-people">
            <div class="avatar Abdulloh76"></div>
            <a class="credits-link" href="https://github.com/Abdulloh76">Abdulloh76</a>
          </div>
          <div class="team-people">
            <div class="avatar mrINEX"></div>
            <a class="credits-link" href="https://github.com/mrINEX">mrINEX</a>
          </div>
        </div>
        <h3 class="credits-subtitle">Gratitude</h3>
        <ul>
          <div class="gratitude-title">
          Особая благодарность от IogSotot:
          </div>
          <li>моей команде</li>
          <li>за Kingdom Rush и выдержку!</li>
          <li>моей черепахе</li>
          <li>за снятие стресса и плавучесть</li>
          <li>Артёму <a class="credits-link" href="https://github.com/cardamo">Cardamo</a></li>
          <li>за менторство и крепкое плечо</li>
          <li><a class="credits-link" href="https://rs.school/">RSS и людям из чатов</a></li>
          <li>за шутки, общение и помощь</li>
          <li>Алексею <a class="credits-link" href="https://github.com/lexlem">Lexlem</a></li>
          <li>за всё и даже больше</li>
        </ul>
        <ul>
          <div class="gratitude-title">
          Особая благодарность от DenisAfa:
          </div>
          <li>моей команде</li>
          <li>за Kingdom Rush и выдержку!</li>
        </ul>
        <ul>
          <div class="gratitude-title">
          Особая благодарность от Abdulloh76:
          </div>
          <li>моей команде</li>
          <li>за Kingdom Rush и выдержку!</li>
        </ul>
    
        <ul>
          <div class="gratitude-title">
          Особая благодарность от mrINEX:
          </div>
          <li>моей команде</li>
          <li>за Kingdom Rush и выдержку!</li>
          <li><a class="credits-link" href="https://rs.school/">RSS и людям из чатов</a></li>
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
      if (target.classList.contains('close-team-popup')) {
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
