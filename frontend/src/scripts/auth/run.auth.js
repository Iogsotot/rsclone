import createSignPage from './utils/create.sign';
import createStartPage from './utils/create.start';

function runAuth() {
  const token = localStorage.getItem('token');
  if (token) {
    createStartPage();
    return true;
  }
  createSignPage();
  return false;
}

export default runAuth;
