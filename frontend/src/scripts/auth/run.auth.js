import createSignPage from './create.sign';
import createStartPage from './create.start';

function runAuth() {
  const token = localStorage.getItem('token');
  if (token) {
    createStartPage();
  } else {
    createSignPage();
  }
}

export default runAuth;
