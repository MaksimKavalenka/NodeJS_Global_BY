import fs from 'fs';
import glob from 'glob';
import path from 'path';
import request from 'request';
import split from 'split';
import through from 'through2';
import throughMap from 'through2-map';
import util from 'util';
import { ProductController } from '../../controllers';
import { ArgUtils, FileUtils, StreamUtils, TypeUtils } from '../../helpers';
import initLocale from '../../lang';
import { args, actionHandler, connectors, logger } from '../../middlewares';

const globAsync = util.promisify(glob);
const streamUpperCase = throughMap(buffer => buffer.toString().toUpperCase());

function csvToJson() {
  let headers = [];
  let parseHeader = true;
  let firstChunk = true;

  const bodyFunc = (buffer, encoding, next) => {
    if (parseHeader) {
      headers = buffer.toString().split(',');
      parseHeader = false;
      this.push('[');
    } else if (buffer.toString().length > 0) {
      const jsonContent = TypeUtils.csvToJson(headers, buffer);
      if (firstChunk) {
        firstChunk = false;
        this.push(JSON.stringify(jsonContent));
      } else {
        this.push(`,${JSON.stringify(jsonContent)}`);
      }
    }
    next();
  };

  const endFunc = (next) => {
    this.push(']');
    next();
  };

  return through.obj(bodyFunc, endFunc);
}

function readProductsIntoDatabase() {
  let headers = [];
  let parseHeader = true;

  const bodyFunc = async (buffer, encoding, next) => {
    if (parseHeader) {
      headers = buffer.toString().split(',');
      parseHeader = false;
    } else if (buffer.toString().length > 0) {
      const jsonContent = TypeUtils.csvToJson(headers, buffer);
      try {
        await ProductController.addProduct(
          jsonContent.id, jsonContent.name, jsonContent.brand, jsonContent.company,
          jsonContent.price.substr(1), jsonContent.isbn,
        );
      } catch (err) {
        logger.info(util.format(locale('product_exists'), jsonContent.id));
      }
    }
    next();
  };

  const endFunc = async (next) => {
    await connectors.MONGO.disconnect();
    next();
  };

  return through.obj(bodyFunc, endFunc);
}

export default class Streams {
  static run() {
    if (!ArgUtils.isArgsExist(args, Streams.printHelpMessage)) {
      return;
    }
    if (args.help) {
      Streams.printHelpMessage();
    } else if (Object.prototype.hasOwnProperty.call(actionHandler, args.action)) {
      actionHandler[args.action].handler(args);
    } else if (args.action) {
      logger.warn(util.format(locale('wrong_action'), args.action));
      Streams.printHelpMessage();
    } else {
      actionHandler.helper.handler(['action']);
    }
  }

  static inputOutput(filePath) {
    if (FileUtils.isFileExists(filePath)) {
      fs.createReadStream(filePath).pipe(process.stdout);
    }
  }

  static transform() {
    process.stdin.pipe(streamUpperCase).pipe(process.stdout);
  }

  static transformFile(filePath) {
    if (FileUtils.isFileCsv(filePath)) {
      fs.createReadStream(filePath).pipe(split()).pipe(csvToJson()).pipe(process.stdout);
    }
  }

  static transformAndSaveFile(filePath) {
    if (FileUtils.isFileCsv(filePath)) {
      const outputPath = `${filePath.substr(0, filePath.lastIndexOf('.'))}.json`;
      fs.createReadStream(filePath).pipe(split()).pipe(csvToJson())
        .pipe(fs.createWriteStream(outputPath));
    }
  }

  static async readProducts(filePath) {
    if (FileUtils.isFileCsv(filePath)) {
      await connectors.MONGO.connect();
      fs.createReadStream(filePath).pipe(split()).pipe(readProductsIntoDatabase());
    }
  }

  static async cssBundler(dirPath) {
    const files = await globAsync(`${dirPath}/**/*.css`);
    const url = 'https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css';
    StreamUtils.combineStreams(files.map(file => fs.createReadStream(file)), request(url)).pipe(fs.createWriteStream(`${dirPath}/bundle.css`, { flags: 'a' }));
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
  initLocale();
  Streams.run();
}
