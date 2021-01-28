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
              <div>Gratitude from people</div>
              <p>s lekrnflwa;vjrtvanlei jrtblq i3jn5ljntilqejr j 34qimgjcl g  3qjig4 cm3g jg  j4ij m ij3 4lijmgml  h34gl</p>
            </div>
            <div class="gratitude-from">
              <div>Gratitude from people</div>
              <p>s lekrnflwa;vjrtvanlei jrtblq i3jn5ljntijig4 cm3g jg  j4ij m ij3 4lijmgml  h34gl</p>
            </div>
            <div class="gratitude-from">
              <div>Gratitude from people</div>
              <p>s lekrnflwa;vjrtvanlei jrtblq i3jn5ljntilqejr j 3vjrtvanlei jrtblq i3jn5ljntijig4 cm3g jg  j4ij m vjrtvanlei jrtblq i3jn5ljntijig4 cm3g jg  j4ij m vjrtvanlei jrtblq i3jn5ljntijig4 cm3g jg  j4ij m 4qimgjcl g  3qjig4 cm3g jg  j4ij m ij3 4lijmgml  h34gl</p>
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
