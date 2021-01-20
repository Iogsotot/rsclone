export type MapType = {
  level: number;
  url: string,
  scalePointsWay: Array<object>,
  scaleStartPointX: number,
  scaleStartPointY: number,
  scaleFinishPointX: number,
  scaleFinishPointY: number,
  scaleCoordinateTowers: Array<object>,
};

const map1: MapType = {
  level: 1,
  url: '../assets/imgs/forest_scene2.jpg',
  scalePointsWay: [
    { x: 6.4, y: 5.1 },
    { x: 3.2, y: 5.7 },
    { x: 2.35, y: 4 },
    { x: 2.25, y: 2.7 },
    { x: 2.95, y: 2.1 },
    { x: 4.2, y: 1.7 },
    { x: 4, y: 1.4 },
    { x: 2.91, y: 1.32 },
    { x: 2, y: 1.47 },
    { x: 1.68, y: 1.79 },
    { x: 1.39, y: 2.55 },
    { x: 1.25, y: 2.69 },
    { x: 1.11, y: 2.15 },
    { x: 1, y: 2 },
    { x: 0.92, y: 1.84 },
  ],
  scaleStartPointX: -100,
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
  level: 2,
  url: '../assets/imgs/forest_scene1.jpg',
  scalePointsWay: [
    { x: 3.25, y: 1.15 },
    { x: 2.56, y: 1.31 },
    { x: 2.11, y: 1.33 },
    { x: 1.9, y: 1.55 },
    { x: 2.18, y: 1.75 },
    { x: 2.77, y: 1.83 },
    { x: 5, y: 1.67 },
    { x: 10.78, y: 1.94 },
    { x: 8.53, y: 2.72 },
    { x: 3.66, y: 2.99 },
    { x: 2.73, y: 3.27 },
    { x: 2.56, y: 7.12 },
    { x: 2.04, y: 18 },
    { x: 1.72, y: 7.11 },
    { x: 1.6, y: 3.27 },
    { x: 1.3, y: 3.18 },
    { x: 1.09, y: 3.18 },
    { x: 1, y: 3.67 },
    { x: 0.95, y: 3.77 },
  ],
  scaleStartPointX: 600,
  scaleStartPointY: 1,
  scaleFinishPointX: 1,
  scaleFinishPointY: 3.67,
  scaleCoordinateTowers: [
      { x: 2.38, y: 1.12 },
      { x: 2.47, y: 1.53 },
      { x: 3.41, y: 1.44 },
      { x: 5, y: 2.2 },
      { x: 3.59, y: 4.07 },
      { x: 2.07, y: 4.84 },
      { x: 2.07, y: 3.2 },
    ],
};

const map3: MapType = {
  level: 3,
  url: '../assets/imgs/desert_scene3.jpg',
  scalePointsWay: [
    { x: 10.24, y: 1.75 },
    [{ x: 7.87, y: 1.86 }, { x: 5.69, y: 1.51 }],  
    [{ x: 6.83, y: 2.2 }, { x: 4.87, y: 1.42 }], 
    [{ x: 4.87, y: 2.69 }, { x: 4.1, y: 1.37 }],
    [{ x: 3.94, y: 3.61 }, { x: 3.47, y: 1.36 }],
    [{ x: 3.25, y: 4.24 }, { x: 3.1, y: 1.37 }],
    [{ x: 2.84, y: 4.17 }, { x: 2.73, y: 1.37 }],
    [{ x: 2.27, y: 3.9 }, { x: 2.27, y: 1.39 }],
    [{ x: 1.86, y: 3.27 }, { x: 1.86, y: 1.46 }],
    [{ x: 1.74, y: 3.1 }, { x: 1.64, y: 1.44 }],
    [{ x: 1.64, y: 3.27 }, { x: 1.52, y: 1.4 }],
    [{ x: 1.46, y: 3.27 }, { x: 1.36, y: 1.36 }],
    [{ x: 1.36, y: 2.88 }, { x: 1.28, y: 1.39 }],
    [{ x: 1.28, y: 2.12 }, { x: 1.2, y: 1.51 }],
    [{ x: 1.22, y: 2.05 }, { x: 1.19, y: 1.86 }],
    { x: 1.18, y: 2.2 },
    { x: 1.16, y: 3.1 },
    { x: 1.13, y: 4.03 },
    { x: 1.08, y: 6.05 },
    { x: 1.04, y: 8.06 },
    { x: 1, y: 9.3 },
    { x: 0.95, y: 9.3 },
  ],
  scaleStartPointX: -100,
  scaleStartPointY: 1.75,
  scaleFinishPointX: 1,
  scaleFinishPointY: 9.3,
  scaleCoordinateTowers: [
    { x: 12.8, y: 2.52 },
    { x: 12.8, y: 1.4 },
    { x: 4.45, y: 1.7 },
    { x: 3.25, y: 1.18 },
    { x: 3.05, y: 2.81 },
    { x: 3.01, y: 6.37 },
    { x: 1.86, y: 4.65 },
    { x: 1.79, y: 1.25 },
    { x: 2.35, y: 1.57 },
    { x: 1.38, y: 1.55 },
    { x: 1.55, y: 2.42 },
    { x: 1.28, y: 3.78 },
    { x: 1.05, y: 2.12 },
    { x: 1.1, y: 1.32 },
  ],
};

export {
  map1,
  map2,
  map3,
};
