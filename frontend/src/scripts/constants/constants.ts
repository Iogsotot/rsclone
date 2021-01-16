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
          "orc": 1
        }
      },
      "wave_2": {
        "enemies": {
          "scorpio": 5,
          "orc": 1
        }
      }
    }
  },
  "level_2": {
    "map": map2,
    "startingGold": 100,
    "waves": {
      "wave_1": {
        "enemies": {
          "scorpio": 10,
          "orc": 11
        }
      },
      "wave_2": {
        "enemies": {
          "scorpio": 50,
          "orc": 10
        }
      }
    }
  },
  "level_3": {
    "map": map3,
    "startingGold": 100,
    "waves": {
      "wave_1": {
        "enemies": {
          "scorpio": 12,
          "orc": 1        
        }
      },
      "wave_2": {
        "enemies": {
          "scorpio": 53,
          "orc": 13
        }
      }
    }
  },
}


export { RANDOM_WAY_COEFFICIENT, levelsConfig };
