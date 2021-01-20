import { GameObjects } from "phaser";

export default class Gate extends Phaser.GameObjects.Sprite {

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    // this.state = state;
    scene.add.existing(this);
    this.setInteractive();
  }
}