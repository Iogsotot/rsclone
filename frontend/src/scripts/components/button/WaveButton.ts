export default class WaveButton extends Phaser.GameObjects.PathFollower {
  constructor(scene: Phaser.Scene, path: Phaser.Curves.Path, x: number, y: number, texture: string) {
    super(scene, path, x, y, texture);
    scene.add.existing(this);
    this.setInteractive();
    this.setScale(0.75);
    // this.x = x;
    // this.y = y;
  }
}
