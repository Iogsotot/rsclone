import createSignPage from './another/create.sign';
import createStartPage from './another/create.start';
import handleAttendent from './backend/handleAttendent';

const url = 'https://rs-clone.herokuapp.com/';

function runAuth() {
  const token = localStorage.getItem('token');
  const year = new Date().getFullYear();

  fetch(`${url}chart/${year}`)
    .then((res) => res.json())
    .then(handleAttendent);

  if (token) {
    createStartPage();
    return true;
  }
  createSignPage();
  return false;
}

export default runAuth;
