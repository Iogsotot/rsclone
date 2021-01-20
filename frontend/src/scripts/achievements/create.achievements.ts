import createElement from '../auth/utils/createElement';

function achievementsCreate() {
  const achievementsIcon = createElement('div', {
    classList: ['achievements-icon'],
  });
  
  document.body.append(achievementsIcon);
}

export default achievementsCreate;
