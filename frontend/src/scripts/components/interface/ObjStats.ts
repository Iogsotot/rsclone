import Tower from "../tower/Tower";
import Unit from "../unit/Unit";

export default class ObjStats extends Phaser.GameObjects.Container {
  objNameContainer: Phaser.GameObjects.Graphics
  objInfoContainer: Phaser.GameObjects.Graphics
  modalConfigs: any
  objImg: Phaser.GameObjects.Image;
  nameText: Phaser.GameObjects.Text;
  infoText_1: Phaser.GameObjects.Text;
  infoText_2: Phaser.GameObjects.Text;
  infoText_3: Phaser.GameObjects.Text;
  infoImg_1: Phaser.GameObjects.Image;
  infoImg_2: Phaser.GameObjects.Image;
  infoImg_3: Phaser.GameObjects.Image;
  
  text: Phaser.GameObjects.Text;
  gameObject: Phaser.GameObjects.GameObject;
  
  constructor(scene: Phaser.Scene) {
    super(scene, scene.cameras.main.centerX, scene.cameras.main.centerY - 80);
    scene.add.existing(this)
    this.objNameContainer = scene.add.graphics()
    this.objInfoContainer = scene.add.graphics()
    
    this.setSize(+scene.sys.game.config.width / 2, 60)
    this.setPosition(scene.cameras.main.centerX-this.width/2, +scene.sys.game.config.height - this.height*0.7)
    
    this.drawContainers()
    this.generate()
  }

  drawContainers() {
    this.objNameContainer.setPosition(0, -this.height*0.7)
    const nameContainerWidth = this.width * 0.35
    const borderColor = 0x593517 
    const bgColor = 0x42250F
    this.objNameContainer.fillStyle(bgColor)
    this.objNameContainer.fillRoundedRect(0,0, nameContainerWidth, this.height, 10)
    this.objNameContainer.lineStyle(10, borderColor)
    this.objNameContainer.strokeRoundedRect(0,0, nameContainerWidth, this.height, 10)
    this.objNameContainer.setAlpha(0.8)

    const circles = this.scene.add.graphics()
    circles.setPosition(0, -this.height*0.7+this.height*0.5)
    circles.fillStyle(0x000000)
    circles.fillCircle(0,0, this.height*0.8) 
    circles.fillStyle(0xd2cdcc)
    circles.fillCircle(0,0, this.height*0.73)
    circles.fillStyle(0x000000)
    circles.fillCircle(0,0, this.height*0.62)
    circles.setAlpha(0.9)

    const infoContainerWidth = this.width * 0.68
    this.objInfoContainer.setPosition(this.width * 0.38, -this.height*0.7)

    this.objInfoContainer.fillStyle(bgColor)
    this.objInfoContainer.fillRoundedRect(0,0, infoContainerWidth, this.height, 10)
    this.objInfoContainer.lineStyle(10, borderColor)
    this.objInfoContainer.strokeRoundedRect(0,0, infoContainerWidth, this.height, 10)
    this.objInfoContainer.setAlpha(0.8)
    
    this.modalConfigs = {
      nameContainerWidth,
      infoContainerWidth
    }

    this.add(this.objNameContainer)
    this.add(circles)
    this.add(this.objInfoContainer)
  }

  generate() { 
    this.objImg = this.scene.add.image(0, 0, '')
    this.nameText = this.scene.add.text(0,0,'', { fontFamily: 'Dimbo', fontSize: '40px' }).setOrigin(0.5)
    
    this.infoImg_1 = this.scene.add.image(0, 0, '').setOrigin(0.5,0.5)
    this.infoText_1 = this.scene.add.text(0, 0, '', { fontFamily: 'Dimbo', fontSize: '40px' }).setOrigin(0,0.5)

    this.infoImg_2 = this.scene.add.image(0,0, '').setOrigin(0,0.5)
    this.infoText_2 = this.scene.add.text(0,0, '', { fontFamily: 'Dimbo', fontSize: '40px' }).setOrigin(0,0.5)
    
    this.infoImg_3 = this.scene.add.image(0,0,'').setOrigin(0.5)
    this.infoText_3 = this.scene.add.text(0,0, '', { fontFamily: 'Dimbo', fontSize: '40px' }).setOrigin(0.5)
    
    this.add(this.objImg)
    this.add(this.nameText)
    this.add(this.infoImg_1)
    this.add(this.infoText_1)
    this.add(this.infoImg_2)
    this.add(this.infoText_2)
    this.add(this.infoImg_3)
    this.add(this.infoText_3)
    
    this.slideOut()
  }

