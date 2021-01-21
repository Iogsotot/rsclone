import createElement from '../auth/utils/createElement';
import whileLoad from '../auth/utils/wait.while.loading';
import popapProfileCreate from './create.popap.profile';
import popapRatingCreate from './create.popap.profile';

const SERVER = 'https://rs-clone.herokuapp.com';

async function getCurrentPlayerStats({ id, token }) {
  const response = await fetch(`${SERVER}/users/${id}/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

function popapSelectCreate(stats) {
  console.log('stats all:', stats);

  const profile = createElement('div', {
    classList: ['achievements-content-profile-button'],
    textContent: 'Profile',
    onclick: () => {
      popapProfileCreate(stats);
    }
  });

  const rating = createElement('div', {
    classList: ['achievements-content-rating-button'],
    textContent: 'Overall rating',
    onclick: () => {
      popapRatingCreate(stats);
    }
  });

  const popup = createElement('div', {
    classList: ['popup-achievements-wrapper', 'hide'],
    innerHTML: `
      <div class="popup-achievements-content">
        <div class="close-achievements-popup"></div>
      </div>
    `,
    onclick: ({ target }) => {
      if (target.classList.contains('popup-achievements-wrapper')) {
        popup.remove();
      }
      if (target.classList.contains('close-achievements-popup')) {
        popup.remove();
      }
    },
  });

  whileLoad(popup, '../assets/auth/achievement_board.png');

  document.body.append(popup);
  document.querySelector('.popup-achievements-content')?.append(profile, rating);
}

function achievementsCreate({ id, token }) {

  const achievementsIcon = createElement('div', {
    classList: ['achievements-icon'],
    onclick: async () => {
      const stats = await getCurrentPlayerStats({ id, token });
      popapSelectCreate(stats);
    }
  });
  
  document.body.append(achievementsIcon);
}

export default achievementsCreate;
