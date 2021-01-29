import createSignPage from './utils/create.sign';
import createStartPage from './utils/create.start';
import handleAttendent from './backend/handleAttendent';
import achievementsCreate from '../achievements/create.achievements';
import { KEY_TOKEN, KEY_ID } from '../constants/constants';

const url = 'https://rs-clone.herokuapp.com/';

function runAuth(fn) {
  const token = localStorage.getItem(KEY_TOKEN);
  const id = localStorage.getItem(KEY_ID);
  const year = new Date().getFullYear();

  fetch(`${url}chart/${year}`)
    .then((res) => res.json())
    .then(handleAttendent);
  
  if (id) {
    fetch(`${url}users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(({ ok }) => {
      if (ok) {
        createStartPage();
        achievementsCreate({ id, token });
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
