const User = require('./user.model');

const getAll = async () => {
  return User.find({});
};

const get = async id => {
  return User.findOne({ id });
};

const getByLogin = async login => {
  return User.findOne({ login });
};

const create = async body => {
  return User.create(body);
};

const update = async (id, body) => {
  return User.updateOne({ id }, body);
};

const remove = async id => {
  const res = await User.deleteOne({ id });
  return res;
};

module.exports = { getAll, create, get, getByLogin, update, remove };
