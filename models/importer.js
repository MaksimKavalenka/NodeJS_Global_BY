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
