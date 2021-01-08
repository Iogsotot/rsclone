export default function createElement(type, attributes = {}, styles = {}) {
  const element = document.createElement(type);
  Object.keys(attributes).forEach((key) => {
    if (key === 'classList') {
      element.classList.add(...attributes[key]);
    } else if (/data-/.test(key)) {
      element.setAttribute(key, attributes[key]);
    } else {
      element[key] = attributes[key];
    }
  });
  Object.keys(styles).forEach((key) => {
    element.style[key] = styles[key];
  });
  return element;
}
