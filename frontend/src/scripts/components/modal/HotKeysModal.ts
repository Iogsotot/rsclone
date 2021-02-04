import CustomModal from './CustomModal';
import langConfig from '../../layouts/langConfig';

export default class HotKeysModal extends CustomModal {
  lang: string

  constructor(scene: Phaser.Scene) {
    super(scene, 'hotkeys-modal', `${langConfig[`${window['lang']}`].hotkeysTitle}`);

    this.slideOut();
    this.closeModalBtn.setInteractive().on('pointerup', () => this.slideOut());

    this.generateTexts();
  }

  generateTexts() {
    this.lang = window['lang'];
    const keysConfigs = langConfig[`${window['lang']}`].hotkeys;

    const xStart = this.bgImage.x / 2 - this.bgImage.width / 2 + 85;
    const yStart = this.bgImage.y / 2 - this.bgImage.height / 2 + this.headerBg.height;
    for (let i = yStart, k = 0; k < keysConfigs.length; i += 90, k++) {
      this.generateHotKeyInfo(xStart, i, keysConfigs[k].key, keysConfigs[k].info);
    }
  }

  generateHotKeyInfo(x: number, y: number, hotkey: string, text: string) {
    // border 0x593517 bg 0x42250F
    const keyBg = this.scene.add.graphics();
    keyBg.fillStyle(0x593517);
    keyBg.fillRoundedRect(x, y, 240, 80, 10);
    keyBg.fillStyle(0x42250f);
    keyBg.fillRoundedRect(x + 5, y + 5, 230, 60, 10);

    const infoBg = this.scene.add.graphics();
    infoBg.fillStyle(0x593517);
    infoBg.fillRoundedRect(x + 250, y, 860, 80, 10);
    infoBg.fillStyle(0x42250f);
    infoBg.fillRoundedRect(x + 260, y + 10, 840, 60, 10);

    const keyStyle = { fontFamily: 'Dimbo', fontStyle: 'italic', fontSize: '35px' };
    const keyText = this.scene.add
      .text(x + 120, y + 40, `${hotkey} `, keyStyle)
      .setOrigin(0.5, 0.5);

    const infoStyle = { fontFamily: 'Dimbo', fontSize: '38px' };
    const infoText = this.scene.add.text(x + 280, y + 40, text, infoStyle).setOrigin(0, 0.5);

    this.add([keyBg, infoBg, keyText, infoText]);
  }
}
