import createElement from './createElement';

function createBgGame() {
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

  document.body.textContent = '';
  document.body.append(blurBg);
}

export default createBgGame;
