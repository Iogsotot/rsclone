import Phaser from '../phaser/phaser';
import Map from './Map';
import { map1 } from '../../constants/maps';
import { getRandomDeviationWay } from '../../utils/getRandomDeviationWay';

class MapLevel1 extends Map {
  /**
     * @param {Phaser.Scene} scene
     */
  constructor(scene, mapData) {
    super(scene, mapData);
    this.curve = undefined;
    this.firstPointX = 0;
    this.firstPointY = this.height / map1.scaleFirstPointY;
    this.fourteenthPointX = this.width / map1.scaleFifteenthPointX;
    this.fourteenthPointY = this.height / map1.scaleFifteenthPointY;
  }

  createWay() {
    const secondPointX = this.getRandomPointX(map1.scaleSecondPointX);
    const secondPointY = this.getRandomPointY(map1.scaleSecondPointY);
    const thirdPointX = this.getRandomPointX(map1.scaleThirdPointX);
    const thirdPointY = this.getRandomPointY(map1.scaleThirdPointY);
    const fourthPointX = this.getRandomPointX(map1.scaleFourthPointX);
    const fourthPointY = this.getRandomPointY(map1.scaleFourthPointY);
    const fifthPointX = this.getRandomPointX(map1.scaleFifthPointX);
    const fifthPointY = this.getRandomPointY(map1.scaleFifthPointY);
    const sixthPointX = this.getRandomPointX(map1.scaleSixthPointX);
    const sixthPointY = this.getRandomPointY(map1.scaleSixthPointY);
    const seventhPointX = this.getRandomPointX(map1.scaleSeventhPointX);
    const seventhPointY = this.getRandomPointY(map1.scaleSeventhPointY);
    const eighthPointX = this.getRandomPointX(map1.scaleEighthPointX);
    const eighthPointY = this.getRandomPointY(map1.scaleEighthPointY);
    const ninthPointX = this.getRandomPointX(map1.scaleNinthPointX);
    const ninthPointY = this.getRandomPointY(map1.scaleNinthPointY);
    const tenthPointX = this.getRandomPointX(map1.scaleTenthPointX);
    const tenthPointY = this.getRandomPointY(map1.scaleTenthPointY);
    const eleventhPointX = this.getRandomPointX(map1.scaleEleventhPointX);
    const eleventhPointY = this.getRandomPointY(map1.scaleEleventhPointY);
    const twelfthPointX = this.getRandomPointX(map1.scaleTwelfthPointX);
    const twelfthPointY = this.getRandomPointY(map1.scaleTwelfthPointY);
    const thirteenthPointX = this.getRandomPointX(map1.scaleThirteenthPointX);
    const thirteenthPointY = this.getRandomPointY(map1.scaleThirteenthPointY);
    const fifteenthPointX = this.getRandomPointX(map1.scaleFifteenthPointX);
    const fifteenthPointY = this.getRandomPointY(map1.scaleFifteenthPointY);

    const points = [];
    points.push(new Phaser.Math.Vector2(this.firstPointX, this.firstPointY));
    points.push(new Phaser.Math.Vector2(secondPointX, secondPointY));
    points.push(new Phaser.Math.Vector2(thirdPointX, thirdPointY));
    points.push(new Phaser.Math.Vector2(fourthPointX, fourthPointY));
    points.push(new Phaser.Math.Vector2(fifthPointX, fifthPointY));
    points.push(new Phaser.Math.Vector2(sixthPointX, sixthPointY));
    points.push(new Phaser.Math.Vector2(seventhPointX, seventhPointY));
    points.push(new Phaser.Math.Vector2(eighthPointX, eighthPointY));
    points.push(new Phaser.Math.Vector2(ninthPointX, ninthPointY));
    points.push(new Phaser.Math.Vector2(tenthPointX, tenthPointY));
    points.push(new Phaser.Math.Vector2(eleventhPointX, eleventhPointY));
    points.push(new Phaser.Math.Vector2(twelfthPointX, twelfthPointY));
    points.push(new Phaser.Math.Vector2(thirteenthPointX, thirteenthPointY));
    points.push(new Phaser.Math.Vector2(this.fourteenthPointX, this.fourteenthPointY));
    points.push(new Phaser.Math.Vector2(fifteenthPointX, fifteenthPointY));

    this.curve = new Phaser.Curves.Spline(points);

    // код ниже рисует кривую на карте, по которой двигаюется враги. Сама отрисовка кривой нам не нужна, оставил для всевозможных корректировок.
    // const graphics = this.scene.add.graphics();
    // graphics.lineStyle(1, 0xffffff, 1);
    // this.curve.draw(graphics, 64);
    // graphics.fillStyle(0x00ff00, 1);
    // for (var i = 0; i < points.length; i++)
    // {
    //     graphics.fillCircle(points[i].x, points[i].y, 4);
    // }

    return this.curve;
  }

  getRandomPointX(scale) {
    return (this.width / scale) + getRandomDeviationWay();
  }

  getRandomPointY(scale) {
    return (this.height / scale) + getRandomDeviationWay();
  }
}

class Points extends MapLevel1 {
  getStartPointX() {
    return this.firstPointX;
  }

  getStartPointY() {
    return this.firstPointY;
  }

  getFinishPointX() {
    return this.fourteenthPointX;
  }

  getFinishPointY() {
    return this.fourteenthPointY;
  }
}

export {
  MapLevel1,
  Points,
};
