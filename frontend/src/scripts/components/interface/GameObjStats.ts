import Tower from "../tower/Tower";
import Unit from "../unit/Unit";

export default class GameObjStats extends Phaser.Scene {
  text: Phaser.GameObjects.Text;
  gameObject: Phaser.GameObjects.GameObject;
  // x: number;
  // y: number;
  // width: number;
  // height: number;
  // statsBar: object;
  // value: number;
  // p: number;
  // data: Phaser.Data.DataManager;
  // add :Phaser.GameObjects.GameObjectFactory;
  
  constructor(scene) {
    super(scene);
    this.text = scene.add.text(0, 0, '', {
      font: '34px Courier',
      color: 'black',
      weight: 'bold',
    });
  }

  updateText(target) {
    let result;
    if (target instanceof Unit) {
      result = `${target.constructor.name} with HP: ${target.hp}`
    } else if (target instanceof Tower) {
      result = `${target.constructor.name} Damage: ${target.damage}`
    }
    this.text.setText([
      result
    ])
  }
}