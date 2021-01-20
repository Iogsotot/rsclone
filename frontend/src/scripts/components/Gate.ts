import { GameObjects } from "phaser";

export default class Gate extends Phaser.GameObjects.Sprite {
  passedEnemies: GameObjects.Group[];
  // loseCount: number;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string ) {
    super(scene, x, y, texture);
    this.passedEnemies = [];
    scene.add.existing(this);
    this.setInteractive();
    // this.loseCount = 0;
  }
  
  onEnemyCrossing(enemy, gate) {
    if (!gate.passedEnemies.includes(enemy)) {
      gate.passedEnemies.push(enemy);
      console.log(gate.passedEnemies.length);
      if(gate.passedEnemies.length === 9) {
        console.log('total lose');
        return;
      }
      return console.log('lose');
    }
  }
}