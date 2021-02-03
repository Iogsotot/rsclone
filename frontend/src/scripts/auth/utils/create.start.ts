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
  const body = document.querySelector('body') as HTMLBodyElement;
  body.innerText = '';
  const main = createElement('main');

  new LangSwitcher(langConfigs);

  const lang = window['lang'] || localStorage.getItem('lang') || 'en';
  const startText = langConfig[`${lang}`].start.toUpperCase();
  const creditsText = langConfig[`${lang}`].credits.toUpperCase();
  
  const startPage = createElement(
    'div',
    {
      classList: ['start-page'],
      innerHTML: `
    <div class="wrapper-logo-start-page">
      <div class="logo-start-page"></div>
      <div class="logo-start-button">${startText}</div>
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

  const footer = createElement('footer', {
    classList: ['kingdom-rush-footer'],
    innerHTML: `
      <div class="the-rolling-scopes">
        <a href="https://rs.school/js/" class="rss"></a>
      </div>

      <div class="wrapper-team-people">
        <div class="team-people">
          <a class="team-link"href="https://github.com/Iogsotot">
            <div class="avatar Iogsotot"></div>
            <div>IogSotot</div>
          </a>
        </div>
        <div class="team-people">
          <a class="team-link"href="https://github.com/DenisAfa">
            <div class="avatar DenisAfa"></div>
            <div>DenisAfa</div>
          </a>
        </div>
        <div class="team-people">
          <a class="team-link"href="https://github.com/Abdulloh76">
            <div class="avatar Abdulloh76"></div>
            <div>Abdulloh76</div>
          </a>
        </div>
        <div class="team-people">
          <a class="team-link"href="https://github.com/mrINEX">
            <div class="avatar mrINEX"></div>
            <div>mrINEX</div>
          </a>
        </div>
      </div>

      <div class="year-create">2021</div>
    `
  });

  main.append(logout, attendance, startPage);

  body.append(main, footer);

  const credits = document.querySelector('.logo-credits-button');
  credits?.addEventListener('click', createCredits);

  achievementsCreate({ id, token });
}


function createPopupAttendance(arr) {
  let positionAttendance = 0;
  let positionText = 8;

  const lang = window['lang'] || localStorage.getItem('lang') || 'en';
  const attendanceOverYearText = langConfig[`${lang}`].attendanceOverYear;

  const maxAttendance = Math.max(...arr.map((el) => el.allAttendance));

  const popup = createElement('div', {
    classList: ['popup-attendance-wrapper'],
    innerHTML: `
      <div class="popup-attendance-content">
        <div class="close-popup"></div>
        <figure>
          <figcaption>${attendanceOverYearText}</figcaption>
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
