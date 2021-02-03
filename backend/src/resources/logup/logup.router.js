const router = require('express').Router();
const { handling } = require('../../common/handling');
const usersService = require('../users/user.service');
const User = require('../users/user.model');

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

module.exports = router;
