import createElement from './createElement';

function whileLoad(element, imgUrl) {
  const loader = createElement('div', {
    classList: ['loader'],
  });

  document.querySelector('.start-page')?.append(loader);
  document.querySelector('body')?.append(element);

  const preloaderImg = document.createElement('img');
  preloaderImg.src = imgUrl;

  preloaderImg.addEventListener('load', () => {
    loader.remove();
    element.children[0].classList.add('show-top');
  });
}

export default whileLoad;
