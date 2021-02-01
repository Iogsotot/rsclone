const Stats = require('./stats.model');

const getAll = async () => {
  return Stats.find({});
};

const get = async userId => {
  return Stats.findOne({ userId });
};

const create = async body => {
  return Stats.create(body);
};

const update = async (userId, body) => {
  return Stats.updateOne({ userId }, body);
};

const remove = async userId => {
  const res = await Stats.deleteOne({ userId });
  return res;
};

module.exports = { getAll, create, get, update, remove };
