import createElement from './createElement';

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

  const body = document.querySelector('body');
  body.innerText = '';
  body.append(logout, startPage);
}

export default createStartPage;
