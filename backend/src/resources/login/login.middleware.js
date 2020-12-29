const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');

function middlewareAuth(req, res, next) {
  try {
    const [type, token] = req.header('Authorization').split(' ');
    if (type !== 'Bearer') {
      res.status(401).send({ data: 'Unauthorized error', ok: false });
      return;
    }

    jwt.verify(token, JWT_SECRET_KEY);
    return next();
  } catch (err) {
    res.status(401).send({ data: 'Unauthorized error', ok: false });
  }
}

module.exports = middlewareAuth;
