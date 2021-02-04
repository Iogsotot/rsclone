import createElement from '../auth/utils/createElement';
import { whileLoad, whileRaise } from '../auth/utils/wait.while.loading';
import langConfig from '../layouts/langConfig';

function createCredits() {
  const lang = window['lang'] || localStorage.getItem('lang') || 'en';
  const creditsText = langConfig[`${lang}`].credits;
  const ourTeamText = langConfig[`${lang}`].ourTeam;
  const gratitudeText = langConfig[`${lang}`].gratitude;
  const specialThanksFromText = langConfig[`${lang}`].specialThanksFrom;
  const myTeamText = langConfig[`${lang}`].myTeam;
  const perText = langConfig[`${lang}`].per;
  const andEnduranceText = langConfig[`${lang}`].andEndurance;
  const andPeopleFromChatsText = langConfig[`${lang}`].andPeopleFromChats;
  const myTurtleText = langConfig[`${lang}`].myTurtle;
  const forStressReliefAndBuoyancyText = langConfig[`${lang}`].forStressReliefAndBuoyancy;
  const forMentoringAndStrongShoulderText = langConfig[`${lang}`].forMentoringAndStrongShoulder;
  const forJokesCommunicationAndHelpText = langConfig[`${lang}`].forJokesCommunicationAndHelp;
  const forEverythingAndEvenMoreText = langConfig[`${lang}`].forEverythingAndEvenMore;

  const popup = createElement('div', {
    classList: ['credits-wrapper'],
    innerHTML: `
    <div class="credits-bg">

    <div class="credits-content">
    
      <div class="credits-data">
        <h2 class="credits-title">${creditsText[0].toUpperCase() + creditsText.slice(1)}</h2>
        <h3 class="credits-subtitle">${ourTeamText}</h3>
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
        <h3 class="credits-subtitle">${gratitudeText}</h3>
        <ul>
          <div class="gratitude-title">
          ${specialThanksFromText} IogSotot:
          </div>
          <li>${myTeamText}</li>
          <li>${perText} Kingdom Rush ${andEnduranceText}</li>
          <li>${myTurtleText}</li>
          <li>${forStressReliefAndBuoyancyText}</li>
          <li>Артёму <a class="credits-link" href="https://github.com/cardamo">Cardamo</a></li>
          <li>${forMentoringAndStrongShoulderText}</li>
          <li><a class="credits-link" href="https://rs.school/">RSS ${andPeopleFromChatsText}</a></li>
          <li>${forJokesCommunicationAndHelpText}</li>
          <li>Алексею <a class="credits-link" href="https://github.com/lexlem">Lexlem</a></li>
          <li>${forEverythingAndEvenMoreText}</li>
        </ul>
        <ul>
          <div class="gratitude-title">
          ${specialThanksFromText} DenisAfa:
          </div>
          <li>${myTeamText}</li>
          <li>${perText} Kingdom Rush ${andEnduranceText}</li>
        </ul>
        <ul>
          <div class="gratitude-title">
          ${specialThanksFromText} Abdulloh76:
          </div>
          <li>${myTeamText}</li>
          <li>${perText} Kingdom Rush ${andEnduranceText}</li>
        </ul>
    
        <ul>
          <div class="gratitude-title">
          ${specialThanksFromText} mrINEX:
          </div>
          <li>${myTeamText}</li>
          <li>${perText} Kingdom Rush ${andEnduranceText}</li>
          <li><a class="credits-link" href="https://rs.school/">RSS ${andPeopleFromChatsText}</a></li>
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
