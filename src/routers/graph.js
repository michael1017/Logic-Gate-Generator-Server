const express = require('express');
const bodyParser = require('body-parser');

const graphModel = require('../model/graph.js')

const router = express.Router();

router.use(bodyParser.json());

// Create
router.post('/', function (req, res, next) {
  const { text } = req.body;
  if (!text) {
    const err = new Error('No input logic discripts');
    err.status = 400;
    throw err;
  }
  graphModel
    .create(text)
    .then((post) => {
      res.json(post);
    })
    .catch(next);
});


module.exports = router;
