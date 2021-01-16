import createStartPage from '../utils/create.start';
import PlayerStats from '../../components/stats/PlayerStats';

const SERVER = 'https://rs-clone.herokuapp.com';

async function signIn(user) {
  const responseInfo = document.querySelector('.response-info');

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
    const { checked } = document.forms.signForm.elements.scales;
    const form = document.querySelector('.sign-form');

    const response = await fetch(url, options);
    const {
      data, token, login, ok, id,
    } = await response.json();

    if (ok) {
      responseInfo.innerHTML = `${login} has sign in`;

      const isStats = await checkStats(id);
      console.log('isStats:', isStats);
      console.log(new PlayerStats(isStats.data));

      if (!isStats.ok) {
        createStats(id);
      }

      if (checked) {
        localStorage.setItem('token', token);
      }

      setTimeout(() => {
        createStartPage();
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

async function checkStats(userId) {
  const response = await fetch(`${SERVER}/users/${userId}/stats/current`);
  return response.json();
}

async function createStats(userId) {
  const url = `${SERVER}/users/${userId}/stats`;
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  };

  const response = await fetch(url, options);
  const result = await response.json();
  console.log('result:', result);
}

async function signUp(user) {
  const url = `${SERVER}/users`;
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };

  const responseInfo = document.querySelector('.response-info');

  const request = new Request(url, options);

  try {
    const signInfoIn = document.querySelector('.sign-info-in');
    const signInfoUp = document.querySelector('.sign-info-up');
    const signSubmit = document.querySelector('.sign-in-submit');
    const form = document.querySelector('.sign-form');

    const response = await fetch(request);
    const { data, ok } = await response.json();
    console.log(data, ok);

    if (ok) {
      responseInfo.innerHTML = `${data.login} has sign up`;
      form.reset();

      setTimeout(() => {
        signInfoIn.classList.add('active-sign-info');
        signInfoUp.classList.remove('active-sign-info');
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

export {
  signIn,
  signUp,
};
