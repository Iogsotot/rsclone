const Chart = require('./chart.model');

const getAll = async () => {
  return Chart.find({});
};

const get = async id => {
  return Chart.findOne({ id });
};

const create = async body => {
  return Chart.create(body);
};

const update = async (id, body) => {
  return Chart.updateOne({ id }, body);
};

module.exports = { getAll, create, get, update };
