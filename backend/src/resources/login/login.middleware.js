const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');

function middlewareAuth(req, res, next) {
  try {
    const auth = req.header('Authorization');
    if (!auth) {
      return res.status(401).send({
        data: 'Wrong authenticate scheme!',
        ok: false
      });
    }

    const [type, token] = auth.split(' ');
    if (type !== 'Bearer') {
      return res.status(401).send({
        data: 'Wrong authenticate scheme!',
        ok: false
      });
    }

    jwt.verify(token, JWT_SECRET_KEY);

    return next();
  } catch (err) {
    console.log('Error: ', err.message);
    res.status(500).send({
      data: 'Invalid Token',
      ok: false
    });
  }
}

module.exports = middlewareAuth;
