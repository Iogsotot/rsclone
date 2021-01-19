import createStartPage from '../utils/create.start';

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
    const {
      data, token, login, ok,
    } = await response.json();

    if (ok) {
      responseInfo.innerHTML = `${login} has sign in`;

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
