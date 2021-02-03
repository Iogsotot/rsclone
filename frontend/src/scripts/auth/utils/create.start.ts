import createElement from './createElement';
import getAttendance from '../../attendance/backend/getAttendance';
import createCredits from '../../credits/create.credits';
import { KEY_ID, KEY_TOKEN } from '../../constants/constants';
import LangSwitcher, { LangConfig } from './LangSwitcher';
import createPopupAttendance from '../../attendance/create.attendance';

const langConfigs: LangConfig[] = [
  { lang: 'en', text: 'English' },
  { lang: 'ru', text: 'Русский' },
  { lang: 'uz', text: 'O\'zbekcha' },
]

function createStartPage() {
  const startPage = createElement(
    'div',
    {
      classList: ['start-page'],
      innerHTML: `
    <div class="wrapper-logo-start-page">
      <div class="logo-start-page"></div>
      <div class="logo-start-button">START</div>
      <div class="logo-credits-button">CREDITS</div>
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
  credits?.addEventListener('click', () => createCredits());
}

export default createStartPage;
