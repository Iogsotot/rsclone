const mongoose = require('mongoose');
const uuid = require('uuid');

const userScheme = new mongoose.Schema(
  {
    id: {
      type: String,
      default: uuid
    },
    login: String,
    password: String
  },
  { versionKey: false }
);

userScheme.static('toResponse', user => {
  const { id, login } = user;
  return { id, login };
});

const User = mongoose.model('User', userScheme);

module.exports = User;
