import fs from 'fs';
import glob from 'glob';
import minimist from 'minimist';
import request from 'request';
import split from 'split';
import through from 'through2';
import throughMap from 'through2-map';
import { promisify } from 'util';
import config from '../config/config.json';
import { logger } from '../models';

const args = minimist(process.argv.slice(2), {
  alias: {
    action: 'a',
    file: 'f',
    path: 'p',
    help: 'h',
  },
  unknown: (arg) => {
    logger.error(config.unknown_option, arg);
  },
});

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

class CheckUtils {
  static printHelpMessage(message) {
    const usagePath = 'bin/usage.txt';
    logger.warn(message);
    fs.createReadStream(usagePath).pipe(process.stdout);
  }

  static checkArgs() {
    const checkArgsFlag = (Object.keys(args).length > 1);
    if (!checkArgsFlag) {
      CheckUtils.printHelpMessage(config.no_args);
    }
    return checkArgsFlag;
  }

  static checkFileArg() {
    const checkFileArgFlag = args.file;
    if (!checkFileArgFlag) {
      CheckUtils.printHelpMessage(`--file ${config.no_arg}`);
    }
    return checkFileArgFlag;
  }

  static checkPathArg() {
    const checkPathArgFlag = args.path;
    if (!checkPathArgFlag) {
      CheckUtils.printHelpMessage(`--path ${config.no_arg}`);
    }
    return checkPathArgFlag;
  }

  static checkFile(filePath) {
    const checkFileFlag = (fs.existsSync(filePath) && fs.statSync(filePath).isFile());
    if (!checkFileFlag) {
      logger.error(config.file_not_found);
    }
    return checkFileFlag;
  }

  static checkCsv(filePath) {
    if (CheckUtils.checkFile(filePath)) {
      const checkCsvFlag = (filePath.split('.').pop() === 'csv');
      if (!checkCsvFlag) {
        logger.error(config.wrong_ext);
      }
      return checkCsvFlag;
    }
    return false;
  }
}

class Streams {
  static run() {
    if (CheckUtils.checkArgs()) {
      if (args.help) {
        Streams.printHelpMessage();
      } else {
        switch (args.action) {
          case 'io':
            if (CheckUtils.checkFileArg()) {
              Streams.inputOutput(args.file);
            }
            break;
          case 'transform':
            Streams.transform();
            break;
          case 'transform-file':
            if (CheckUtils.checkFileArg()) {
              Streams.transformFile(args.file);
            }
            break;
          case 'transform-save-file':
            if (CheckUtils.checkFileArg()) {
              Streams.transformAndSaveFile(args.file);
            }
            break;
          case 'bundle-css':
            if (CheckUtils.checkPathArg()) {
              Streams.cssBundler(args.path);
            }
            break;
          default:
            break;
        }
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

Streams.run();
