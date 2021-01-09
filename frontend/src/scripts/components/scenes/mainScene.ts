export default class MainScene extends Phaser.Scene {
  // fpsText: Phaser.GameObjects.Text
  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this.add.text(20, 20, "Playing game", {
      font: "30px Arial", 
      color: "lightblue"
    });
    this.scene.start("game-scene");
  }

  update() {
    // this.fpsText.update()
  }
}
