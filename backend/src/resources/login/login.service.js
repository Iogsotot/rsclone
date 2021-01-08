const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const User = require('../users/user.model');

const getUser = async login => {
  return User.findOne({ login });
};

const createToken = (login, password) => {
  return jwt.sign({ login, password }, JWT_SECRET_KEY);
};

module.exports = {
  getUser,
  createToken
};
