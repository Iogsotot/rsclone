import createSignPage from './another/create.sign';
import createStartPage from './another/create.start';

function runAuth() {
  // signIN({ login: 'inex', password: 'inexpass' });
  const token = localStorage.getItem('token');
  if (token) {
    createStartPage();
  } else {
    createSignPage();
  }
}

export default runAuth;
