const usersRepo = require('./chart.mongo.repository');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const create = id => usersRepo.create(id);

const update = (id, body) => usersRepo.update(id, body);

module.exports = { getAll, create, get, update };
