import createElement from '../auth/utils/createElement';
import whileLoad from '../auth/utils/wait.while.loading';

function popapRatingCreate(stats) {
  const popup = createElement('div', {
    classList: ['popup-rating-wrapper', 'hide'],
    innerHTML: `
      <div class="popup-rating-content">
        <div class="close-rating-popup"></div>
      </div>
    `,
    onclick: ({ target }) => {
      if (target.classList.contains('popup-rating-wrapper')) {
        popup.remove();
      }
      if (target.classList.contains('popup-rating-wrapper')) {
        popup.remove();
      }
    },
  });

  whileLoad(popup, '../assets/modal-bg/start-modal-bg.png');
}

export default popapRatingCreate;
