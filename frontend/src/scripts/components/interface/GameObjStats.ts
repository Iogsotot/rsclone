import Tower from "../tower/Tower";
import Unit from "../unit/Unit";

export default class GameObjStats extends Phaser.Scene {
  text: Phaser.GameObjects.Text;
  gameObject: Phaser.GameObjects.GameObject;
  
  constructor(scene) {
    super(scene);
    this.text = scene.add.text(0, 0, '', {
      fontFamily: 'Dimbo',
      fontSize: '34px',
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