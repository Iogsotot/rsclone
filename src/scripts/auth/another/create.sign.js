import createElement from './createElement';
import { signUp, signIn } from '../backend/backend';

function createSignPage() {
  // pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W|_])[a-zA-Z0-9_\W]{8,}$"

  const signPage = createElement('div', {
    classList: ['sign-kingdom-rush'],
    innerHTML: `
      <div class="sign-window">

        <div class="sign-info">
          <span class="sign-info-in active-sign-info">SIGN IN</span>
          <span class="sign-info-up">SIGN UP</span>
        </div>

        <form class="sign-form" name="signForm">
          <div class="wrapper-username">
            <label for="email">Username</label>
            <input class="sign-username" id="email" name="username" required="">
          </div>
          <div class="wrapper-password">
            <label for="password">Password</label>
            <input
              class="sign-password"
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
            <label for="scales">Keep Me Signed In</label>
          </div>
          <input class="sign-in-submit" type="submit" value="SIGN IN">
        </form>
        <div class="forgot-password">
          <p>Forgot Password</p>
        </div>
      </div>
    `,
  });

  const responseInfo = createElement('div', {
    classList: ['response-info'],
  });

  document.querySelector('body').append(signPage);

  const signInfoIn = document.querySelector('.sign-info-in');
  const signInfoUp = document.querySelector('.sign-info-up');

  signInfoUp.after(responseInfo);

  const signSubmit = document.querySelector('.sign-in-submit');

  function handler({ target }) {
    signSubmit.value = target.textContent;
    signInfoIn.classList.remove('active-sign-info');
    signInfoUp.classList.remove('active-sign-info');
    target.classList.add('active-sign-info');
  }

  signInfoIn.onclick = handler;
  signInfoUp.onclick = handler;

  signSubmit.onclick = (e) => {
    const { elements } = document.forms.signForm;
    const { value } = e.target;

    const username = elements.username.value;
    const password = elements.password.value;

    if (username && password) {
      e.preventDefault();

      if (value === 'SIGN UP') {
        signUp({ login: username, password });
      }
      if (value === 'SIGN IN') {
        signIn({ login: username, password });
      }
    }
  };
}

export default createSignPage;
