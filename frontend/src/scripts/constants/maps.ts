export type MapType = {
  url: string,
  scalePointsWay: Array<object>,
  scaleStartPointX: number,
  scaleStartPointY: number,
  scaleFinishPointX: number,
  scaleFinishPointY: number,
  scaleCoordinateTowers: Array<object>,
};

const map1: MapType = {
  url: '../assets/imgs/forest_scene2.jpg',
  scalePointsWay: [
    { x: 6.4, y: 4.65 },
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
    { x: 14.20, y: 8 },
    { x: 3.6, y: 3.2 },
    { x: 8, y: 1.74 },
    { x: 2.91, y: 1.6 },
    { x: 3.41, y: 1.13 },
    { x: 1.97, y: 2 },
    { x: 1.95, y: 3.72 },
    { x: 1.73, y: 1.28 },
    { x: 1.42, y: 1.65 },
    { x: 1.19, y: 1.79 },
    { x: 1.06, y: 2.76 },
  ],
};

const map2: MapType = {
  url: '../assets/imgs/forest_scene2.jpg',
  scalePointsWay: [
    {},
  ],
  scaleStartPointX: 0,
  scaleStartPointY: 0,
  scaleFinishPointX: 0,
  scaleFinishPointY: 0,
  scaleCoordinateTowers: [{}],
};

const map3: MapType = {
  url: '../assets/desert_scene3.jpg',
  scalePointsWay: [
    {},
  ],
  scaleStartPointX: 0,
  scaleStartPointY: 0,
  scaleFinishPointX: 0,
  scaleFinishPointY: 0,
  scaleCoordinateTowers: [{}],
};

export {
  map1,
  map2,
  map3,
};
