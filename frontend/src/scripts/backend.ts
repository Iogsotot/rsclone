import { startApp } from './App';
import createStartPage from './auth/utils/create.start';

const SERVER = 'https://rs-clone.herokuapp.com';

async function signIn(user) {
  const responseInfo = document.querySelector('.response-info') as HTMLElement;

  const url = `${SERVER}/login`;
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };

  try {
    const { checked } = document.forms
      .namedItem('signForm')
      ?.elements.namedItem('scales') as HTMLInputElement;

    const form = document.querySelector('.sign-form') as HTMLFormElement;

    const response = await fetch(url, options);

    const { data, token, login, ok, id } = await response.json();

    if (ok) {
      responseInfo.innerHTML = `${login} has sign in`;

      localStorage.setItem('id', id);
      if (checked) {
        localStorage.setItem('token', token);
      }

      const isStats = await getCurrentPlayerStats({ id, token });
      console.log('isStats:', isStats);

      if (!isStats.ok) {
        createStats({ id, token });
      } else {
        const isUpdate = await setCurrentPlayerStats({
          id,
          token,
          body: { ...isStats.data, gameLogInCount: isStats.data.gameLogInCount + 1 },
        });
        console.log('isUpdate:', isUpdate);
      }

      setTimeout(() => {
        createStartPage();
        document.querySelector('.logo-start-button')?.addEventListener('click', startApp);
      }, 300);
    } else {
      responseInfo.textContent = data;
      form.reset();
    }
  } catch (err) {
    console.log(err);
    responseInfo.textContent = err.name;
  }
}

async function getCurrentPlayerStats({ id, token }) {
  const response = await fetch(`${SERVER}/users/${id}/stats/current`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
}

// main function for update stat
async function setCurrentPlayerStats({ id, token, body }) {
  const response = await fetch(`${SERVER}/users/${id}/stats/`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response.json();
}

async function createStats({ id, token }) {
  const url = `${SERVER}/users/${id}/stats`;
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId: id }),
  };

  const response = await fetch(url, options);
  const result = await response.json();
  console.log('result createStats():', result);
}

async function signUp(user) {
  const url = `${SERVER}/logup`;
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };

  const responseInfo = document.querySelector('.response-info') as HTMLElement;

  const request = new Request(url, options);

  try {
    const signInfoIn = document.querySelector('.sign-info-in');
    const signInfoUp = document.querySelector('.sign-info-up');
    const signSubmit = document.querySelector('.sign-in-submit') as HTMLInputElement;
    const form = document.querySelector('.sign-form') as HTMLFormElement;

    const response = await fetch(request);
    const { data, ok } = await response.json();
    console.log(data, ok);

    if (ok) {
      responseInfo.innerHTML = `${data.login} has sign up`;
      form.reset();

      setTimeout(() => {
        signInfoIn?.classList.add('active-sign-info');
        signInfoUp?.classList.remove('active-sign-info');
        signSubmit.value = 'SIGN IN';
      }, 300);
    } else {
      responseInfo.textContent = data;
      form.reset();
    }
  } catch (err) {
    responseInfo.textContent = err.name;
  }
}

export { signIn, signUp };

// {
//   "UserID": {
//     "gameProgress": 0,
//     "gameLogInCount": 0,
//     "killedEnemies": 0,
//     "builtTowers": 0,
//     "soldTowers": 0,
//     "ironModeProgress": 0,

//     "achievements": {
//       "firstAsterisk": false,
//       "completeWin": false,
//       "firstBlood": false,
//       "GreatDefender": false,
//       "IronDefender": false,
//       "killer": false,
//       "seller": false,
//       "builder": false
//     }
//   }
// }


export {getCurrentPlayerStats, setCurrentPlayerStats}