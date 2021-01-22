import Scorpio from './Scorpio';
import WizardBlack from "./WizardBlack";
import LittleOrc from "./LittleOrc";

export default class EnemyFactory {
  context: any;
  path: any;
  x: number;
  y: number;
  props: object;

  constructor(context, path, x, y) {
    this.context = context; 
    this.path = path;
    this.x = x;
    this.y = y;
  }
  static list = {
    scorpio: Scorpio,
    wizardBlack: WizardBlack,
    littleOrc: LittleOrc,
  }

  create(type = 'littleOrc') {
    const EnemyUnit = EnemyFactory.list[type];
    const enemy = new EnemyUnit(this.context, this.path, this.x, this.y);
    // console.log(enemy);
    return enemy;
  }
}
