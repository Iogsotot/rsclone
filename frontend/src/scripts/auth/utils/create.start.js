import createElement from './createElement';
import getAttendance from '../backend/getAttendance';

function createStartPage() {
  const startPage = createElement('div', {
    classList: ['start-page'],
    innerHTML: `
      <div class="logo-start-page">
      </div>
    `,
  }, {
    height: `${window.innerHeight}`,
    width: `${window.innerWidth}`,
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

  const blurBg = createElement('div', {
    classList: ['blur-bg'],
  }, {
    height: `${window.innerHeight}`,
    width: `${window.innerWidth}`,
  });

  const body = document.querySelector('body');
  body.innerText = '';
  body.append(logout, attendance, startPage);
}

function createPopupAttendance(arr) {
  let positionAttendance = 0;
  let positionText = 8;

  const maxAttendance = Math.max(...arr.map((el) => el.allAttendance));

  const popup = createElement('div', {
    classList: ['popup-attendance-wrapper'],
    innerHTML: `
      <div class="popup-attendance-content">

        <div class="close-popup"></div>
        
        <figure>
          <figcaption>Game attendance over the year</figcaption>
          <svg class="full_graph">
              <title id="title">A bart chart showing game attendance over the year</title>
              ${arr.map(({ year, allAttendance }) => {
                positionAttendance += 20;
                positionText += 20;
                const precent = ((maxAttendance - allAttendance) / maxAttendance) * 100;

                return (
                  `
                  <g class="bar">
                    <rect width="${100 - precent}%" height="19" y="${positionAttendance}"></rect>
                    <text x="0" y="${positionText}" dy=".35em">${allAttendance} attendance [${year} year]</text>
                  </g>
                  `
                );
              }).join(' ')}
          </svg>
        </figure>
      
      </div>
    `,
    onclick: ({ target }) => {
      if (target.classList.contains('popup-attendance-wrapper')) {
        popup.remove();
      }
      if (target.classList.contains('close-popup')) {
        popup.remove();
      }
    },
  });

  document.querySelector('body').append(popup);
}

export default createStartPage;
