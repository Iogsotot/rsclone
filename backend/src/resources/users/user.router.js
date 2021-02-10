const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { handling } = require('../../common/handling');

router.route('/').get(
  handling(async (req, res) => {
    const users = await usersService.getAll();
    res.send({ data: users.map(User.toResponse), ok: true });
  })
);

router.route('/:id').get(
  handling(async (req, res) => {
    const user = await usersService.get(req.params.id);
    if (user) {
      res.send({ data: User.toResponse(user), ok: true });
    } else {
      res.send({ data: 'No Content', ok: false });
    }
  })
);

router.route('/').post(
  handling(async (req, res) => {
    const user = await usersService.getByLogin(req.body.login);

    if (user) {
      res.send({ data: 'user with this login exists', ok: false });
    } else {
      const userNew = await usersService.create(req.body);
      res.status(200).send({ data: User.toResponse(userNew), ok: true });
    }
  })
);

router.route('/:id').put(
  handling(async (req, res) => {
    const user = await usersService.update(req.params.id, req.body);

    if (!user.nModified) {
      res.send({ data: 'Not found', ok: false });
    } else {
      const userOld = await usersService.get(req.params.id);
      res.status(200).send({ data: User.toResponse(userOld), ok: true });
    }
  })
);

router.route('/:id').delete(
  handling(async (req, res) => {
    const user = await usersService.remove(req.params.id);

    if (!user.deletedCount) {
      res.send({ data: 'Not found', ok: false });
    } else {
      res
        .status(200)
        .send({ ok: true, data: `delete successful ${user.deletedCount}` });
    }
  })
);

module.exports = router;
