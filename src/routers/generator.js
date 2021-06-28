const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const generatorModel = require('../model/generator.js')

const router = express.Router();

router.use(bodyParser.json());


router.post('/verilogText', function (req, res, next) {
  const topModule = req.body.topmoduleName;
  const text = req.body.text;
  const id = req.body.id;

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
      fs.readFile(filename + '.svg', function(err, data) {
        if (err) throw err // Fail if the file can't be read.
        res.writeHead(200, {'Content-Type': 'image/svg+xml'});
        res.end(Buffer.from(data).toString('utf8'));
        
        fs.unlink(filename + '.svg', function(err){
          if(err) return console.log(err);
          console.log('.svg deleted successfully');
        }); 
      })
      fs.unlink(filename + '.v', function(err){
        if(err) return console.log(err);
        console.log('.v deleted successfully');
      }); 
      fs.unlink(filename + '.json', function(err){
        if(err) return console.log(err);
        console.log('.json deleted successfully');
      });
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
    .then((filename) => {
      fs.readFile(filename + '.svg', function(err, data) {
        if (err) throw err // Fail if the file can't be read.
        res.writeHead(200, {'Content-Type': 'image/svg+xml'});
        res.end(Buffer.from(data).toString('utf8'));
    
        fs.unlink(filename + '.svg', function(err){
          if(err) return console.log(err);
          console.log('.svg deleted successfully');
        }); 
      })
      fs.unlink(filename + '.v', function(err){
        if(err) return console.log(err);
        console.log('.v deleted successfully');
      }); 
      fs.unlink(filename + '.json', function(err){
        if(err) return console.log(err);
        console.log('.json deleted successfully');
      }); 
      fs.unlink(filename + '.txt', function(err){
        if(err) return console.log(err);
        console.log('.txt deleted successfully');
      }); 
    })
    .catch(next);
});


module.exports = router;
