import createElement from './createElement';
import getAttendance from '../backend/getAttendance';

function createStartPage() {
  const startPage = createElement('div', {
    classList: ['start-page'],
    innerHTML: `
      <div class="logo-start-page">
      </div>
    `,
  });

  const logout = createElement('div', {
    classList: ['logout-game'],
    onclick: () => {
      localStorage.removeItem('token');
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

  const body = document.querySelector('body');
  body.innerText = '';
  body.append(logout, attendance, startPage);
}

function createPopupAttendance({ year, allAttendance }) {
  const popup = createElement('div', {
    classList: ['popup-attendance-wrapper'],
    innerHTML: `
      <div class="close-popup"></div>
      <div class="popup-attendance-content">${allAttendance}</div>
    `,
    onclick: ({ target }) => {
      if (target.classList.contains('popup-attendance-wrapper')) {
        popup.remove();
      }
    }
  })

  document.querySelector('body').append(popup);
}

export default createStartPage;
