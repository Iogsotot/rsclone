import createElement from './createElement';

function createSignPage() {
  const signPage = createElement('div', {
    classList: ['sign-kingdom-rush'],
    innerHTML: `
      <div class="sign-window">

        <div class="sign-info">
          <span class="sign-info-in active-sign-info">SIGN IN</span>
          <span class="sign-info-up">SIGN UP</span>
        </div>

        <form class="sign-form" name="sign-form">
          <div class="wrapper-username">
            <label for="email">Username</label>
            <input class="sign-username" id="email" required="">
          </div>
          <div class="wrapper-password">
            <label for="password">Password</label>
            <input
              class="sign-password"
              id="password"
              type="password"
              autocomplete="on"
              name="password"
              pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W|_])[a-zA-Z0-9_\W]{8,}$" required=""
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

  document.querySelector('body').append(signPage);

  const signIn = document.querySelector('.sign-info-in');
  const signUp = document.querySelector('.sign-info-up');
  const signSubmit = document.querySelector('.sign-in-submit');

  function handler({ target }) {
    signSubmit.value = target.textContent;
    signIn.classList.remove('active-sign-info');
    signUp.classList.remove('active-sign-info');
    target.classList.add('active-sign-info');
  }

  signIn.onclick = handler;
  signUp.onclick = handler;
}

export default createSignPage;
