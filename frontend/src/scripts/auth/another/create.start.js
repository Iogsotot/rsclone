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

function createPopupAttendance(arr) {
  console.log(arr);
  const popup = createElement('div', {
    classList: ['popup-attendance-wrapper'],
    innerHTML: `
      <div class="popup-attendance-content">

        <div class="close-popup"></div>
        
        <div class="full_graph">
          <svg class="full_graph">
              <title id="title">A bart chart showing game attendance over the year</title>
              ${arr.map(({ year, allAttendance }) => `
              <g class="bar">
                <rect width="${allAttendance}" height="19"></rect>
                <text x="0" y="9.5" dy=".35em">${allAttendance}</text>
                <text x="${allAttendance + 10}" y="9.5" dy=".35em">${year} year</text>
              </g>
              `).join(' ')}
          </svg>
        </div>
      
      </div>
    `,
    onclick: ({ target }) => {
      if (target.classList.contains('popup-attendance-wrapper')) {
        popup.remove();
      }
    },
  });

  document.querySelector('body').append(popup);
}

export default createStartPage;