  infoConfig(obj: Tower | Unit) {
    if(obj instanceof Tower) {
      if(!obj.isTowerBuilt || !obj.type) return null
      return {
        avaTexture: `${obj.getType()}-icon`,
        name: `${obj.getType().toUpperCase()} TOWER`,
        img1: 'damage-icon',
        text1: `${obj.damage}`,
        img2: 'speed-icon',
        text2: `${obj.timeForNextShot}`,
        img3: 'speed2-icon',
        text3: `${obj.attackArea}`,
      }
    } else if(obj instanceof Unit) {
      return {
        avaTexture: obj.unitType,
        name: obj.unitType.toUpperCase(),
        img1: 'heart-icon',
        text1: `${obj.hp}/${obj.hp}`,
        img2: 'heart-icon',
        text2: obj.moveSpeed<2000?'very fast':obj.moveSpeed<3500?'fast':obj.moveSpeed<6000?'slow':'very slow',
        img3: 'heart-icon',
        text3: `${obj.killReward}`,
      }
    }
  }

  updateStats(obj: Tower | Unit) {
    const infoConfig = this.infoConfig(obj)
    if(!infoConfig) return
    this.slideIn()
    this.objImg.setTexture(infoConfig.avaTexture)
    this.objImg.setPosition(0, -this.height*0.7+this.height*0.5)
    this.objImg.displayHeight = this.height * 1.3
    this.objImg.scaleX = this.objImg.scaleY

    this.nameText.setText(infoConfig.name)
    this.nameText.setPosition(this.modalConfigs.nameContainerWidth/2, -this.nameText.height/4)

    this.infoImg_1.setTexture(infoConfig.img1)
    this.infoText_1.setText(infoConfig.text1)
    this.infoImg_1.setPosition(this.objInfoContainer.x+this.infoImg_1.width/2,-this.infoImg_1.height/4)
    this.infoText_1.setPosition(this.infoImg_1.x+this.infoImg_1.width/2, -this.infoText_1.height/4)

    this.infoImg_2.setTexture(infoConfig.img2)
    this.infoText_2.setText(infoConfig.text2)
    this.infoImg_2.setPosition(
      this.objInfoContainer.x+this.modalConfigs.infoContainerWidth/2-this.infoText_2.width/4-this.infoImg_2.width/2,
      -this.infoImg_2.height/4
    )
    this.infoText_2.setPosition(
      this.objInfoContainer.x+this.modalConfigs.infoContainerWidth/2-this.infoText_2.width/4+this.infoImg_2.width/2,
      -this.infoText_2.height/4
    )

    this.infoImg_3.setTexture(infoConfig.img3)
    this.infoText_3.setText(infoConfig.text3)
    this.infoImg_3.setPosition(
      this.objInfoContainer.x+this.modalConfigs.infoContainerWidth-this.infoText_3.width-this.infoImg_3.width-10,
      -this.infoImg_3.height/4
    )
    this.infoText_3.setPosition(
      this.objInfoContainer.x+this.modalConfigs.infoContainerWidth-this.infoImg_3.width-10,
      -this.infoText_3.height/4
    )
  }

  slideIn() {
    this.scene.tweens.add({
      targets: this,
      y: { start: +this.scene.sys.game.config.height*1.2, to: +this.scene.sys.game.config.height - this.height*0.7 },
      ease: 'Cubic.Out',
      repeat: 0,
      duration: 500,
    });
  }
  
  slideOut() {
    this.scene.tweens.add({
      targets: this,
      y: { start: +this.scene.sys.game.config.height - this.height*0.7, to: +this.scene.sys.game.config.height*1.2 },
      ease: 'Expo.Out',
      repeat: 0,
      duration: 500,
    });
  }
}