const mongoose = require('mongoose');

const chartScheme = new mongoose.Schema(
  {
    id: String,
    attendance: Number,
    date: String
  },
  { versionKey: false }
);

const Chart = mongoose.model('Chart', chartScheme);

module.exports = Chart;
