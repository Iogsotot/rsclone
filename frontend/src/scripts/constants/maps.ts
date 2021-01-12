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
    { x: 6.4, Y: 4.65 },
    { x: 3.2, y: 5.6 },
    { x: 2.32, y: 3.18 },
    { x: 2.91, y: 2.19 },
    { x: 4.13, y: 1.75 },
    { x: 4, y: 1.4 },
    { x: 2.91, y: 1.27 },
    { x: 2, y: 1.43 },
    { x: 1.68, y: 1.71 },
    { x: 1.39, y: 2.5 },
    { x: 1.25, y: 2.69 },
    { x: 1.11, y: 2.15 },
    { x: 1, y: 2 },
    { x: 0.92, y: 1.84 },
  ],
  scaleStartPointX: 1,
  scaleStartPointY: 3.1,
  scaleFinishPointX: 1,
  scaleFinishPointY: 2,
  scaleCoordinateTowers: [
    [13, 8.5], [3.55, 3.4], [8, 1.78], [2.9, 1.63], [3.41, 1.16], [1.74, 1.29],
    [1.98, 2], [1.94, 4], [1.42, 1.7], [1.18, 1.86], [1.07, 2.86]
  ],
  tiles: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 2, 0, 0, 8, 8, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 11],
    [0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 3, 3, 0, 0, 0, 0, 7, 7, 0, 0, 9, 0, 10, 0, 0],
    [0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0],
    [0, 0, 0, 5, 0, 0, 0, 0, 6, 6, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 5, 5, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],],
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
