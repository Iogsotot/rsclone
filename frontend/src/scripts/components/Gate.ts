import { GameObjects } from "phaser";

export default class Gate extends Phaser.GameObjects.Sprite {
  passedEnemies: GameObjects.Group[];
  // loseCount: number;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    // this.state = state;
    this.passedEnemies = [];
    scene.add.existing(this);
    this.setInteractive();
    // this.loseCount = 0;
  }

  onGateEvent() {
     console.log('lose');
    // console.log(state);
    return;
  }

  defeat() {
    // вызывает анимацию defeat модалки
    // записывает в state (внутри gameScene) "this.level.result = "defeat"" + уровень сложности
    // записывает в LocalStorage Тоже самое
    // отправляет на backend эту же информацию (+ инфу по ачивкав из state)
  }

  win() {
    // симметричный метод , но должен жить в GameScene ? 
  }

  
  onEnemyCrossing(enemy, gate) {
    if (!gate.passedEnemies.includes(enemy)) {
      gate.passedEnemies.push(enemy);
      console.log(gate.passedEnemies.length);
      if(gate.passedEnemies.length === 20) {
        console.log('total lose');
        return;
      }
      gate.onGateEvent();
      return;
    }
  }

  // мне надо:
  // onEnemyCrossing(enemy, gate) {
  //   if (!gate.passedEnemies.includes(enemy)) {
  //     gate.passedEnemies.push(enemy);
  //     // вызывался метод  onGateEvent() 
  //     if(gate.passedEnemies.length === 20) {
  //     // вызывался метод defeat()
  //       return;
  //     }
  //     return console.log('lose');
  //   }
  // }
}