import fs from 'fs';
import config from '../config/config.json';
import { logger } from '../middlewares';

export default class FileUtils {
  static isFileExists(filePath) {
    const isFileExistsFlag = (fs.existsSync(filePath) && fs.statSync(filePath).isFile());
    if (!isFileExistsFlag) {
      logger.error(config.file_not_found);
    }
    return isFileExistsFlag;
  }

  static isFileCsv(filePath) {
    const isFileCsvFlag = FileUtils.isFileExists(filePath);
    if (isFileCsvFlag) {
      if (filePath.split('.').pop() !== 'csv') {
        logger.warn(config.wrong_ext);
        return false;
      }
    }
    return isFileCsvFlag;
  }
}
