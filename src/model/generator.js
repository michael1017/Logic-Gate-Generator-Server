const fs = require('fs');
const moment = require('moment');

const { spawnSync } = require('child_process');

function verilogText(topModule, text, id) {
    return new Promise((resolve, reject) => {
        const python = '/usr/bin/python3';
        const data_prefix = '../data/';
        const generator = 'generator.py'
        const filename = data_prefix + id;
        const filename_v = filename + '.v';
        
        fs.writeFileSync(filename_v, text, (err) => {
            if (err) reject(err);
        });

        const generatorLog = spawnSync(
            python, 
            [generator, "--input", filename_v, "--top", topModule]
        );
        
        const fileInfo = {
            text: filename + '.svg',
        };
        
        resolve(fileInfo);
    });
}

function userDefinedText(text, id) {
    return new Promise((resolve, reject) => {
        console.log('into model/userDefinedText');
        
        const python = '/usr/bin/python3';
        const data_prefix = '../data/';
        const interpreter = '../Logic-Gate-Interpreter/Interpreter';
        const generator = 'generator.py'

        const filename = data_prefix + id;
        const filename_txt = filename + '.txt';
        const filename_v = filename + '.v';

        fs.writeFileSync(filename_txt, text, (err) => {
            if (err) reject(err);
        });

        const interpreterLog = spawnSync(
            interpreter, 
            [filename_txt, filename_v]
        );
        const generatorLog = spawnSync(
            python, 
            [generator, "--input", filename_v]
        );

        const fileInfo = {
            text: filename + '.svg',
        };
        
        resolve(fileInfo);
    });
}

module.exports = {
    verilogText,
    userDefinedText
};
  