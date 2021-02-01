import createElement from './createElement';
import getAttendance from '../backend/getAttendance';
import createCredits from '../../credits/create.credits';
import { KEY_ID, KEY_TOKEN } from '../../constants/constants';
import { whileLoad, whileRaise } from '../utils/wait.while.loading';
import achievementsCreate from '../../achievements/create.achievements';
import LangSwitcher, { LangConfig } from './LangSwitcher';
import langConfig from '../../layouts/langConfig';


const langConfigs: LangConfig[] = [
  { lang: 'en', text: 'English' },
  { lang: 'ru', text: 'Русский' },
  { lang: 'uz', text: 'O\'zbekcha' },
]

function createStartPage({ id, token }) {
  const lang = localStorage.getItem('lang');
  console.log(langConfig);

  const startText = langConfig[`${lang}`].start.toUpperCase();
  const creditsText = langConfig[`${lang}`].credits.toUpperCase();
  
  const startPage = createElement(
    'div',
    {
      classList: ['start-page'],
      innerHTML: `
    <div class="wrapper-logo-start-page">
      <div class="logo-start-page"></div>
      <div class="logo-start-button">
        <span>${startText}</span>
      </div>
      <div class="logo-credits-button">${creditsText}</div>
    </div>
    `,
    },
    {
      height: `${window.innerHeight}`,
      width: `${window.innerWidth}`,
    }
  );

  const logout = createElement('div', {
    classList: ['logout-game'],
    onclick: () => {
      localStorage.removeItem(KEY_TOKEN);
      localStorage.removeItem(KEY_ID);
      window.location.reload();
    },
  });

  const attendance = createElement('div', {
    classList: ['attendance-per-year-game'],
    onclick: async () => {
      const res = await getAttendance();
      const { data } = res;
      createPopupAttendance(data);
    },
  });

  const body = document.querySelector('body') as HTMLBodyElement;
  body.innerText = '';
  body.append(logout, attendance, startPage);
  new LangSwitcher(langConfigs)

  const credits = document.querySelector('.logo-credits-button');
  credits?.addEventListener('click', createCredits);

  achievementsCreate({ id, token });
}

function createPopupAttendance(arr) {
  let positionAttendance = 0;
  let positionText = 8;

  const maxAttendance = Math.max(...arr.map((el) => el.allAttendance));

  const popup = createElement('div', {
    classList: ['popup-attendance-wrapper'],
    innerHTML: `
      <div class="popup-attendance-content">

        <div class="rope-popup-left"></div>
        <div class="rope-popup-right"></div>

        <div class="close-popup"></div>
        
        <figure>
          <figcaption>Game attendance over the year</figcaption>
          <svg class="full_graph">
              <title id="title">A bart chart showing game attendance over the year</title>
              ${arr
                .map(({ year, allAttendance }) => {
                  positionAttendance += 20;
                  positionText += 20;
                  const precent = ((maxAttendance - allAttendance) / maxAttendance) * 100;

                  return `
                  <g class="bar">
                    <rect width="${100 - precent}%" height="19" y="${positionAttendance}"></rect>
                    <text x="0" y="${positionText}" dy=".35em">${allAttendance}</text>
                    <text x="85%" y="${positionText}" dy=".35em">${year}</text>
                  </g>
                  `;
                })
                .join(' ')}
          </svg>
        </figure>
      
      </div>
    `,
    onclick: ({ target }) => {
      if (target.classList.contains('popup-attendance-wrapper')) {
        whileRaise(popup);
      }
      if (target.classList.contains('close-popup')) {
        whileRaise(popup);
      }
    },
  });

  whileLoad(popup, '../assets/interface/modal-bg.png');
}

export default createStartPage;
