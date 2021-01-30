import { startApp } from '../../App';
import { KEY_ID, KEY_TOKEN } from '../../constants/constants';

const id = localStorage.getItem(KEY_ID);
const token = localStorage.getItem(KEY_TOKEN);

function keysHandler(event) {
  console.log(event);

  switch (event.key) {
    case "Down": // IE/Edge specific value
    case "ArrowDown":
      // Do something for "down arrow" key press.
      break;
    case "Up": // IE/Edge specific value
    case "ArrowUp":
      // Do something for "up arrow" key press.
      break;
    case "Left": // IE/Edge specific value
    case "ArrowLeft":
      // Do something for "left arrow" key press.
      break;
    case "Right": // IE/Edge specific value
    case "ArrowRight":
      // Do something for "right arrow" key press.
      break;
    case "Enter":
      // startApp();
      break;
    case "Esc": // IE/Edge specific value
    case "Escape":
      // Do something for "esc" key press.
      break;
    default:
      return; // Quit when this doesn't handle the key event.
  }

  event.preventDefault();
}

export default keysHandler;
