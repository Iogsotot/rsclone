import createElement from './createElement';
import { signUp, signIn } from '../../backend';

function createSignPage() {
  // pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W|_])[a-zA-Z0-9_\W]{8,}$"

  const signPage = createElement(
    'div',
    {
      classList: ['sign-kingdom-rush'],
      innerHTML: `
      <div class="sign-window">

        <div class="sign-info">
          <span class="sign-info-in active-sign-info">SIGN IN</span>
          <span class="sign-info-up">SIGN UP</span>
        </div>

        <form class="sign-form" name="signForm">
          <div class="wrapper-username">
            <input placeholder="Name" class="sign-username" id="email" name="username" required="">
          </div>
          <div class="wrapper-password">
            <input
              class="sign-password"
              placeholder="Password"
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
              Keep Me Signed In
            </label>
          </div>
          <input class="sign-in-submit" type="submit" value="SIGN IN">
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
    const { value } = e.target as HTMLInputElement;

    const username = (elements.namedItem('username') as HTMLInputElement).value;
    const password = (elements.namedItem('password') as HTMLInputElement).value;

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
