import createElement from './createElement';
// import createSignPage from './create.sign';

function createStartPage() {
  const startPage = createElement('div', {
    classList: ['start-page'],
    innerHTML: `
      <div class="logo-start-page">
      </div>
    `,
  });

  const logout = createElement('div', {
    classList: ['logout-game'],
    onclick: () => {
      localStorage.removeItem('token');
      window.location.reload();
    },
  });

  startPage.append(logout);

  const body = document.querySelector('body');
  body.innerText = '';
  body.append(startPage);
}

export default createStartPage;
