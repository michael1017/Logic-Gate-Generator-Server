const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

const generatorModel = require('./generator.js');

const { spawnSync } = require('child_process');

function verilogText(text, id) {
    return new Promise((resolve, reject) => {
        const data_prefix = '/home/michael1017/env_test/data/';
        const python = '/usr/bin/python3';
        const convertor = '/home/michael1017/env_test/server/generator.py';
        const input_data = data_prefix + id + '.v';

        fs.writeFile(input_data, text, (err) => {
            if (err) reject(err);
        });

        const generatorLog = spawnSync(
            python, 
            [interpreter, id]
        );
        
        const fileInfo = {
            text: data_prefix + id + '.svg',
        };
        
        resolve(fileInfo);
    });
}

function verilogFile(file, id) {
    return new Promise((resolve, reject) => {
        const data_prefix = '/home/michael1017/env_test/data/';
        const python = '/usr/bin/python3';
        const interpreter = '/home/michael1017/env_test/server/generator.py';
        const input_data = data_prefix + id + '.v';

        fs.writeFile(input_data, text, (err) => {
            if (err) reject(err);
        });

        const generatorLog = spawnSync(
            python, 
            [interpreter, id]
        );
        
        const fileInfo = {
            text: data_prefix + id + '.svg',
        };
        
        resolve(fileInfo);
    });
}

function userDefinedText(text, id) {
    return new Promise((resolve, reject) => {
        const python = '/usr/bin/python3';
        const data_prefix = '/home/michael1017/env_test/data/';
        const interpreter = '/home/michael1017/final/Logic-Gate-Interpreter/Interpreter';
        const filename = data_prefix + id;
        const filename_txt = filename + '.txt';
        const filename_v = filename + '.v';

        fs.writeFile(filename_txt, text, (err) => {
            if (err) reject(err);
        });

        const interpreterLog = spawnSync(
            interpreter, 
            [filename_txt]
        );
        const generatorLog = spawnSync(
            python, 
            [filename_v]
        );

        const fileInfo = {
            text: filename + '.svg',
        };
        
        resolve(fileInfo);
    });
}

module.exports = {
    verilogText,
    verilogFile,
    userDefinedText
};
  