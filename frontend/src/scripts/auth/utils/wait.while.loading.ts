import createElement from './createElement';

function whileLoad(element, imgUrl) {
  const loader = createElement('div', {
    classList: ['loader'],
  });
  const preloaderImg = document.createElement('img');
  preloaderImg.src = imgUrl;

  preloaderImg.addEventListener('load', () => {
    loader.remove();
    element.classList.remove('hide');
  });
}

export default whileLoad;
