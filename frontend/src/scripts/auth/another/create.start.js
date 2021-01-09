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

  const attendance = createElement('div', {
    classList: ['attendance-per-year-game'],
    onclick: () => {
      console.log('run get data url');
    },
  });

  const body = document.querySelector('body');
  body.innerText = '';
  body.append(logout, attendance, startPage);
}

export default createStartPage;
