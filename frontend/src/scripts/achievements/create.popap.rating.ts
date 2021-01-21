import createElement from '../auth/utils/createElement';

function popapRatingCreate(stats) {
  const popup = createElement('div', {
    classList: ['popup-attendance-wrapper', 'hide'],
    innerHTML: `
      <div class="popup-attendance-content">
        <div class="close-popup"></div>
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
}

export default popapRatingCreate;
