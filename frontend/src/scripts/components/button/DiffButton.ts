import CustomButton from './CustomButton'

export default class DiffButton extends CustomButton {
  easyBtn: Phaser.GameObjects.Image
  
  hardBtn: Phaser.GameObjects.Image

  diffBtns: string[]
  
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'NORMAL', 'normal-btn-bg', 'normal-btn-bg')

    this.diffBtns = ['easy', 'normal', 'hard']
    
    this.setInteractive({ useHandCursor: true })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, this.handleClick, this)
  }

  handleClick() {
    const visibleBtnIndex = this.diffBtns.findIndex((el) => el.toUpperCase() === this.btnText.text)
    const index = (visibleBtnIndex + 1) % this.diffBtns.length
    this.btnImage.setTexture(`${this.diffBtns[index]}-btn-bg`)
    this.btnDownImage.setTexture(`${this.diffBtns[index]}-btn-bg`)
    this.btnText.setText(`${this.diffBtns[index].toUpperCase()}`)
  }

  getDifficulty() {
    return this.diffBtns.findIndex((el) => el.toUpperCase() === this.btnText.text) + 1;
  }
}