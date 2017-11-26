import { TypeUtils } from '../helpers';
import { logger } from '../middlewares';

export default class ArgUtils {
  static isArgsExist(args, printHelpMessageFunc) {
    const isArgsExist = (Object.keys(args).length > 1);
    if (!isArgsExist) {
      logger.warn(locale('no_args'));
      printHelpMessageFunc();
    }
    return isArgsExist;
  }

  static isArgExists(args, key, printHelpMessageFunc) {
    const isArgExistsFlag = args[key];
    if (!isArgExistsFlag) {
      logger.warn(`--${key} ${locale('no_arg')}`);
      printHelpMessageFunc();
    }
    return isArgExistsFlag;
  }

  static isArgNumber(args, key, printHelpMessageFunc) {
    const isArgNumberFlag = ArgUtils.isArgExists(args, key, printHelpMessageFunc);
    if (isArgNumberFlag) {
      if (!TypeUtils.isNumber(args[key])) {
        logger.warn(`--${key} ${locale('only_number')}`);
        return false;
      }
    }
    return isArgNumberFlag;
  }
}
