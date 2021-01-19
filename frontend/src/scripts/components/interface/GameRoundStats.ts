// состояние текущего раунда игры (каждой конкретной игровой сессии каждого конкретного уровня в момент запуска)

export default class GameObjStats extends Phaser.Scene {
  text: Phaser.GameObjects.Text;
  
  constructor(scene) {
    super(scene);
    this.text = scene.add.text(50, 150, '', {
      fontFamily: 'Dimbo',
      fontSize: '34px',
      color: 'black',
      weight: 'bold',
    });
  }

}