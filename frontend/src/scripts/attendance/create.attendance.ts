import createElement from "../auth/utils/createElement";
import { whileLoad, whileRaise } from "../auth/utils/wait.while.loading";

function createPopupAttendance(arr) {
    console.log('all:', arr)
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

export default createPopupAttendance;
