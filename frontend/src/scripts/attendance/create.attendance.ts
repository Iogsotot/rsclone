import createElement from "../auth/utils/createElement";
import { whileLoad, whileRaise } from "../auth/utils/wait.while.loading";

function createPopupAttendance(arr) {
    const maxAttendance = Math.max(...arr.map((el) => el.attendance));
    const popup = createElement('div', {
      classList: ['popup-attendance-wrapper'],
      innerHTML: `
        <div class="popup-attendance-content">
          <div class="close-popup"></div>
          
          <div class="title-attandence-popap">Game attendance over the day</div>
          <div class="wrapper-attendance">
            <div class="day-attendance-content">
                ${arr
                  .map(({ date, attendance }) => {
                    const precent = ((maxAttendance - attendance) / maxAttendance) * 100;
                    return `
                    <div class='day-attendance-info'>
                      <svg class='bar'>
                        <rect width="${100 - precent}%" height="19"></rect>
                        <text x="5px" y="11px" dy=".35em">${(100 - precent).toFixed(2)}%</text>
                      </svg>
                      <strong style='color: #352824;'>${attendance}</strong>
                      <span style='color: #a27448;'>${date}</span>
                    </div>
                    `;
                  })
                  .join(' ')}
            </div>
          </div>
        
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

export default createPopupAttendance;
