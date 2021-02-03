import createSignPage from './utils/create.sign';
import createStartPage from './utils/create.start';
import handleAttendent from '../attendance/backend/handleAttendent';

import { KEY_TOKEN, KEY_ID } from '../constants/constants';

const url = 'https://rs-clone.herokuapp.com/';

function runAuth(fn) {
  const token = localStorage.getItem(KEY_TOKEN);
  const id = localStorage.getItem(KEY_ID);

  handleAttendent();

  if (id) {
    fetch(`${url}users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(({ ok }) => {
      if (ok) {
        createStartPage({ id, token });
        document.querySelector('.logo-start-button')?.addEventListener('click', fn);
      } else {
        createSignPage();
      }
    });
  } else {
    createSignPage();
  }
}

export default runAuth;
