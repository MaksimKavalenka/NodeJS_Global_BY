import fs from 'fs';
import config from '../config/config.json';
import { logger, Streams } from '../utils';

export default class CheckUtils {
  static checkArgs(args) {
    const checkArgsFlag = (Object.keys(args).length > 1);
    if (!checkArgsFlag) {
      logger.warn(config.no_args);
      Streams.printHelpMessage();
    }
    return checkArgsFlag;
  }

  static checkFileArg(args) {
    const checkFileArgFlag = args.file;
    if (!checkFileArgFlag) {
      logger.warn(`--file ${config.no_arg}`);
      Streams.printHelpMessage();
    }
    return checkFileArgFlag;
  }

  static checkPathArg(args) {
    const checkPathArgFlag = args.path;
    if (!checkPathArgFlag) {
      logger.warn(`--path ${config.no_arg}`);
      Streams.printHelpMessage();
    }
    return checkPathArgFlag;
  }

  static checkCountArg(args) {
    const checkCountArgFlag = args.count;
    if (!checkCountArgFlag) {
      logger.warn(`--count ${config.no_arg}`);
      Streams.printHelpMessage();
    } else if (Number.isNaN(parseFloat(args.count)) || !Number.isFinite(args.count)) {
      logger.warn(`--count ${config.only_number}`);
      return false;
    }
    return checkCountArgFlag;
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
        logger.warn(config.wrong_ext);
      }
      return checkCsvFlag;
    }
    return false;
  }
}
