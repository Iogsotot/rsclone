const mongoose = require('mongoose');

const chartScheme = new mongoose.Schema(
  {
    year: Number,
    allAttendance: Number
  },
  { versionKey: false }
);

const Chart = mongoose.model('Chart', chartScheme);

module.exports = Chart;
