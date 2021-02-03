import createElement from './createElement';
import { signUp, signIn } from '../../backend';
import langConfig from '../../layouts/langConfig';

function createSignPage() {
  // pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W|_])[a-zA-Z0-9_\W]{8,}$"
  const lang = window['lang'] || localStorage.getItem('lang') || 'en';
  const signInText = langConfig[`${lang}`].signIn.toUpperCase();
  const signUpText = langConfig[`${lang}`].signUp.toUpperCase();
  const nameText = langConfig[`${lang}`].name;
  const passwordText = langConfig[`${lang}`].password;
  const upperNameText = nameText[0].toUpperCase() + nameText.slice(1);
  const upperPasswordText = passwordText[0].toUpperCase() + passwordText.slice(1);
  const keepMeText = langConfig[`${lang}`].keepMe;

  const signPage = createElement(
    'div',
    {
      classList: ['sign-kingdom-rush'],
      innerHTML: `
      <div class="sign-window">

        <div class="sign-info">
          <span class="sign-info-in active-sign-info">${signInText}</span>
          <span class="sign-info-up">${signUpText}</span>
        </div>

        <form class="sign-form" name="signForm">
          <div class="wrapper-username">
            <input
              placeholder="${upperNameText}"
              class="sign-username"
              id="email" name="username"
              required=""
              autocomplete="off"
            >
          </div>
          <div class="wrapper-password">
            <input
              class="sign-password"
              placeholder="${upperPasswordText}"
              id="password"
              type="password"
              autocomplete="on"
              name="password"
              required=""
            >
          </div>
          <div class="keep-me">
            <input type="checkbox" id="scales" name="scales"
                  checked>
            <label for="scales">
              <div class="checkbox-image"></div>
              <div class="checkbox-text">${keepMeText}</div>
            </label>
          </div>
          <input class="sign-in-submit" type="submit" value="${signInText}">
        </form>
      </div>
    `,
    },
    {
      height: `${window.innerHeight}`,
      width: `${window.innerWidth}`,
    }
  );

  const responseInfo = createElement('div', {
    classList: ['response-info'],
  });

  const body = document.querySelector('body') as HTMLBodyElement;
  body.textContent = '';
  body.append(signPage);

  const signInfoIn = document.querySelector('.sign-info-in') as HTMLElement;
  const signInfoUp = document.querySelector('.sign-info-up') as HTMLElement;

  signInfoUp?.after(responseInfo);

  const signSubmit = document.querySelector('.sign-in-submit') as HTMLInputElement;

  function handler({ target }) {
    signSubmit.value = target.textContent;
    signInfoIn.classList.remove('active-sign-info');
    signInfoUp.classList.remove('active-sign-info');
    target.classList.add('active-sign-info');
  }

  signInfoIn.onclick = handler;
  signInfoUp.onclick = handler;

  signSubmit.onclick = (e) => {
    const { elements } = document.forms.namedItem('signForm') as HTMLFormElement;
    const username = (elements.namedItem('username') as HTMLInputElement).value;
    const password = (elements.namedItem('password') as HTMLInputElement).value;

    const active = document.querySelector('.active-sign-info') as HTMLSpanElement;
    const isIn = active.classList.contains('sign-info-in');
    const isUp = active.classList.contains('sign-info-up');

    if (username && password) {
      e.preventDefault();

      isIn && signIn({ login: username, password });
      isUp && signUp({ login: username, password });
    }
  };
}

export default createSignPage;
