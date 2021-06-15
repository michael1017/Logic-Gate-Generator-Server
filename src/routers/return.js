const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());

//To be verified
router.get('/receive', function (req, res, next) {
  const { id } = req.body;
  
  console.log("Get into router receive");
  const data_prefix = '../data/';
  const filename = data_prefix + id;
  const filename_svg = filename + '.svg';
  res.setHeader('Content-Type', 'image/svg+xml');
  res.sendFile(filename_svg);
});

module.exports = router;
