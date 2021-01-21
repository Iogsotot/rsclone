import createElement from '../auth/utils/createElement';

const SERVER = 'https://rs-clone.herokuapp.com';

async function getCurrentPlayerStats({ id, token }) {
  const response = await fetch(`${SERVER}/users/${id}/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

async function achievementsCreate({ id, token }) {
  const stats = await getCurrentPlayerStats({ id, token });
  console.log('stats all:', stats);

  const achievementsIcon = createElement('div', {
    classList: ['achievements-icon'],
  });
  
  document.body.append(achievementsIcon);
}

export default achievementsCreate;
