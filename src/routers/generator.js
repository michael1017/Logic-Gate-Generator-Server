const express = require('express');
const bodyParser = require('body-parser');
var formidable = require('multiparty');

const generatorModel = require('../model/generator.js')

const router = express.Router();

router.use(bodyParser.json());


router.post('/verilogText', function (req, res, next) {
  const { topModule, text, id } = req.body;
  console.log(id);
  console.log(topModule);
  console.log('into router/verilogText');

  if (!text) {
    const err = new Error('verilogText: No text input');
    err.status = 400;
    throw err;
  }
  if (!topModule) {
    const err = new Error('verilogText: No top module');
    err.status = 400;
    throw err;
  }

  generatorModel
    .verilogText(topModule, text, id)
    .then((post) => {
      res.json(post);
    })
    .catch(next);
});

router.post('/userDefinedText', function (req, res, next) {
  const { text, id } = req.body;
  console.log(id);
  console.log('into router/userDefinedText');
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
