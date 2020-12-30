import createSignPage from './another/create.sign';
import createStartPage from './another/create.start';

function runAuth() {
  const token = localStorage.getItem('token');
  if (token) {
    createStartPage();
  } else {
    createSignPage();
  }
}

export default runAuth;
