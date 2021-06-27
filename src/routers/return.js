const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const router = express.Router();

router.use(bodyParser.json());

//To be verified
router.get('/', function (req, res) {
  const id = req.query.id;
  console.log(id);
  const data_prefix = '../data/';
  const filename = data_prefix + id; // TODO: change 0 to id
  const filename_svg = filename + '.svg';
  const filename_v = filename + '.v';
  const filename_json = filename + '.json';
  const filename_txt = filename + '.txt';
  console.log("return.js submit " + filename_svg);
  fs.readFile(filename_svg, function(err, data) {
    if (err) throw err // Fail if the file can't be read.
    res.writeHead(200, {'Content-Type': 'image/svg+xml'});
    res.end(Buffer.from(data).toString('utf8'));

    fs.unlink(filename_svg, function(err){
      if(err) return console.log(err);
      console.log('file deleted successfully');
    }); 
  })
  fs.unlink(filename_v, function(err){
    if(err) return console.log(err);
    console.log('file deleted successfully');
  }); 
  fs.unlink(filename_json, function(err){
    if(err) return console.log(err);
    console.log('file deleted successfully');
  }); 
  fs.unlink(filename_txt, function(err){
    if(err) return console.log(err);
    console.log('file deleted successfully');
  }); 
});

module.exports = router;
