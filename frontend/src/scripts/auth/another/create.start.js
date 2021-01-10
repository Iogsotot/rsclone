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
      <div class="popup-attendance-content">

        <div class="close-popup"></div>
        
        <div class="full_graph">
          <svg class="full_graph" viewBox="0 0 500 400">
            <path d="M 90 90 V 310 H 450" stroke="black" stroke-width="3" fill="transparent"></path>
            <path d="M 444 314 L 450 310 444 306" stroke="black" stroke-width="3" fill="transparent"></path>
            <path d="M 86 97 L 90 90 94 97" stroke="black" stroke-width="3" fill="transparent"></path>
            <path d="M 100 300 L 100 300 L 400 300" stroke="black" stroke-width="2" fill="transparent"></path>
            <circle cx="100" cy="250" r="5" fill="red" stroke="black" stroke-width="2"></circle>
            <circle cx="400" cy="300" r="5" fill="red" stroke="black" stroke-width="2"></circle>
            <g>
              <circle class="full_point__3JOJV" cx="100" cy="300" r="5"></circle>
              <g class="full_text__2EJxV">
                <rect x="45" y="330" rx="5" ry="5" width="150" height="60" style="fill: white; stroke: black; opacity: 0.8;"></rect>
                <text x="60" y="350">10-01-2021</text>
                <text x="60" y="365">Карточек: 0</text>
                <text x="60" y="380">Новых слов: 0</text>
              </g>
            </g>
            <g>
              <circle class="full_point__3JOJV" cx="400" cy="300" r="5"></circle>
              <g class="full_text__2EJxV">
                <rect x="345" y="330" rx="5" ry="5" width="150" height="60" style="fill: white; stroke: black; opacity: 0.8;"></rect>
                <text x="360" y="350">10-01-2021</text>
                <text x="360" y="365">Карточек: 0</text>
                <text x="360" y="380">Новых слов: 0</text>
              </g>
            </g>
          </svg>
        </div>
      
      </div>
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
