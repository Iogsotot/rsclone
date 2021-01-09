export default class Enemy {
  enemyType: string;
  position: {x: number, y: number};
  size: number;
  speed: number;
  hp: number;
  damage: number;
  physicalArmor: number;
  magicArmor: number;
  killReward: number;
  sprite: string;


  constructor(
    way: any, 
    firstPointX: number = 0, 
    firstPointY: number = 0, 
    enemyType = 'default'
    ) {
    
    this.enemyType = enemyType;

    this.init();
  }

  init() {
    if (this.enemyType === 'anyEnemyType') {}
    this.position = {x: 0, y: 0};
    this.size = 20;
    this.speed = 2;
    this.hp = 100;
    this.damage = 20;
    this.physicalArmor = 10;
    this.magicArmor = 5;
    this.killReward = 5;
    this.sprite = '../../assets/sprites/1_enemies_1_walk_000.png'; 
  }
}