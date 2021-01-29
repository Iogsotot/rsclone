import createElement from './createElement';

function whileLoad(element, imgUrl) {
  const loader = createElement('div', {
    classList: ['loader'],
  });

  element.append(loader);
  document.querySelector('body')?.append(element);

  const preloaderImg = document.createElement('img');
  preloaderImg.src = imgUrl;

  preloaderImg.addEventListener('load', () => {
    loader.remove();
    element.children[0].classList.add('show-top');
  });
}

function whileRaise(element) {
  element.children[0].classList.remove('show-top');
  element.children[0].addEventListener("transitionend", () => element.remove(), false);
}

export { whileLoad, whileRaise };
