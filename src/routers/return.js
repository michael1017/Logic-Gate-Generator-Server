const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const router = express.Router();

router.use(bodyParser.json());

//To be verified
router.get('/receive', function (req, res, next) {
  const { id } = req.body;
  console.log(id);
  console.log('into router/receive');
  fs.readFile(`./data/${id}.svg`, function(err, data) {
    if (err) throw err // Fail if the file can't be read.
    res.writeHead(200, {'Content-Type': 'image/svg+xml'});
    res.write('"data:image/svg+xml;utf8,');
    res.write(Buffer.from(data).toString('utf8'));
    res.end('"');
  })
});

module.exports = router;
