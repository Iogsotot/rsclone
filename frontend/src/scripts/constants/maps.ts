export type MapType = {
  url: string,
  scalePoints: Array<object>,
  scaleStartPointX: number,
  scaleStartPointY: number,
  scaleFinishPointX: number,
  scaleFinishPointY: number,
  scaleCoordinateTowers: Array<Array<number>>,
  tiles: Array<Array<number>>,
};

const map1: MapType = {
  url: '../assets/imgs/forest_scene2.jpg',
  scalePoints: [
    { scaleSecondPointX: 6.4, scaleSecondPointY: 4.65 },
    { scaleThirdPointX: 3.2, scaleThirdPointY: 5.6 },
    { scaleFourthPointX: 2.32, scaleFourthPointY: 3.18 },
    { scaleFifthPointX: 2.91, scaleFifthPointY: 2.19 },
    { scaleSixthPointX: 4.13, scaleSixthPointY: 1.75 },
    { scaleSeventhPointX: 4, scaleSeventhPointY: 1.4 },
    { scaleEighthPointX: 2.91, scaleEighthPointY: 1.27 },
    { scaleNinthPointX: 2, scaleNinthPointY: 1.43 },
    { scaleTenthPointX: 1.68, scaleTenthPointY: 1.71 },
    { scaleEleventhPointX: 1.39, scaleEleventhPointY: 2.5 },
    { scaleTwelfthPointX: 1.25, scaleTwelfthPointY: 2.69 },
    { scaleThirteenthPointX: 1.11, scaleThirteenthPointY: 2.15 },
    { scaleFourteenthPointX: 1, scaleFourteenthPointY: 2 },
    { scaleFifteenthPointX: 0.92, scaleFifteenthPointY: 1.84 },
  ],
  scaleStartPointX: 1,
  scaleStartPointY: 3.1,
  scaleFinishPointX: 1,
  scaleFinishPointY: 2,
  scaleCoordinateTowers: [[13, 8.5], [3.55, 3.4], [8, 1.78], [2.9, 1.63], [3.41, 1.16], [1.74, 1.29],
  [1.98, 2], [1.94, 4], [1.42, 1.7], [1.18, 1.86], [1.07, 2.86]],
  tiles: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 2, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 3, 3, 0, 4, 4, 0, 0, 0, 9, 9, 0, 10, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 5, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
};

const map2: MapType = {
  url: '../assets/imgs/forest_scene2.jpg',
  scalePoints: [
    {},
  ],
  scaleStartPointX: 0,
  scaleStartPointY: 0,
  scaleFinishPointX: 0,
  scaleFinishPointY: 0,
  scaleCoordinateTowers: [[]],
  tiles: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
};

const map3: MapType = {
  url: '../assets/desert_scene3.jpg',
  scalePoints: [
    {},
  ],
  scaleStartPointX: 0,
  scaleStartPointY: 0,
  scaleFinishPointX: 0,
  scaleFinishPointY: 0,
  scaleCoordinateTowers: [[]],
  tiles: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
};

export {
  map1,
  map2,
  map3,
};
