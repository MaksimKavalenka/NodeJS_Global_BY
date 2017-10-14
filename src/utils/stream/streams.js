import fs from 'fs';
import glob from 'glob';
import minimist from 'minimist';
import path from 'path';
import request from 'request';
import split from 'split';
import throughMap from 'through2-map';
import { promisify } from 'util';
import config from '../../config/config.json';
import { CheckUtils, logger } from '../../utils';

const args = minimist(process.argv.slice(2), {
  alias: {
    help: 'h',
    action: 'a',
    file: 'f',
    path: 'p',
    count: 'c',
  },
  unknown: (arg) => {
    logger.error(config.unknown_option, arg);
  },
});

const globAsync = promisify(glob);
const streamUpperCase = throughMap(buffer => buffer.toString().toUpperCase());

function csvToJson() {
  let headers = [];
  let parseHeader = true;
  let firstChunk = true;

  return throughMap((buffer) => {
    if (parseHeader) {
      headers = buffer.toString().split(',');
      parseHeader = false;
      return '[';
    } else if (buffer.toString().trim().length > 0) {
      const rawContent = buffer.toString().split(',');
      const jsonContent = {};

      headers.forEach((header, index) => {
        jsonContent[header] = rawContent[index];
      });

      if (firstChunk) {
        firstChunk = false;
        return JSON.stringify(jsonContent);
      }

      return `,${JSON.stringify(jsonContent)}`;
    }
    return ']';
  });
}

export default class Streams {
  static run() {
    if (CheckUtils.checkArgs(args)) {
      if (args.help) {
        Streams.printHelpMessage();
      } else {
        switch (args.action) {
          case 'io':
            if (CheckUtils.checkFileArg(args)) {
              Streams.inputOutput(args.file);
            }
            break;

          case 'transform':
            Streams.transform();
            break;

          case 'transform-file':
            if (CheckUtils.checkFileArg(args)) {
              Streams.transformFile(args.file);
            }
            break;

          case 'transform-save-file':
            if (CheckUtils.checkFileArg(args)) {
              Streams.transformAndSaveFile(args.file);
            }
            break;

          case 'bundle-css':
            if (CheckUtils.checkPathArg(args)) {
              Streams.cssBundler(args.path);
            }
            break;

          case 'create-file':
            if (CheckUtils.checkFileArg(args) && CheckUtils.checkCountArg(args)) {
              Streams.createFile(args.file, args.count);
            }
            break;

          default:
            logger.warn(`'${args.action}' ${config.wrong_action}`);
            Streams.printHelpMessage();
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

  static async cssBundler(dirPath) {
    let count = 0;
    const files = await globAsync(`${dirPath}/**/*.css`);

    const bundle = (filePath) => {
      const stream = fs.createReadStream(filePath).pipe(fs.createWriteStream(`${dirPath}/bundle.css`, { flags: 'a' }));
      logger.info(`Bundle ${filePath}`);

      stream.once('finish', () => {
        count += 1;
        if (files[count]) {
          bundle(files[count]);
        } else {
          const url = 'https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css';
          request(url).pipe(fs.createWriteStream(`${dirPath}/bundle.css`, { flags: 'a' }));
          logger.info(`Bundle ${url}`);
        }
      });
    };

    bundle(files[count]);
  }

  static createFile(filePath, count) {
    const percent = count / 100;
    const writeStream = fs.createWriteStream(`${filePath}`);
    let percentCount = percent;

    const write = (i) => {
      const sentence = (i > 0) ? `${i},name${i},brand${i},company${i},price${i},isbn${i}\n` : 'id,name,brand,company,price,isbn\n';

      if (i <= count) {
        if (writeStream.write(sentence)) {
          write(i + 1);
        } else {
          writeStream.once('drain', () => write(i + 1));
        }

        if (percentCount < i) {
          logger.info(`${(percentCount * 100) / count}%`);
          percentCount += percent;
        }
      } else {
        logger.info('100%');
        writeStream.end();
      }
    };

    write(0);
  }

  static printHelpMessage() {
    const usage = path.join(__dirname, '', 'usage.txt');
    fs.createReadStream(usage).pipe(process.stdout);
  }
}

if (require.main === module) {
  Streams.run();
}
