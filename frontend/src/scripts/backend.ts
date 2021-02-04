import { startApp } from './App';
import createStartPage from './auth/utils/create.start';
import { KEY_TOKEN, KEY_ID } from './constants/constants';
import langConfig from './layouts/langConfig';

const SERVER = 'https://rs-clone.herokuapp.com';

async function signIn(user) {
  const lang = window['lang'] || localStorage.getItem('lang') || 'en';
  const hasSignInText = langConfig[`${lang}`].hasSignIn;

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
      responseInfo.innerHTML = `${login} ${hasSignInText}`;

      localStorage.setItem(KEY_ID, id);
      localStorage.setItem(KEY_TOKEN, token);
      
      if (!checked) {
        window.addEventListener('unload', function() {
          localStorage.removeItem(KEY_ID);
          localStorage.removeItem(KEY_TOKEN);
        });
      }

      const isStats = await getCurrentPlayerStats({ id, token });

      if (!isStats.ok) {
        createStats({ id, token, login });
      } else {
        setCurrentPlayerStats({
          id,
          token,
          body: { ...isStats.data, gameLogInCount: isStats.data.gameLogInCount + 1 },
        });
      }
      
      document.body.textContent = '';
      createStartPage({ id, token });
      document.querySelector('.logo-start-button')?.addEventListener('click', startApp);
    } else {
      responseInfo.textContent = data;
      form.reset();
    }
  } catch (err) {
    responseInfo.textContent = err.name;
  }
}

async function getCurrentPlayerStats({ id, token }) {
  try {
    const response = await fetch(`${SERVER}/users/${id}/stats/current`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  } catch(err) {
    return { data: err, ok: false };
  }
}

async function setCurrentPlayerStats({ id, token, body }) {
  try {
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
  } catch(err) {
    return { data: err, ok: false };
  }
}

async function createStats({ id, token, login }) {
  try {
    const url = `${SERVER}/users/${id}/stats`;
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: id, login }),
    };

    const response = await fetch(url, options);
    return response.json();
  } catch(err) {
    return { data: err, ok: false };
  }
}

async function signUp(user) {
  const lang = window['lang'] || localStorage.getItem('lang') || 'en';
  const hasSignUpText = langConfig[`${lang}`].hasSignUp;
  const signInText = langConfig[`${lang}`].signIn.toUpperCase();
  const signUpText = langConfig[`${lang}`].signUp.toUpperCase();

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

    if (ok) {
      responseInfo.innerHTML = `${data.login} ${hasSignUpText}`;
      form.reset();

      setTimeout(() => {
        signInfoIn?.classList.add('active-sign-info');
        signInfoUp?.classList.remove('active-sign-info');
        signSubmit.value = signInText;
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

export { getCurrentPlayerStats, setCurrentPlayerStats };
