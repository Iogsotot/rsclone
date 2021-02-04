import { map1, map2, map3 } from './maps';

const RANDOM_WAY_COEFFICIENT = 15;
const KEY_TOKEN = 'token-KR-clone';
const KEY_ID = 'id-KR-clone';
const LOCAL_STORAGE_KEY = 'KingdomRushCloneStateKey';

const levelsConfig = {
  level_1: {
    map: map1,
    startingGold: 250,
    waves: {
      wave_1: {
        enemies: {
          littleOrc: 3,
        },
      },
      wave_2: {
        enemies: {
          littleOrc: 6,
        },
      },
      wave_3: {
        enemies: {
          littleOrc: 10,
        },
      },
      wave_4: {
        enemies: {
          littleOrc: 5,
        },
      },
      wave_5: {
        enemies: {
          littleOrc: 15,
        },
      },
      wave_6: {
        enemies: {
          littleOrc: 20,
        },
      },
    },
    theme: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pharetra urna quis tristique posuere. Curabitur iaculis nulla porta dui maximus porta. Mauris vehicula facilisis sapien in hendrerit. Etiam a leo ac eros accumsan placerat. Praesent vestibulum rutrum magna non tristique. Maecenas sem massa, pretium ac ante nec, volutpat luctus nibh. Maecenas vulputate fringilla porta. Sed et justo non erat laoreet semper.',
  },
  level_2: {
    map: map2,
    startingGold: 350,
    waves: {
      wave_1: {
        enemies: {
          littleOrc: 10,
        },
      },
      wave_2: {
        enemies: {
          wizardBlack: 4,
          littleOrc: 10,
        },
      },
      wave_3: {
        enemies: {
          wizardBlack: 10,
        },
      },
      wave_4: {
        enemies: {
          littleOrc: 5,
          wizardBlack: 4,
          levendor: 1,
        },
      },
      wave_5: {
        enemies: {
          littleOrc: 15,
          wizardBlack: 10,
        },
      },
      wave_6: {
        enemies: {
          scorpio: 1,
          littleOrc: 20,
        },
      },
      wave_7: {
        enemies: {
          scorpio: 2,
          littleOrc: 10,
          wizardBlack: 4,
        },
      },
    },
    theme: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pharetra urna quis tristique posuere. Curabitur iaculis nulla porta dui maximus porta. Mauris vehicula facilisis sapien in hendrerit. Etiam a leo ac eros accumsan placerat. Praesent vestibulum rutrum magna non tristique. Maecenas sem massa, pretium ac ante nec, volutpat luctus nibh. Maecenas vulputate fringilla porta. Sed et justo non erat laoreet semper.',
  },
  level_3: {
    map: map3,
    startingGold: 400,
    waves: {
      wave_1: {
        enemies: {
          littleOrc: 10,
        },
      },
      wave_2: {
        enemies: {
          littleOrc: 10,
          wizardBlack: 10,
        },
      },
      wave_3: {
        enemies: {
          scorpio: 1,
          wizardBlack: 4,
        },
      },
      wave_4: {
        enemies: {
          littleOrc: 10,
          wizardBlack: 5,
        },
      },
      wave_5: {
        enemies: {
          scorpio: 2,
          wizardBlack: 4,
        },
      },
      wave_6: {
        enemies: {
          littleOrc: 25,
        },
      },
      wave_7: {
        enemies: {
          littleOrc: 20,
          wizardBlack: 10,
        },
      },
      wave_8: {
        enemies: {
          littleOrc: 10,
        },
      },
      wave_9: {
        enemies: {
          littleOrc: 10,
          wizardBlack: 6,
        },
      },
      wave_10: {
        enemies: {
          scorpio: 1,
          littleOrc: 15,
          wizardBlack: 10,
        },
      },
      wave_11: {
        enemies: {
          scorpio: 5,
          wizardBlack: 10,
        },
      },
      wave_12: {
        enemies: {
          littleOrc: 10,
        },
      },
      wave_13: {
        enemies: {
          scorpio: 2,
          littleOrc: 15,
          wizardBlack: 4,
        },
      },
      wave_14: {
        enemies: {
          scorpio: 8,
          wizardBlack: 10,
        },
      },
      wave_15: {
        enemies: {
          scorpio: 2,
          littleOrc: 20,
        },
      },
    },
    theme: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pharetra urna quis tristique posuere. Curabitur iaculis nulla porta dui maximus porta. Mauris vehicula facilisis sapien in hendrerit. Etiam a leo ac eros accumsan placerat. Praesent vestibulum rutrum magna non tristique. Maecenas sem massa, pretium ac ante nec, volutpat luctus nibh. Maecenas vulputate fringilla porta. Sed et justo non erat laoreet semper.',
  },
};

export {
  RANDOM_WAY_COEFFICIENT, LOCAL_STORAGE_KEY, levelsConfig, KEY_TOKEN, KEY_ID,
};
