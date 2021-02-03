import createElement from "../auth/utils/createElement";
import { whileLoad, whileRaise } from "../auth/utils/wait.while.loading";

function createPopupAttendance(arr) {
    console.log('all:', arr)
    let positionAttendance = 0;
  
    const maxAttendance = Math.max(...arr.map((el) => el.attendance));
    const popup = createElement('div', {
      classList: ['popup-attendance-wrapper'],
      innerHTML: `
        <div class="popup-attendance-content">
          <div class="close-popup"></div>
          
          <figure>
            <figcaption>Game attendance over the day</figcaption>
            <div class="day-attendance-content">
                ${arr
                  .map(({ date, attendance }) => {
                    positionAttendance += 20;
                    const precent = ((maxAttendance - attendance) / maxAttendance) * 100;
                    return `
                    <div class='day-attendance-info'>
                      <svg>
                        <rect width="${100 - precent}%" height="19"></rect>
                      </svg>
                      <strong style='color: #352824;'>${attendance}</strong>
                      <span style='color: #a27448;'>${date}</span>
                    </div>
                    `;
                  })
                  .join(' ')}
            </div>
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

export default createPopupAttendance;
