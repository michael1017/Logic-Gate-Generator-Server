const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const generatorModel = require('../model/generator.js')

const router = express.Router();

router.use(bodyParser.json());

function deleteFile(filename, to_delete) {
  for(let i=0; i<to_delete.length; i++) {
    if (!fs.existsSync(filename + to_delete[i])) {
      continue;
    }
    fs.unlink(filename + to_delete[i], function(err){
      if(err){
        console.log(err);
        throw err;
      }
      console.log(filename + to_delete[i], 'deleted successfully');
    }); 
  }
}


router.post('/verilogText', function (req, res, next) {
  const topModule = req.body.topmoduleName;
  const text = req.body.text;
  const id = uuidv4();

  console.log('into router/verilogText');
  console.log(topModule, text, id);

  if (!text) {
    const err = new Error('verilogText: No text input');
    err.status = 400;
    throw err;
  }

  generatorModel
    .verilogText(topModule, text, id)
    .then((filename) => {
      console.log(filename);
      if (fs.existsSync(filename + '.svg')) {
        fs.readFile(filename + '.svg', function(err, data) {
          if (err){
            console.log("can't read " + filename + '.svg in router/verilogText');
            throw err;
          } 
          res.writeHead(200, {'Content-Type': 'image/svg+xml'});
          res.end(Buffer.from(data).toString('utf8'));
          
          if (filename != "errormsg") {
            fs.unlink(filename + '.svg', function(err){
              if(err){
                console.log(err);
                throw err;
              }
              console.log(filename + '.svg deleted successfully');
            }); 
          }
        })
      } else {
        fs.readFile('synthesis_error.svg', function(err, data) {
          if (err){
            console.log("can't read synthesis_error.svg in router/verilogText");
            throw err;
          }
          res.writeHead(200, {'Content-Type': 'image/svg+xml'});
          res.end(Buffer.from(data).toString('utf8'));
        })
      }
      deleteFile(filename, ['.v', '.json', '.txt']);
    })
    .catch(next);
});

router.post('/userDefinedText', function (req, res, next) {
  const text = req.body.text;
  const id = uuidv4();
  console.log(id);
  console.log('into router/userDefinedText');
  if (!text) {
    const err = new Error('userDefinedText: No text input');
    err.status = 400;
    throw err;
  }
  generatorModel
    .userDefinedText(text, id)
    .then((filename) => {
      console.log(filename);
      if (fs.existsSync(filename + '.svg')) {
        fs.readFile(filename + '.svg', function(err, data) {
          if (err){
            console.log("can't read " + filename + '.svg in router/verilogText');
            throw err;
          }
          res.writeHead(200, {'Content-Type': 'image/svg+xml'});
          res.end(Buffer.from(data).toString('utf8'));
          
          if (filename != "errormsg") {
            fs.unlink(filename + '.svg', function(err){
              if(err){
                console.log(err);
                throw err;
              }
              console.log(filename + '.svg deleted successfully');
            }); 
          }
        })
      } else {
        fs.readFile('synthesis_error.svg', function(err, data) {
          if (err){
            console.log("can't read synthesis_error.svg in router/verilogText");
            throw err;
          }
          res.writeHead(200, {'Content-Type': 'image/svg+xml'});
          res.end(Buffer.from(data).toString('utf8'));
        })
      }
      deleteFile(filename, ['.v', '.json', '.txt']);
    })
    .catch(next);
});


module.exports = router;
