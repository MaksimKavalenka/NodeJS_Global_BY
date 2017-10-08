import fs from 'fs';
import minimist from 'minimist';
import replaceExt from 'replace-ext';
import split from 'split';
import through from 'through2';
import throughMap from 'through2-map';
import config from '../config/config.json';
import { logger } from '../models';

const args = minimist(process.argv.slice(2), {
  alias: {
    action: 'a',
    file: 'f',
    help: 'h',
  },
  unknown: (arg) => {
    logger.error(config.unknown_option, arg);
  },
});

const streamUpperCase = throughMap(buffer => buffer.toString().toUpperCase());

function csvToJson() {
  const json = [];
  let headers = [];
  let parseHeader = true;

  return through((buffer, encoding, callback) => {
    if (parseHeader) {
      headers = buffer.toString().split(',');
      parseHeader = false;
    } else if (buffer.toString().trim().length > 0) {
      const rawContent = buffer.toString().split(',');
      const jsonContent = {};

      headers.forEach((header, index) => {
        jsonContent[header] = rawContent[index];
      });

      json.push(jsonContent);
    }
    callback();
  }, function done(callback) {
    this.push(JSON.stringify(json));
    callback();
  });
}

class Streams {
  static run() {
    if (Object.keys(args).length > 1) {
      if (args.help) {
        Streams.printHelpMessage();
      } else {
        switch (args.action) {
          case 'io':
            Streams.inputOutput(args.file);
            break;
          case 'tr':
            Streams.transform();
            break;
          case 'trf':
            Streams.transformFile(args.file);
            break;
          case 'trsf':
            Streams.transformAndSaveFile(args.file);
            break;
          default:
            break;
        }
      }
    } else {
      logger.warn(config.no_arguments);
      Streams.printHelpMessage();
    }
  }

  static inputOutput(filePath) {
    if (fs.existsSync(filePath)) {
      fs.createReadStream(filePath).pipe(process.stdout);
    } else {
      logger.error(config.file_not_found);
    }
  }

  static transform() {
    process.stdin.pipe(streamUpperCase).pipe(process.stdout);
  }

  static transformFile(filePath) {
    if (fs.existsSync(filePath)) {
      fs.createReadStream(filePath).pipe(split()).pipe(csvToJson()).pipe(process.stdout);
    } else {
      logger.error(config.file_not_found);
    }
  }

  static transformAndSaveFile(filePath) {
    if (fs.existsSync(filePath)) {
      const outputPath = replaceExt(filePath, '.json');
      fs.createReadStream(filePath).pipe(split()).pipe(csvToJson())
        .pipe(fs.createWriteStream(outputPath));
    } else {
      logger.error(config.file_not_found);
    }
  }

  static printHelpMessage() {
    const usagePath = 'bin/usage.txt';
    fs.createReadStream(usagePath).pipe(process.stdout);
  }
}

Streams.run();
