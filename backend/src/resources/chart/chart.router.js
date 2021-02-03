const router = require('express').Router();
const chartService = require('./chart.service');
const { handling } = require('../../common/handling');

router.route('/').get(
  handling(async (req, res) => {
    const response = await chartService.getAll();
    res.send({ data: response, ok: true });
  })
);

router.route('/:id').get(
  handling(async (req, res) => {
    const response = await chartService.get(req.params.id);

    if (response) {
      res.send({ data: response, ok: true });
    } else {
      res.send({ data: 'No Content', ok: false });
    }
  })
);

router.route('/').post(
  handling(async (req, res) => {
    const response = await chartService.create(req.body);
    res.send({ data: response, ok: true });
  })
);

router.route('/:id').put(
  handling(async (req, res) => {
    const response = await chartService.update(req.params.id, req.body);

    if (!response.nModified) {
      res.send({ data: 'No Content', ok: false });
    } else {
      res.status(302).send({ data: 'Found', ok: true });
    }
  })
);

module.exports = router;
