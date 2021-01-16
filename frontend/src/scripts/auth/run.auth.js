import createSignPage from './utils/create.sign';
import createStartPage from './utils/create.start';
import handleAttendent from './backend/handleAttendent';

const url = 'https://rs-clone.herokuapp.com/';

function runAuth() {
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');
  const year = new Date().getFullYear();

  fetch(`${url}chart/${year}`)
    .then((res) => res.json())
    .then(handleAttendent);

  fetch(`${url}users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(({ ok }) => {
    console.log('auth:', ok);
    if (ok) {
      createStartPage();
    } else {
      createSignPage();
    }
  });
}

export default runAuth;
