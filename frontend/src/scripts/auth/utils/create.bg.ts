import createElement from './createElement';

function createBgGame() {
  document.querySelector('main')?.remove();
  document.querySelector('footer')?.remove();

  if (document.querySelector('.blur-bg')) { return; }

  const blurBg = createElement(
    'div',
    {
      classList: ['blur-bg'],
    },
    {
      height: `${window.innerHeight}`,
      width: `${window.innerWidth}`,
    },
  );

  // document.body.textContent = '';
  document.body.append(blurBg);
}

export default createBgGame;
