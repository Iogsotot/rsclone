import createElement from './createElement';
import switchStartPageLang from './switch.start-page.lang';

export interface LangConfig {
  lang: string;
  text: string;
}

export default class LangSwitcher {
  configs: LangConfig[]
  switcherContainer: HTMLElement
  langCurrent: HTMLElement
  dropDown: HTMLElement

  constructor(configs: LangConfig[]) {
    this.configs = configs;
    this.switcherContainer = createElement('div', { classList: ['lang-switcher'] });
    this.langCurrent = createElement('div', { classList: ['lang-current', 'lang-item'] });
    this.dropDown = createElement('div', { classList: ['lang-dropdown'] });
  }

  init() {
    if (localStorage.getItem('lang')) {
      window['lang'] = localStorage.getItem('lang');
    } else {
      window['lang'] = 'en';
      localStorage.setItem('lang', window['lang']);
    }

    const currentLang = window['lang'];

    this.langCurrent.setAttribute('data-lang', currentLang);

    for (let i = 0; i < this.configs.length; i++) {
      if (this.configs[i].lang === currentLang) {
        this.langCurrent.innerHTML = this.langItemInner(this.configs[i]);
      } else {
        const lang = createElement('div', { classList: ['lang-selecting', 'lang-item'], 'data-lang': this.configs[i].lang });
        lang.innerHTML = this.langItemInner(this.configs[i]);
        this.dropDown.append(lang);
      }
    }

    this.switcherContainer.append(this.langCurrent);
    this.switcherContainer.append(this.dropDown);

    this.dropDown.addEventListener('click', this.clickHandler);

    return this.switcherContainer;
  }

  langItemInner(conf: LangConfig) {
    return `
      <img class="lang-flag" src="../assets/auth/${conf.lang}.png">
      <p class="lang-text">${conf.text}</p>
    `;
  }

  clickHandler = (e) => {
    let selectingLang = e.target.closest('.lang-selecting');

    selectingLang.classList.remove('lang-selecting');
    this.langCurrent.classList.remove('lang-current');

    selectingLang.remove();
    this.langCurrent.remove();

    const tmp = this.langCurrent;
    this.langCurrent = selectingLang;
    selectingLang = tmp;

    selectingLang.classList.add('lang-selecting');
    this.langCurrent.classList.add('lang-current');

    window['lang'] = this.langCurrent.dataset.lang;
    localStorage.setItem('lang', window['lang']);

    switchStartPageLang(window['lang']);

    this.switcherContainer.prepend(this.langCurrent);
    this.dropDown.append(selectingLang);
  }
}
