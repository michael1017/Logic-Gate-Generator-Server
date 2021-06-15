const express = require('express');
const bodyParser = require('body-parser');

const generatorModel = require('../model/generator.js')

const router = express.Router();

router.use(bodyParser.json());


router.post('/verilogText', function (req, res, next) {
  const { text, id } = req.body;
  if (!text) {
    const err = new Error('verilogText: No text input');
    err.status = 400;
    throw err;
  }
  generatorModel
    .verilogText(text, id)
    .then((post) => {
      res.json(post);
    })
    .catch(next);
});

// not yet
router.post('/verilogFile', function (req, res, next) {
  const { file, id } = req.body;
  if (!file) {
    const err = new Error('verilogFile: No file input');
    err.status = 400;
    throw err;
  }
  generatorModel
    .verilogFile(file, id)
    .then((post) => {
      res.json(post);
    })
    .catch(next);
});

router.post('/userDefinedText', function (req, res, next) {
  const { text, id } = req.body;
  if (!text) {
    const err = new Error('userDefinedText: No text input');
    err.status = 400;
    throw err;
  }
  generatorModel
    .userDefinedText(text, id)
    .then((post) => {
      res.json(post);
    })
    .catch(next);
});


module.exports = router;
