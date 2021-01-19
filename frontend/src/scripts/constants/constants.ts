import { map1, map2, map3 } from "./maps";

const RANDOM_WAY_COEFFICIENT: number = 15;

const levelsConfig = {
  "level_1": {
    "map": map1,
    "startingGold": 100,
    "waves": {
      "wave_1": {
        "enemies": {
          "scorpio": 5,
          "littleOrc": 1
        }
      },
      "wave_2": {
        "enemies": {
          "scorpio": 5,
          "littleOrc": 1
        }
      }
    },
    "theme": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pharetra urna quis tristique posuere. Curabitur iaculis nulla porta dui maximus porta. Mauris vehicula facilisis sapien in hendrerit. Etiam a leo ac eros accumsan placerat. Praesent vestibulum rutrum magna non tristique. Maecenas sem massa, pretium ac ante nec, volutpat luctus nibh. Maecenas vulputate fringilla porta. Sed et justo non erat laoreet semper."
  },
  "level_2": {
    "map": map2,
    "startingGold": 100,
    "waves": {
      "wave_1": {
        "enemies": {
          "scorpio": 10,
          "littleOrc": 11
        }
      },
      "wave_2": {
        "enemies": {
          "scorpio": 50,
          "littleOrc": 10
        }
      }
    },
    "theme": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pharetra urna quis tristique posuere. Curabitur iaculis nulla porta dui maximus porta. Mauris vehicula facilisis sapien in hendrerit. Etiam a leo ac eros accumsan placerat. Praesent vestibulum rutrum magna non tristique. Maecenas sem massa, pretium ac ante nec, volutpat luctus nibh. Maecenas vulputate fringilla porta. Sed et justo non erat laoreet semper."
  },
  "level_3": {
    "map": map3,
    "startingGold": 100,
    "waves": {
      "wave_1": {
        "enemies": {
          "scorpio": 12,
          "littleOrc": 1        
        }
      },
      "wave_2": {
        "enemies": {
          "scorpio": 53,
          "littleOrc": 13
        }
      }
    },
    "theme": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pharetra urna quis tristique posuere. Curabitur iaculis nulla porta dui maximus porta. Mauris vehicula facilisis sapien in hendrerit. Etiam a leo ac eros accumsan placerat. Praesent vestibulum rutrum magna non tristique. Maecenas sem massa, pretium ac ante nec, volutpat luctus nibh. Maecenas vulputate fringilla porta. Sed et justo non erat laoreet semper."
  },
}


export { RANDOM_WAY_COEFFICIENT, levelsConfig };
