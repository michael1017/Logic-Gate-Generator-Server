const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());


router.get('/receive', function (req, res, next) {
  const { id } = req.body;
  if (!id) {
    const err = new Error('receive: No id input');
    err.status = 400;
    throw err;
  }
  const data_prefix = '/home/michael1017/env_test/data/';
  const filename = data_prefix + id;
  const filename_svg = filename + '.svg';
  res.setHeader('Content-Type', 'image/svg+xml');
  res.sendFile(filename_svg);
});

module.exports = router;
