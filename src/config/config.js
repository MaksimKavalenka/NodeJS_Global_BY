import fs from 'fs';
import glob from 'glob';
import _ from 'lodash';

const config = {};

const files = glob.sync(`${__dirname}/configs/**/*.json`);
files.forEach(file => _.merge(config, JSON.parse(fs.readFileSync(file, 'utf8'))));

module.exports = config;
