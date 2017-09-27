import fs from 'fs';
import { promisify } from 'util';
import { logger } from '../models';

const readFileAsync = promisify(fs.readFile);

export class Importer {
  static async import(path) {
    try {
      const content = await readFileAsync(path, 'utf8');
      return Importer.csvToJson(content);
    } catch (error) {
      logger.log('error', error.message);
    }
    return null;
  }

  static importSync(path) {
    try {
      const content = fs.readFileSync(path, 'utf8');
      return Importer.csvToJson(content);
    } catch (error) {
      logger.log('error', error.message);
    }
    return null;
  }

  static csvToJson(content) {
    let json = [];
    const lines = content.split('\n');
    const headers = lines[0].split(',');

    json = lines
      .slice(1)
      .map(line => line.split(',').reduce((result, value, index) => {
        result[headers[index]] = value;
        return result;
      }, {}));

    return JSON.stringify(json);
  }
}
