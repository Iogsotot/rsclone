import createElement from './createElement';

function createStartPage() {
  const startPage = createElement('div', {
    classList: ['start-page'],
  });
  const body = document.querySelector('body');
  body.innerText = '';
  body.append(startPage);
}

export default createStartPage;
