import Scorpio from './Scorpio';
import WizardBlack from './WizardBlack';
import LittleOrc from './LittleOrc';
import Levendor from './Levendor';

export default class EnemyFactory {
  context: any;

  x: number;

  y: number;

  props: object;

  constructor(context, x, y) {
    this.context = context;
    this.x = x;
    this.y = y;
  }

  static list = {
    scorpio: Scorpio,
    wizardBlack: WizardBlack,
    littleOrc: LittleOrc,
    levendor: Levendor,
  }

  create(type = 'littleOrc', path) {
    const EnemyUnit = EnemyFactory.list[type];
    const enemy = new EnemyUnit(this.context, path, this.x, this.y);
    return enemy;
  }
}
