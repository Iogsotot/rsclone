import Button from './Button'

export default class DiffButton extends Button {
  easyBtn: Phaser.GameObjects.Image
  
  hardBtn: Phaser.GameObjects.Image

  diffImages: Phaser.GameObjects.Image[]
  
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'normal-btn')

    this.easyBtn = scene.add.image(0, 0, 'easy-btn');
    this.hardBtn = scene.add.image(0, 0, 'hard-btn');
    
    this.add(this.easyBtn);
    this.add(this.hardBtn);

    this.easyBtn.texture.key

    this.easyBtn.setVisible(false)
    this.hardBtn.setVisible(false)
    // this.easyBtn.visible

    this.diffImages = [this.easyBtn, this.btnImage, this.hardBtn]
    
    this.setInteractive({ useHandCursor: true })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, this.handleClick, this)
  }

  handleClick() {
    const visibleBtnIndex = this.diffImages.findIndex((el) => el.visible)
    this.diffImages.map((el) => el.setVisible(false))
    const index = (visibleBtnIndex + 1) % this.diffImages.length
    this.diffImages[index].setVisible(true)
  }

  getDifficulty() {
    return this.diffImages.findIndex((el) => el.visible) + 1;
  }
}