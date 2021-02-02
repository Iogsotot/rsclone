const express = require('express');
const router = express.Router({ mergeParams: true });
const statsService = require('./stats.service');
const { handling } = require('../../common/handling');

router.route('/').get(
  handling(async (req, res) => {
    const stats = await statsService.getAll();
    res.send({ data: stats, ok: true });
  })
);

router.route('/').post(
  handling(async (req, res) => {
    const stat = await statsService.get(req.params.id);

    if (stat) {
      res.send({ data: 'No Content', ok: false });
    } else {
      const stats = await statsService.create({
        userId: req.params.id,
        login: req.body.login
      });
      res.send({ data: stats, ok: true });
    }
  })
);

router.route('/current').get(
  handling(async (req, res) => {
    const stat = await statsService.get(req.params.id);

    if (stat) {
      res.send({ data: stat, ok: true });
    } else {
      res.send({ data: 'No Content', ok: false });
    }
  })
);

router.route('/').put(
  handling(async (req, res) => {
    const stat = await statsService.update(req.params.id, req.body);

    if (!stat.nModified) {
      res.send({ data: 'No Content', ok: false });
    } else {
      res.status(302).send({ data: 'Found', ok: true });
    }
  })
);

router.route('/').delete(
  handling(async (req, res) => {
    const stat = await statsService.remove(req.params.id);

    if (!stat.deletedCount) {
      res.send({ data: 'No Content', ok: false });
    } else {
      res.send({ ok: true, data: `delete successful ${stat.deletedCount}` });
    }
  })
);

module.exports = router;
