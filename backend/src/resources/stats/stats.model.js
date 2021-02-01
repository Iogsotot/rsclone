const mongoose = require('mongoose');

const statsScheme = new mongoose.Schema(
  {
    userId: { type: String },
    login: { type: String },
    gameProgress: {
      level_1: { type: Number, default: 0 },
      level_2: { type: Number, default: 0 },
      level_3: { type: Number, default: 0 }
    },
    gameLogInCount: { type: Number, default: 1 },
    killedEnemies: { type: Number, default: 0 },
    builtTowers: { type: Number, default: 0 },
    soldTowers: { type: Number, default: 0 },
    ironModeProgress: {
      level_1: { type: Number, default: 0 },
      level_2: { type: Number, default: 0 },
      level_3: { type: Number, default: 0 }
    },
    achievements: {
      firstAsterisk: { type: Boolean, default: false },
      completeWin: { type: Boolean, default: false },
      firstBlood: { type: Boolean, default: false },
      greatDefender: { type: Boolean, default: false },
      ironDefender: { type: Boolean, default: false },
      killer: { type: Boolean, default: false },
      seller: { type: Boolean, default: false },
      builder: { type: Boolean, default: false }
    }
  },
  { versionKey: false }
);

const Stats = mongoose.model('Stats', statsScheme);

module.exports = Stats;
