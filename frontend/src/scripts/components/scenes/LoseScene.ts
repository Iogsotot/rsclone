import LoseModal from '../modal/LoseModal';

export default class LoseScene extends Phaser.Scene {
  constructor() {
    super({ key: 'lose-scene' });
  }

  preload() {}

  create() {
    const modal = new LoseModal(this);
    
    this.tweens.add({
      targets: modal,
      scale: { start: 0.3, to: 1 },
      ease: 'Elastic.Out',
      repeat: 0,
      duration: 1000,
    });

    modal.cancelBtn.setInteractive().on('pointerup', () => {
      this.scene.start('LevelsScene');
    });

    modal.restartBtn.setInteractive().on('pointerup', () => {
      this.scene.start('game-scene');
    });
  }
}
