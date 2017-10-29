import config from '../config/config.json';
import { logger } from '../middlewares';

export default class ArgUtils {
  static isArgsExist(args, printHelpMessageFunc) {
    const isArgsExist = (Object.keys(args).length > 1);
    if (!isArgsExist) {
      logger.warn(config.no_args);
      printHelpMessageFunc();
    }
    return isArgsExist;
  }

  static isArgExists(args, key, printHelpMessageFunc) {
    const isArgExistsFlag = args[key];
    if (!isArgExistsFlag) {
      logger.warn(`--${key} ${config.no_arg}`);
      printHelpMessageFunc();
    }
    return isArgExistsFlag;
  }

  static isArgNumber(args, key, printHelpMessageFunc) {
    const isArgNumberFlag = ArgUtils.isArgExists(args, key, printHelpMessageFunc);
    if (isArgNumberFlag) {
      if (Number.isNaN(parseFloat(args.count)) || !Number.isFinite(args.count)) {
        logger.warn(`--${key} ${config.only_number}`);
        return false;
      }
    }
    return isArgNumberFlag;
  }
}
