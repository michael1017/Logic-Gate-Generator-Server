const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

const graphModel = require('./graph.js');

const { spawnSync } = require('child_process');


function create(text) {
    return new Promise((resolve, reject) => {
        const user_id = uuidv4();
        const time_stamp = moment().unix();
        const filename = time_stamp + user_id;
        const data_prefix = '/home/michael1017/env_test/data/';
        const python = '/usr/bin/python3';
        const compiler = '/home/michael1017/env_test/server/generator.py';
        const input_data = data_prefix + filename + '.txt';

        fs.writeFile(input_data, text, (err) => {
            if (err) reject(err);
        });

        const generatorLog = spawnSync(
            python, 
            [compiler, filename]
        );
        
        const fileInfo = {
            text: data_prefix + filename + '.svg',
        };
        
        resolve(fileInfo);
    });
}

module.exports = {
    create
};
  