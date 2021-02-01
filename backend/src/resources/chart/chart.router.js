const router = require('express').Router();
const chartService = require('./chart.service');
const { handling } = require('../../common/handling');

router.route('/').get(
  handling(async (req, res) => {
    const attendances = await chartService.getAll();
    res.send({ data: attendances, ok: true });
  })
);

router.route('/:year').get(
  handling(async (req, res) => {
    const attendance = await chartService.get(req.params.year);
    res.send({ data: attendance, ok: true }); // err if user = null
  })
);

router.route('/').post(
  handling(async (req, res) => {
    const attendance = await chartService.create(req.body);
    res.send({ data: attendance, ok: true });
  })
);

router.route('/:year').put(
  handling(async (req, res) => {
    const year = await chartService.update(req.params.year, req.body);

    if (!year.nModified) {
      res.status(404).send({ data: 'Not found', ok: false });
    } else {
      const attendance = await chartService.get(req.params.year);
      res.send({ data: attendance, ok: true });
    }
  })
);

module.exports = router;
