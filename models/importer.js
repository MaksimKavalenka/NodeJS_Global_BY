import config from '../config/config.json';

const Promise = require('bluebird');
const fs = require('fs');
const Log = require('log');

const log = new Log();
const readFileAsync = Promise.promisify(fs.readFile);

export class Importer {
  static import(path) {
    return readFileAsync(path, 'utf8')
      .then(content => Importer.csvToJson(content));
  }

  static importSync(path) {
    if (fs.existsSync(path)) {
      const content = fs.readFileSync(path, 'utf8');
      return Importer.csvToJson(content);
    }
    log.error(config.file_not_found);
    return '';
  }

  static csvToJson(content) {
    const result = [];
    const lines = content.split('\n');
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i += 1) {
      const obj = {};
      const line = lines[i].split(',');

      for (let j = 0; j < headers.length; j += 1) {
        obj[headers[j]] = line[j];
      }

      result.push(obj);
    }

    return JSON.stringify(result);
  }
}
