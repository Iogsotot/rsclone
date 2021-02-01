import createElement from '../auth/utils/createElement';
import { whileLoad, whileRaise } from '../auth/utils/wait.while.loading';
import popapProfileCreate from './create.popap.profile';
import popapRatingCreate from './create.popap.rating';
import langConfig from '../layouts/langConfig';

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

async function getPlayers({ token }) {
  const response = await fetch(`${SERVER}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

function popapSelectCreate({ stats, players, id }) {
  const popup = createElement('div', {
    classList: ['popup-achievements-wrapper'],
    innerHTML: `
      <div class="popup-achievements-content">
        <div class="title-rating">Statistics</div>
        <div class="close-achievements-popup"></div>
      </div>
    `,
    onclick: ({ target }) => {
      if (target.classList.contains('popup-achievements-wrapper')) {
        whileRaise(popup);
      }
      if (target.classList.contains('close-achievements-popup')) {
        whileRaise(popup);
      }
    },
  });

  const profile = createElement('div', {
    classList: ['achievements-content-profile-button'],
    textContent: 'Profile',
    onclick: () => {
      popup.remove();
      const [ userStat ] = stats.data.filter(({ userId }) => userId === id );
      popapProfileCreate(userStat);
    }
  });

  const rating = createElement('div', {
    classList: ['achievements-content-rating-button'],
    textContent: 'Overall rating',
    onclick: () => {
      popup.remove();
      popapRatingCreate(stats.data, players.data);
    }
  });

  whileLoad(popup, '../assets/auth/achievement_board.png');

  document.querySelector('.popup-achievements-content')?.append(profile, rating);
}

function achievementsCreate({ id, token }) {
  const lang = window['lang'] || localStorage.getItem('lang') || 'en';
  const achievementsText = langConfig[`${lang}`].achievements;

  const achievementsIcon = createElement('div', {
    classList: ['achievements-icon'],
    textContent: `${achievementsText}`,
    onclick: async () => {
      const stats = await getCurrentPlayerStats({ id, token });
      const players = await getPlayers({ token });
      popapSelectCreate({ stats, players, id });
    }
  });
  
  document.body.append(achievementsIcon);
}

export default achievementsCreate;
