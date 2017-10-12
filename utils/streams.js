import fs from 'fs';
import glob from 'glob';
import request from 'request';
import split from 'split';
import through from 'through2';
import throughMap from 'through2-map';
import { promisify } from 'util';
import yargs from 'yargs';
import { logger } from '../models';
import { CheckUtils } from '../utils';

const ACTIONS = {
  IO: 'io',
  TRANSFORM: 'transform',
  TRANSFORM_FILE: 'transform-file',
  TRANSFORM_SAVE_FILE: 'transform-save-file',
  BUNDLE_CSS: 'bundle-css',
};

const args = yargs
  .version('1.0.0')
  .usage('Usage: node utils/streams.js [--help] [--action=(action) [--file=(filePath)] [--path=(path)]]')
  .help('h')
  .option('action', {
    alias: 'a',
    choices: [
      ACTIONS.IO,
      ACTIONS.TRANSFORM,
      ACTIONS.TRANSFORM_FILE,
      ACTIONS.TRANSFORM_SAVE_FILE,
      ACTIONS.BUNDLE_CSS,
    ],
    demandOption: true,
    describe: 'Action to be performed',
    type: 'string',
  })
  .option('file', {
    alias: 'f',
    describe: 'Path of a file to read',
    type: 'string',
  })
  .option('path', {
    alias: 'p',
    describe: 'Path of a folder that contains a bunch of CSS files',
    type: 'string',
  })
  .argv;

const globAsync = promisify(glob);
const streamUpperCase = throughMap(buffer => buffer.toString().toUpperCase());

function csvToJson() {
  const json = [];
  let headers = [];
  let parseHeader = true;

  return through((buffer, encoding, next) => {
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
    next();
  }, function end(done) {
    this.push(JSON.stringify(json));
    done();
  });
}

export default class Streams {
  static run() {
    if (CheckUtils.checkArgs(args)) {
      switch (args.action) {
        case ACTIONS.IO:
          if (CheckUtils.checkFileArg(args)) {
            Streams.inputOutput(args.file);
          }
          break;
        case ACTIONS.TRANSFORM:
          Streams.transform();
          break;
        case ACTIONS.TRANSFORM_FILE:
          if (CheckUtils.checkFileArg(args)) {
            Streams.transformFile(args.file);
          }
          break;
        case ACTIONS.TRANSFORM_SAVE_FILE:
          if (CheckUtils.checkFileArg(args)) {
            Streams.transformAndSaveFile(args.file);
          }
          break;
        case ACTIONS.BUNDLE_CSS:
          if (CheckUtils.checkPathArg(args)) {
            Streams.cssBundler(args.path);
          }
          break;
        default:
          break;
      }
    }
  }

  static inputOutput(filePath) {
    if (CheckUtils.checkFile(filePath)) {
      fs.createReadStream(filePath).pipe(process.stdout);
    }
  }

  static transform() {
    process.stdin.pipe(streamUpperCase).pipe(process.stdout);
  }

  static transformFile(filePath) {
    if (CheckUtils.checkCsv(filePath)) {
      fs.createReadStream(filePath).pipe(split()).pipe(csvToJson()).pipe(process.stdout);
    }
  }

  static transformAndSaveFile(filePath) {
    if (CheckUtils.checkCsv(filePath)) {
      const outputPath = `${filePath.substr(0, filePath.lastIndexOf('.'))}.json`;
      fs.createReadStream(filePath).pipe(split()).pipe(csvToJson())
        .pipe(fs.createWriteStream(outputPath));
    }
  }

  static async cssBundler(path) {
    let count = 0;
    const files = await globAsync(`${path}/**/*.css`);
    const bundle = (filePath) => {
      const stream = fs.createReadStream(filePath).pipe(fs.createWriteStream(`${path}/bundle.css`, { flags: 'a' }));
      logger.info(`Bundle ${filePath}`);

      stream.once('finish', () => {
        count += 1;
        if (files[count]) {
          bundle(files[count]);
        } else {
          const url = 'https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css';
          request(url).pipe(fs.createWriteStream(`${path}/bundle.css`, { flags: 'a' }));
        }
      });
    };
    bundle(files[count]);
  }
}

if (require.main === module) {
  Streams.run();
}
