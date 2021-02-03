import createElement from './createElement';

function createBgGame() {
  document.querySelector('.logout-game')?.remove()
  document.querySelector('.attendance-per-year-game')?.remove()
  document.querySelector('.start-page')?.remove()
  document.querySelector('.achievements-icon')?.remove()
  document.querySelector('.lang-switcher')?.remove()

  if(document.querySelector('.blur-bg')) return

  const blurBg = createElement(
    'div',
    {
      classList: ['blur-bg'],
    },
    {
      height: `${window.innerHeight}`,
      width: `${window.innerWidth}`,
    }
  );

  // document.body.textContent = '';
  document.body.prepend(blurBg);
}

export default createBgGame;
