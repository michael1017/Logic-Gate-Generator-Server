const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const router = express.Router();

router.use(bodyParser.json());

//To be verified
router.get('/receive', function (req, res) {
  const { id } = req.body;
  const data_prefix = '../data/';
  const filename = data_prefix + id;
  const filename_svg = filename + '.svg';
  fs.readFile(filename_svg, function(err, data) {
    if (err) throw err // Fail if the file can't be read.
    res.writeHead(200, {'Content-Type': 'image/svg+xml'});
    res.write('"data:image/svg+xml;utf8,');
    res.write(Buffer.from(data).toString('utf8'));
    res.end('"');
  })
});

module.exports = router;
