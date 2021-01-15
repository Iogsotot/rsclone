import Enemy from './Enemy';

export default class WizardBlack extends Enemy {

  constructor(scene: Phaser.Scene, way: Phaser.Curves.Path, x: number, y: number) {
    super(scene, way, x, y, 'wizardBlack');
    // this.createAnimations(scene);
    this.setPosition(x, y);

    // moveSpeed - За какое время будет пройден way
    this.moveSpeed = 40000;
    this.hp = 135;
    this.magicArmor = 100;
    this.killReward = 5;
  }
}