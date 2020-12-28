const SERVER = 'https://rs-clone.herokuapp.com';

async function signIn(user) {
  console.log(user);
}

async function signUp(user) {
  const url = `${SERVER}/users`;
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };

  const request = new Request(url, options);

  try {
    const response = await fetch(request);
    console.log('response:', response);
    const data = await response.json();
    console.log('data:', data);
  } catch (err) {
    console.log('catch:', err);
  }
}

export {
  signIn,
  signUp,
};
