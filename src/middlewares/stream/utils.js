import combinedStream from 'combined-stream';
import fs from 'fs';
import config from '../../config/config.json';
import { logger, Streams } from '../../middlewares';

export class ArgUtils {
  static isArgsExist(args) {
    const isArgsExist = (Object.keys(args).length > 1);
    if (!isArgsExist) {
      logger.warn(config.no_args);
      Streams.printHelpMessage();
    }
    return isArgsExist;
  }

  static isArgExists(args, key) {
    const isArgExistsFlag = args[key];
    if (!isArgExistsFlag) {
      logger.warn(`--${key} ${config.no_arg}`);
      Streams.printHelpMessage();
    }
    return isArgExistsFlag;
  }

  static isArgNumber(args, key) {
    const isArgNumberFlag = ArgUtils.isArgExists(args, key);
    if (isArgNumberFlag) {
      if (Number.isNaN(parseFloat(args.count)) || !Number.isFinite(args.count)) {
        logger.warn(`--count ${config.only_number}`);
        return false;
      }
    }
    return isArgNumberFlag;
  }

  static isFileExists(filePath) {
    const isFileExistsFlag = (fs.existsSync(filePath) && fs.statSync(filePath).isFile());
    if (!isFileExistsFlag) {
      logger.error(config.file_not_found);
    }
    return isFileExistsFlag;
  }

  static isFileCsv(filePath) {
    const isFileCsvFlag = ArgUtils.isFileExists(filePath);
    if (isFileCsvFlag) {
      if (filePath.split('.').pop() !== 'csv') {
        logger.warn(config.wrong_ext);
        return false;
      }
    }
    return isFileCsvFlag;
  }
}

export class StreamUtils {
  static combineStreams(streams, resource) {
    const streamPipe = combinedStream.create();
    streams.forEach((stream) => {
      streamPipe.append(stream);
    });
    return streamPipe.append(resource);
  }
}
