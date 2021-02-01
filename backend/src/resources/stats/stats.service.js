const tasksRepo = require('./stats.mongodb.repository');

const getAll = () => tasksRepo.getAll();

const get = id => tasksRepo.get(id);

const create = user => tasksRepo.create(user);

const update = (id, body) => tasksRepo.update(id, body);

const remove = id => tasksRepo.remove(id);

module.exports = { getAll, create, get, update, remove };
