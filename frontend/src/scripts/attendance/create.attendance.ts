import createElement from "../auth/utils/createElement";
import { whileLoad, whileRaise } from "../auth/utils/wait.while.loading";

function createPopupAttendance(arr) {
    console.log('all:', arr)
    let positionAttendance = -20;
    let positionText = 0;
  
    const maxAttendance = Math.max(...arr.map((el) => el.attendance));
  
    const popup = createElement('div', {
      classList: ['popup-attendance-wrapper'],
      innerHTML: `
        <div class="popup-attendance-content">
          <div class="close-popup"></div>
          
          <figure>
            <figcaption>Game attendance over the day</figcaption>
            <svg width="420" height="150" role="img">
                ${arr
                  .map(({ date, attendance }) => {
                    positionAttendance += 20;
                    positionText += 20;
                    const precent = ((maxAttendance - attendance) / maxAttendance) * 100;
  
                    return `
                    <g class="bar">
                      <rect width="${100 - precent}%" height="20px" y="${positionAttendance}"></rect>
                      <text x="0" y="${positionAttendance}" dy="${positionText}">${attendance}</text>
                    </g>
                    <text x="85%" y="${positionAttendance}" dy="${positionText}">${date}</text>
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

export default createPopupAttendance;
