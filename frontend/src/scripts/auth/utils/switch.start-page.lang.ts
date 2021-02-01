import langConfig from '../../layouts/langConfig';

function switchStartPageLang(lang) {
  const startButton = document.querySelector('.logo-start-button');
  const creditsButton = document.querySelector('.logo-credits-button');
  const achievementsButton = document.querySelector('.achievements-icon');

  const startText = langConfig[`${lang}`].start.toUpperCase();
  const creditsText = langConfig[`${lang}`].credits.toUpperCase();
  const achievementsText = langConfig[`${lang}`].achievements;

  if (startButton && creditsButton && achievementsButton) {
    startButton['textContent'] = startText;
    creditsButton['textContent'] = creditsText;
    achievementsButton['textContent'] = achievementsText;
  }
}

export default switchStartPageLang;
