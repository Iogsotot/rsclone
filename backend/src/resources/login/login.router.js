const router = require('express').Router();
const { handling } = require('../../common/handling');
const loginService = require('./login.service');

router.route('/').post(
  handling(async (req, res) => {
    const { login, password } = req.body;
    const user = await loginService.getUser(login);

    if (!user) {
      res.status(403).send({ data: 'Forbidden', ok: false });
    } else if (password !== user.password) {
      res.status(403).send({ data: 'Invalid password', ok: false });
    } else {
      res.status(200).json({
        token: loginService.createToken(login, password),
        id: user.id,
        login: user.login,
        ok: true
      });
    }
  })
);

module.exports = router;
