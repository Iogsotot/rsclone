import createElement from '../auth/utils/createElement';
import { whileLoad, whileRaise } from '../auth/utils/wait.while.loading';

function createCredits() {
  const popup = createElement('div', {
    classList: ['credits-wrapper'],
    innerHTML: `
    <div class="credits-bg">

    <div class="credits-content">
    
      <div class="credits-data">
        <h2 class="credits-title">Credits</h2>
        <h3 class="credits-subtitle">Our team</h3>
        <div class="team">
          <a class="team-people" href="https://github.com/Iogsotot">
            <div class="avatar Iogsotot"></div>
            <div class="team-member">Iogsotot</div>
          </a>
          <a class="team-people" href="https://github.com/DenisAfa">
            <div class="avatar DenisAfa"></div>
            <div class="team-member" >DenisAfa</div>
          </a>
          <a class="team-people"  href="https://github.com/Abdulloh76">
            <div class="avatar Abdulloh76"></div>
            <div class="team-member">Abdulloh76</div>
          </a>
          <a class="team-people" href="https://github.com/mrINEX">
            <div class="avatar mrINEX"></div>
            <div class="team-member" >mrINEX</div>
          </a>
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
  <div class="close-credits-popup"></div>
    `,
    onclick: ({ target }) => {
      if (target.classList.contains('close-credits-popup')) {
        whileRaise(popup);
      }
    },
  });

  whileLoad(popup, '../assets/credits/wood_2.png');
}

export default createCredits;
