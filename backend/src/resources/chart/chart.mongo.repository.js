const Chart = require('./chart.model');

const getAll = async () => {
  return Chart.find({});
};

const get = async year => {
  return Chart.findOne({ year });
};

const create = async body => {
  return Chart.create(body);
};

const update = async (year, body) => {
  return Chart.updateOne({ year }, body);
};

module.exports = { getAll, create, get, update };
