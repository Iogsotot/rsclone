const usersRepo = require('./chart.mongo.repository');

const getAll = () => usersRepo.getAll();

const get = year => usersRepo.get(year);

const create = year => usersRepo.create(year);

const update = (year, body) => usersRepo.update(year, body);

module.exports = { getAll, create, get, update };
